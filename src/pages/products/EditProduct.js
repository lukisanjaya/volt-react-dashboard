import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, Alert } from '@themesberg/react-bootstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Routes } from "../../routes";
import ApiService from "../../services/api";
import ToastNotification from "../../components/Toast";

export default () => {
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [toast, setToast] = useState({ show: false, type: 'success', title: '', message: '' });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    discountPercentage: '',
    rating: '',
    stock: '',
    brand: '',
    category: '',
    thumbnail: '',
    weight: '',
    warrantyInformation: '',
    shippingInformation: '',
    returnPolicy: '',
    minimumOrderQuantity: ''
  });

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const product = await ApiService.getProduct(id);
      setFormData({
        title: product.title || '',
        description: product.description || '',
        price: product.price || '',
        discountPercentage: product.discountPercentage || '',
        rating: product.rating || '',
        stock: product.stock || '',
        brand: product.brand || '',
        category: product.category || '',
        thumbnail: product.thumbnail || '',
        weight: product.weight || '',
        warrantyInformation: product.warrantyInformation || '',
        shippingInformation: product.shippingInformation || '',
        returnPolicy: product.returnPolicy || '',
        minimumOrderQuantity: product.minimumOrderQuantity || ''
      });
    } catch (error) {
      setError('Failed to load product details');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        discountPercentage: parseFloat(formData.discountPercentage) || 0,
        rating: parseFloat(formData.rating) || 0,
        stock: parseInt(formData.stock),
        weight: parseFloat(formData.weight) || 0,
        minimumOrderQuantity: parseInt(formData.minimumOrderQuantity) || 1
      };

      await ApiService.updateProduct(id, productData);
      setSuccess('Product updated successfully!');
      setToast({
        show: true,
        type: 'success',
        title: 'Success',
        message: 'Product has been updated successfully!'
      });
      
      setTimeout(() => {
        history.push(`/products/${id}`);
      }, 2000);
    } catch (error) {
      setError('Failed to update product. Please try again.');
      setToast({
        show: true,
        type: 'error',
        title: 'Error',
        message: 'Failed to update product. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Button as={Link} to={`/products/${id}`} variant="outline-primary" size="sm" className="me-3">
            <FontAwesomeIcon icon={faArrowLeft} className="me-1" />
            Back to Product
          </Button>
          <h2 className="h4 d-inline">Edit Product</h2>
        </div>
      </div>

      <Row>
        <Col xs={12}>
          <Card border="light" className="shadow-sm">
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Product Title *</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="title"
                        placeholder="Enter product title"
                        value={formData.title}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Brand</Form.Label>
                      <Form.Control
                        type="text"
                        name="brand"
                        placeholder="Enter brand name"
                        value={formData.brand}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Description *</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={3}
                    name="description"
                    placeholder="Enter product description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Price *</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        step="0.01"
                        name="price"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Discount %</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        name="discountPercentage"
                        placeholder="0.00"
                        value={formData.discountPercentage}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Stock *</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        name="stock"
                        placeholder="0"
                        value={formData.stock}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Category</Form.Label>
                      <Form.Select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                      >
                        <option value="">Select category</option>
                        <option value="beauty">Beauty</option>
                        <option value="fragrances">Fragrances</option>
                        <option value="furniture">Furniture</option>
                        <option value="groceries">Groceries</option>
                        <option value="home-decoration">Home Decoration</option>
                        <option value="kitchen-accessories">Kitchen Accessories</option>
                        <option value="laptops">Laptops</option>
                        <option value="mens-shirts">Men's Shirts</option>
                        <option value="mens-shoes">Men's Shoes</option>
                        <option value="mens-watches">Men's Watches</option>
                        <option value="mobile-accessories">Mobile Accessories</option>
                        <option value="motorcycle">Motorcycle</option>
                        <option value="skin-care">Skin Care</option>
                        <option value="smartphones">Smartphones</option>
                        <option value="sports-accessories">Sports Accessories</option>
                        <option value="sunglasses">Sunglasses</option>
                        <option value="tablets">Tablets</option>
                        <option value="tops">Tops</option>
                        <option value="vehicle">Vehicle</option>
                        <option value="womens-bags">Women's Bags</option>
                        <option value="womens-dresses">Women's Dresses</option>
                        <option value="womens-jewellery">Women's Jewellery</option>
                        <option value="womens-shoes">Women's Shoes</option>
                        <option value="womens-watches">Women's Watches</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        name="rating"
                        placeholder="0.0"
                        value={formData.rating}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Thumbnail URL</Form.Label>
                  <Form.Control
                    type="url"
                    name="thumbnail"
                    placeholder="https://example.com/image.jpg"
                    value={formData.thumbnail}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Weight (g)</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        name="weight"
                        placeholder="0"
                        value={formData.weight}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={8}>
                    <Form.Group className="mb-3">
                      <Form.Label>Warranty Information</Form.Label>
                      <Form.Control
                        type="text"
                        name="warrantyInformation"
                        placeholder="e.g., 1 year warranty"
                        value={formData.warrantyInformation}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Shipping Information</Form.Label>
                      <Form.Control
                        type="text"
                        name="shippingInformation"
                        placeholder="e.g., Ships in 3-5 business days"
                        value={formData.shippingInformation}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Return Policy</Form.Label>
                      <Form.Control
                        type="text"
                        name="returnPolicy"
                        placeholder="e.g., 30 days return policy"
                        value={formData.returnPolicy}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>Minimum Order Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="minimumOrderQuantity"
                    placeholder="1"
                    value={formData.minimumOrderQuantity}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Button as={Link} to={`/products/${id}`} variant="outline-secondary" className="me-2">
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" disabled={loading}>
                    <FontAwesomeIcon icon={faSave} className="me-1" />
                    {loading ? 'Updating...' : 'Update Product'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

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