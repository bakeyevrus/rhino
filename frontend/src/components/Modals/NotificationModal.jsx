import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal, ModalBody, ModalFooter, ModalHeader, Button
} from 'reactstrap';

NotificationModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  errorMessage: PropTypes.string
};

NotificationModal.defaultProps = {
  errorMessage: null
};

function NotificationModal({
  title, message, errorMessage, onClose
}) {
  return (
    <Modal isOpen>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <p>{message}</p>
        {errorMessage && (
          <p>
            <small>{errorMessage}</small>
          </p>
        )}
      </ModalBody>
      <ModalFooter>
        <Button outline color="primary" onClick={onClose}>
          Ok
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default NotificationModal;
