import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit, faTrash, faStar } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Button, Image, Badge, Alert, Modal } from '@themesberg/react-bootstrap';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Routes } from "../../routes";
import ApiService from "../../services/api";
import ToastNotification from "../../components/Toast";

export default () => {
  const { id } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toast, setToast] = useState({ show: false, type: 'success', title: '', message: '' });

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const data = await ApiService.getProduct(id);
      setProduct(data);
    } catch (error) {
      setError('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await ApiService.deleteProduct(id);
      setShowDeleteModal(false);
      setToast({
        show: true,
        type: 'success',
        title: 'Success',
        message: `Product "${product.title}" has been deleted successfully.`
      });
      setTimeout(() => {
        history.push(Routes.Products.path);
      }, 1500);
    } catch (error) {
      setShowDeleteModal(false);
      setToast({
        show: true,
        type: 'error',
        title: 'Error',
        message: 'Failed to delete product. Please try again.'
      });
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const getStatusBadge = (stock) => {
    if (stock > 50) return <Badge bg="success">In Stock</Badge>;
    if (stock > 0) return <Badge bg="warning">Low Stock</Badge>;
    return <Badge bg="danger">Out of Stock</Badge>;
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!product) return <Alert variant="warning">Product not found</Alert>;

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Button as={Link} to={Routes.Products.path} variant="outline-primary" size="sm" className="me-3">
            <FontAwesomeIcon icon={faArrowLeft} className="me-1" />
            Back to Products
          </Button>
          <h2 className="h4 d-inline">{product.title}</h2>
        </div>
        <div>
          <Button as={Link} to={`/products/${id}/edit`} variant="outline-warning" size="sm" className="me-2">
            <FontAwesomeIcon icon={faEdit} className="me-1" />
            Edit
          </Button>
          <Button variant="outline-danger" size="sm" onClick={handleDeleteClick}>
            <FontAwesomeIcon icon={faTrash} className="me-1" />
            Delete
          </Button>
        </div>
      </div>

      <Row>
        <Col lg={8}>
          <Card border="light" className="shadow-sm mb-4">
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Image src={product.thumbnail} fluid rounded className="mb-3" />
                  <Row>
                    {product.images?.slice(0, 4).map((img, index) => (
                      <Col xs={3} key={index}>
                        <Image src={img} fluid rounded className="mb-2" style={{ height: '60px', objectFit: 'cover' }} />
                      </Col>
                    ))}
                  </Row>
                </Col>
                <Col md={6}>
                  <h3 className="mb-3">{product.title}</h3>
                  <p className="text-muted mb-4">{product.description}</p>
                  
                  <div className="mb-3">
                    <h5 className="text-primary">${product.price}</h5>
                    {product.discountPercentage > 0 && (
                      <small className="text-success">
                        {product.discountPercentage}% discount
                      </small>
                    )}
                  </div>

                  <div className="mb-2">
                    <strong>Brand:</strong> {product.brand}
                  </div>
                  <div className="mb-2">
                    <strong>Category:</strong> {product.category}
                  </div>
                  <div className="mb-2">
                    <strong>Stock:</strong> {product.stock} {getStatusBadge(product.stock)}
                  </div>
                  <div className="mb-2">
                    <strong>Rating:</strong> 
                    <span className="ms-2">
                      {[...Array(5)].map((_, i) => (
                        <FontAwesomeIcon 
                          key={i} 
                          icon={faStar} 
                          className={i < Math.floor(product.rating) ? 'text-warning' : 'text-muted'} 
                        />
                      ))}
                      <span className="ms-1">({product.rating})</span>
                    </span>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card border="light" className="shadow-sm mb-4">
            <Card.Header>
              <h5 className="mb-0">Product Information</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-2">
                <strong>SKU:</strong> {product.sku}
              </div>
              <div className="mb-2">
                <strong>Weight:</strong> {product.weight}g
              </div>
              <div className="mb-2">
                <strong>Dimensions:</strong> {product.dimensions?.width} × {product.dimensions?.height} × {product.dimensions?.depth} cm
              </div>
              <div className="mb-2">
                <strong>Warranty:</strong> {product.warrantyInformation}
              </div>
              <div className="mb-2">
                <strong>Shipping:</strong> {product.shippingInformation}
              </div>
              <div className="mb-2">
                <strong>Return Policy:</strong> {product.returnPolicy}
              </div>
              <div className="mb-2">
                <strong>Min Order:</strong> {product.minimumOrderQuantity}
              </div>
            </Card.Body>
          </Card>

          {product.reviews?.length > 0 && (
            <Card border="light" className="shadow-sm">
              <Card.Header>
                <h5 className="mb-0">Reviews</h5>
              </Card.Header>
              <Card.Body>
                {product.reviews.slice(0, 3).map((review, index) => (
                  <div key={index} className="mb-3 pb-3 border-bottom">
                    <div className="d-flex justify-content-between">
                      <strong>{review.reviewerName}</strong>
                      <div>
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon 
                            key={i} 
                            icon={faStar} 
                            size="sm"
                            className={i < review.rating ? 'text-warning' : 'text-muted'} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted mb-0 mt-1">{review.comment}</p>
                  </div>
                ))}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      <Modal show={showDeleteModal} onHide={handleDeleteCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{product?.title}</strong>?
          <br />
          <small className="text-muted">This action cannot be undone.</small>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            <FontAwesomeIcon icon={faTrash} className="me-1" />
            Delete Product
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastNotification
        show={toast.show}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </>
  );
};