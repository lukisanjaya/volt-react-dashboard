import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEye, faChevronLeft, faChevronRight, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, Table, InputGroup, Badge, Image, Pagination, Dropdown, Modal } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { Routes } from "../../routes";
import ApiService from "../../services/api";
import ToastNotification from "../../components/Toast";

export default () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [limit, setLimit] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [toast, setToast] = useState({ show: false, type: 'success', title: '', message: '' });

  useEffect(() => {
    fetchProducts();
  }, [currentPage, limit]);

  const fetchProducts = async (searchQuery = '', page = currentPage) => {
    setLoading(true);
    try {
      const params = {
        limit,
        skip: (page - 1) * limit,
        sort: 'title',
        order: 'asc',
        ...(searchQuery && { q: searchQuery })
      };
      const response = await ApiService.getProducts(params);
      setProducts(response.products || []);
      setTotalProducts(response.total || 0);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchProducts(search, 1);
  };

  const totalPages = Math.ceil(totalProducts / limit);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await ApiService.deleteProduct(productToDelete.id);
      setShowDeleteModal(false);
      setProductToDelete(null);
      fetchProducts();
      setToast({
        show: true,
        type: 'success',
        title: 'Success',
        message: `Product "${productToDelete.title}" has been deleted successfully.`
      });
    } catch (error) {
      console.error('Failed to delete product:', error);
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
    setProductToDelete(null);
  };

  const getStatusBadge = (stock) => {
    if (stock > 50) return <Badge bg="success">In Stock</Badge>;
    if (stock > 0) return <Badge bg="warning">Low Stock</Badge>;
    return <Badge bg="danger">Out of Stock</Badge>;
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h2 className="h4">Products</h2>
          <p className="mb-0">Manage your product catalog</p>
        </div>
        <Button as={Link} to={Routes.CreateProduct.path} variant="primary" size="sm">
          <FontAwesomeIcon icon={faPlus} className="me-1" />
          Add Product
        </Button>
      </div>

      <Row>
        <Col xs={12} className="mb-4">
          <Card border="light" className="shadow-sm">
            <Card.Body>
              <Form onSubmit={handleSearch}>
                <Row>
                  <Col md={10}>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faSearch} />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={2}>
                    <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                      {loading ? 'Searching...' : 'Search'}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12}>
          <Card border="light" className="shadow-sm">
            <Card.Body className="pb-0">
              <Table responsive className="table-centered table-nowrap rounded mb-0">
                <thead className="thead-light">
                  <tr>
                    <th className="border-0">Product</th>
                    <th className="border-0">Category</th>
                    <th className="border-0">Price</th>
                    <th className="border-0">Stock</th>
                    <th className="border-0">Status</th>
                    <th className="border-0">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <Image src={product.thumbnail} className="me-3" style={{ width: '50px', height: '50px', objectFit: 'cover' }} rounded />
                          <div>
                            <h6 className="mb-0">{product.title}</h6>
                            <small className="text-muted">{product.brand}</small>
                          </div>
                        </div>
                      </td>
                      <td>{product.category}</td>
                      <td>${product.price}</td>
                      <td>{product.stock}</td>
                      <td>{getStatusBadge(product.stock)}</td>
                      <td>
                        <Button as={Link} to={`/products/${product.id}`} variant="outline-primary" size="sm" className="me-1">
                          <FontAwesomeIcon icon={faEye} className="me-1" />
                          View
                        </Button>
                        <Button as={Link} to={`/products/${product.id}/edit`} variant="outline-warning" size="sm" className="me-1">
                          <FontAwesomeIcon icon={faEdit} className="me-1" />
                          Edit
                        </Button>
                        <Button onClick={() => handleDeleteClick(product)} variant="outline-danger" size="sm">
                          <FontAwesomeIcon icon={faTrash} className="me-1" />
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} className="mt-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <span className="text-muted me-3">
                Showing {((currentPage - 1) * limit) + 1} to {Math.min(currentPage * limit, totalProducts)} of {totalProducts} products
              </span>
              <Dropdown>
                <Dropdown.Toggle variant="outline-primary" size="sm">
                  {limit} per page
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {[5, 10, 20, 50].map(size => (
                    <Dropdown.Item 
                      key={size}
                      active={limit === size}
                      onClick={() => handleLimitChange(size)}
                    >
                      {size} per page
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            
            <Pagination className="mb-0">
              <Pagination.First 
                disabled={currentPage === 1}
                onClick={() => handlePageChange(1)}
              >
                First
              </Pagination.First>
              <Pagination.Prev 
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </Pagination.Prev>
              
              {[...Array(Math.min(5, totalPages))].map((_, index) => {
                const pageNum = Math.max(1, currentPage - 2) + index;
                if (pageNum > totalPages) return null;
                
                return (
                  <Pagination.Item
                    key={pageNum}
                    active={pageNum === currentPage}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </Pagination.Item>
                );
              })}
              
              <Pagination.Next 
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </Pagination.Next>
              <Pagination.Last 
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(totalPages)}
              >
                Last
              </Pagination.Last>
            </Pagination>
          </div>
        </Col>
      </Row>

      <Modal show={showDeleteModal} onHide={handleDeleteCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{productToDelete?.title}</strong>?
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