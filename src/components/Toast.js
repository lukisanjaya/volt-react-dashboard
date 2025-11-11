import React, { useEffect } from 'react';
import { Toast } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationTriangle, faInfoCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const ToastNotification = ({ show, onClose, type = 'success', title, message, delay = 3000 }) => {
  const getIcon = () => {
    switch (type) {
      case 'success': return faCheckCircle;
      case 'error': return faTimesCircle;
      case 'warning': return faExclamationTriangle;
      case 'info': return faInfoCircle;
      default: return faCheckCircle;
    }
  };

  const getVariant = () => {
    switch (type) {
      case 'success': return 'success';
      case 'error': return 'danger';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'success';
    }
  };

  useEffect(() => {
    if (show && delay > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [show, delay, onClose]);

  return (
    <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999 }}>
      <Toast show={show} onClose={onClose} bg={getVariant()}>
        <Toast.Header>
          <FontAwesomeIcon icon={getIcon()} className="me-2" />
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </div>
  );
};

export default ToastNotification;