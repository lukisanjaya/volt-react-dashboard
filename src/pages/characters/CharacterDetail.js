import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Badge } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useParams, useHistory } from 'react-router-dom';
import DragonBallApiService from '../../services/dragonballApi';
import ToastNotification from '../../components/Toast';

export default () => {
  const { id } = useParams();
  const history = useHistory();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, type: 'success', title: '', message: '' });

  const fetchCharacter = async () => {
    setLoading(true);
    try {
      const response = await DragonBallApiService.getCharacter(id);
      setCharacter(response);
    } catch (error) {
      console.error('Failed to fetch character:', error);
      setToast({
        show: true,
        type: 'error',
        title: 'Error',
        message: 'Failed to fetch character details. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacter();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <h4>Loading character details...</h4>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="text-center py-5">
        <h4>Character not found</h4>
        <Button variant="primary" onClick={() => history.push('/characters')}>
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          Back to Characters
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => history.push('/characters')}
            className="mb-3"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
            Back to Characters
          </Button>
          <h2 className="h4">{character.name}</h2>
          <p className="mb-0">Character details from the Dragon Ball universe</p>
        </div>
      </div>

      <Row>
        <Col xs={12} lg={4}>
          <Card border="light" className="shadow-sm mb-4">
            <Card.Body className="text-center">
              <img
                src={character.image}
                alt={character.name}
                className="rounded mb-3"
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
              />
              <h4 className="mb-3">{character.name}</h4>
              <Badge bg="primary" className="mb-2">{character.affiliation}</Badge>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} lg={8}>
          <Card border="light" className="shadow-sm mb-4">
            <Card.Header>
              <h5 className="mb-0">Character Information</h5>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col sm={3}>
                  <strong>Race:</strong>
                </Col>
                <Col sm={9}>
                  {character.race}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col sm={3}>
                  <strong>Gender:</strong>
                </Col>
                <Col sm={9}>
                  {character.gender}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col sm={3}>
                  <strong>Ki Level:</strong>
                </Col>
                <Col sm={9}>
                  {character.ki}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col sm={3}>
                  <strong>Max Ki:</strong>
                </Col>
                <Col sm={9}>
                  {character.maxKi}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col sm={3}>
                  <strong>Affiliation:</strong>
                </Col>
                <Col sm={9}>
                  <Badge bg="primary">{character.affiliation}</Badge>
                </Col>
              </Row>
              {character.originPlanet && (
                <Row className="mb-3">
                  <Col sm={3}>
                    <strong>Origin Planet:</strong>
                  </Col>
                  <Col sm={9}>
                    <div className="d-flex align-items-center">
                      <img
                        src={character.originPlanet.image}
                        alt={character.originPlanet.name}
                        className="rounded me-2"
                        style={{ width: '30px', height: '30px', objectFit: 'cover' }}
                      />
                      <div>
                        <div>{character.originPlanet.name}</div>
                        {character.originPlanet.isDestroyed && (
                          <Badge bg="danger" className="mt-1">Destroyed</Badge>
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>

          <Card border="light" className="shadow-sm mb-4">
            <Card.Header>
              <h5 className="mb-0">Description</h5>
            </Card.Header>
            <Card.Body>
              <p className="text-muted mb-0">{character.description}</p>
            </Card.Body>
          </Card>

          {character.originPlanet && (
            <Card border="light" className="shadow-sm mb-4">
              <Card.Header>
                <h5 className="mb-0">Origin Planet Details</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex align-items-start mb-3">
                  <img
                    src={character.originPlanet.image}
                    alt={character.originPlanet.name}
                    className="rounded me-3"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                  <div>
                    <h6>{character.originPlanet.name}</h6>
                    <p className="text-muted mb-0">{character.originPlanet.description}</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}

          {character.transformations && character.transformations.length > 0 && (
            <Card border="light" className="shadow-sm">
              <Card.Header>
                <h5 className="mb-0">Transformations ({character.transformations.length})</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  {character.transformations.map((transformation) => (
                    <Col xs={12} sm={6} lg={4} key={transformation.id} className="mb-3">
                      <Card border="light" className="h-100">
                        <Card.Body className="text-center">
                          <img
                            src={transformation.image}
                            alt={transformation.name}
                            className="rounded mb-2"
                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                          />
                          <h6 className="mb-1">{transformation.name}</h6>
                          <small className="text-muted">Ki: {transformation.ki}</small>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      <ToastNotification
        {...toast}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </>
  );
};