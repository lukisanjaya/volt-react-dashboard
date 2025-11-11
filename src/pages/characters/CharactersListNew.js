import React, { useState, useEffect } from 'react';
import { Button } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import DragonBallApiService from '../../services/dragonballApi';
import ToastNotification from '../../components/Toast';
import DataTable from '../../components/DataTable';

export default () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(10);
  const [toast, setToast] = useState({ show: false, type: 'success', title: '', message: '' });
  const history = useHistory();

  const fetchCharacters = async (page = currentPage, searchQuery = '') => {
    setLoading(true);
    try {
      const params = { limit, page, ...(searchQuery && { name: searchQuery }) };
      const response = await DragonBallApiService.getCharacters(params);
      setCharacters(response.items || []);
      setTotalPages(response.meta?.totalPages || 0);
      setTotalItems(response.meta?.totalItems || 0);
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

  const handleSearch = (searchQuery) => {
    setCurrentPage(1);
    fetchCharacters(1, searchQuery);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
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

      <DataTable
        data={characters}
        columns={[
          {
            header: 'Character',
            key: 'name',
            render: (character) => (
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
            )
          },
          { header: 'Race', key: 'race' },
          { header: 'Gender', key: 'gender' },
          { header: 'Ki Level', key: 'ki' },
          {
            header: 'Affiliation',
            key: 'affiliation',
            render: (character) => (
              <span className="badge bg-primary">{character.affiliation}</span>
            )
          },
          {
            header: 'Actions',
            key: 'actions',
            render: (character) => (
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => handleViewCharacter(character.id)}
              >
                <FontAwesomeIcon icon={faEye} className="me-1" />
                View
              </Button>
            )
          }
        ]}
        loading={loading}
        searchPlaceholder="Search characters..."
        onSearch={handleSearch}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        currentPage={currentPage}
        totalPages={totalPages}
        limit={limit}
        totalItems={totalItems}
        itemName="characters"
      />

      <ToastNotification
        {...toast}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </>
  );
};