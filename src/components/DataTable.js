import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Row, Col, Form, InputGroup } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const DataTable = ({
  data = [],
  columns = [],
  loading = false,
  searchPlaceholder = "Search...",
  onSearch,
  onPageChange,
  onLimitChange,
  currentPage = 1,
  totalPages = 0,
  limit = 10,
  totalItems = 0,
  itemName = "items"
}) => {
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch && onSearch(search);
  };

  const handleLimitChange = (newLimit) => {
    onLimitChange && onLimitChange(parseInt(newLimit));
  };

  const handlePageChange = (page) => {
    onPageChange && onPageChange(page);
  };

  return (
    <>
      <Card border="light" className="shadow-sm">
        <Card.Header>
          <Row className="align-items-center">
            <Col xs={12} md={10}>
              <Form onSubmit={handleSearch}>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faSearch} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder={searchPlaceholder}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </InputGroup>
              </Form>
            </Col>
            <Col xs={12} md={2} className="text-md-end mt-3 mt-md-0">
              <Button variant="primary" type="submit" disabled={loading} className="w-100" onClick={handleSearch}>
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className="pb-0">
          <Table responsive className="table-centered table-nowrap rounded mb-0">
            <thead className="thead-light">
              <tr>
                {columns.map((column, index) => (
                  <th key={index} className="border-0">{column.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-4">
                    Loading {itemName}...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-4">
                    No {itemName} found.
                  </td>
                </tr>
              ) : (
                data.map((item, rowIndex) => (
                  <tr key={item.id || rowIndex}>
                    {columns.map((column, colIndex) => (
                      <td key={colIndex}>
                        {column.render ? column.render(item) : item[column.key]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="d-flex align-items-center">
          <span className="text-muted me-3">
            Showing {((currentPage - 1) * limit) + 1} to {Math.min(currentPage * limit, totalItems)} of {totalItems} {itemName}
          </span>
          <Form.Select
            value={limit}
            onChange={(e) => handleLimitChange(e.target.value)}
            style={{ width: 'auto' }}
            size="sm"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </Form.Select>
        </div>
        
        <div className="d-flex align-items-center">
          <Button
            variant="outline-primary"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(1)}
            className="me-1"
          >
            First
          </Button>
          <Button
            variant="outline-primary"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="me-2"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
          
          {[...Array(Math.min(5, totalPages))].map((_, index) => {
            const pageNum = Math.max(1, currentPage - 2) + index;
            if (pageNum > totalPages) return null;
            
            return (
              <Button
                key={pageNum}
                variant={pageNum === currentPage ? 'primary' : 'outline-primary'}
                size="sm"
                onClick={() => handlePageChange(pageNum)}
                className="me-1"
              >
                {pageNum}
              </Button>
            );
          })}
          
          <Button
            variant="outline-primary"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="me-1"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
          <Button
            variant="outline-primary"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            Last
          </Button>
        </div>
      </div>
    </>
  );
};

export default DataTable;