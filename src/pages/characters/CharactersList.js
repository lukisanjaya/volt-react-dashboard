import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Row, Col, Form, InputGroup } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEye, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import DragonBallApiService from '../../services/dragonballApi';
import ToastNotification from '../../components/Toast';

export default () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState({ show: false, type: 'success', title: '', message: '' });
  const history = useHistory();

  const fetchCharacters = async (page = currentPage, searchQuery = search) => {
    setLoading(true);
    try {
      const params = { limit, page, ...(searchQuery && { name: searchQuery }) };
      const response = await DragonBallApiService.getCharacters(params);
      setCharacters(response.items || []);
      setTotalPages(response.meta?.totalPages || 0);
    } catch (error) {
      console.error('Failed to fetch characters:', error);
      setToast({
        show: true,
        type: 'error',
        title: 'Error',
        message: 'Failed to fetch characters. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, [currentPage, limit]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchCharacters(1, search);
  };

  const handleViewCharacter = (id) => {
    history.push(`/characters/${id}`);
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h2 className="h4">Dragon Ball Characters</h2>
          <p className="mb-0">Explore the legendary fighters from the Dragon Ball universe.</p>
        </div>
      </div>

      <Card border="light" className="shadow-sm">
        <Card.Header>
          <Row className="align-items-center">
            <Col xs={12} md={6}>
              <Form onSubmit={handleSearch}>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search characters..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button variant="primary" type="submit">
                    <FontAwesomeIcon icon={faSearch} />
                  </Button>
                </InputGroup>
              </Form>
            </Col>
            <Col xs={12} md={6} className="text-md-end mt-3 mt-md-0">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className="pb-0">
          <Table responsive className="table-centered table-nowrap rounded mb-0">
            <thead className="thead-light">
              <tr>
                <th className="border-0">Character</th>
                <th className="border-0">Race</th>
                <th className="border-0">Gender</th>
                <th className="border-0">Ki Level</th>
                <th className="border-0">Affiliation</th>
                <th className="border-0">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    Loading characters...
                  </td>
                </tr>
              ) : characters.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No characters found.
                  </td>
                </tr>
              ) : (
                characters.map((character) => (
                  <tr key={character.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={character.image}
                          alt={character.name}
                          className="rounded-circle me-3"
                          style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                        />
                        <div>
                          <h6 className="mb-0">{character.name}</h6>
                        </div>
                      </div>
                    </td>
                    <td>{character.race}</td>
                    <td>{character.gender}</td>
                    <td>{character.ki}</td>
                    <td>
                      <span className="badge bg-primary">{character.affiliation}</span>
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleViewCharacter(character.id)}
                      >
                        <FontAwesomeIcon icon={faEye} className="me-1" />
                        View
                      </Button>
                    </td>
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
            Showing {((currentPage - 1) * limit) + 1} to {Math.min(currentPage * limit, totalPages * limit)} of {totalPages * limit} characters
          </span>
          <Form.Select
            value={limit}
            onChange={(e) => {
              setLimit(parseInt(e.target.value));
              setCurrentPage(1);
            }}
            style={{ width: 'auto' }}
            size="sm"
          >
            <option value={2}>2 per page</option>
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
            onClick={() => setCurrentPage(1)}
            className="me-1"
          >
            First
          </Button>
          <Button
            variant="outline-primary"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
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
                onClick={() => setCurrentPage(pageNum)}
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
            onClick={() => setCurrentPage(currentPage + 1)}
            className="me-1"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
          <Button
            variant="outline-primary"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            Last
          </Button>
        </div>
      </div>

      <ToastNotification
        {...toast}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </>
  );
};