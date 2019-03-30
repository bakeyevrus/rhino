import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal, ModalBody, ModalFooter, ModalHeader, Button
} from 'reactstrap';

function AlertModal({
  message, title, onSubmitClick, onClose
}) {
  const handleSubmitClick = (event) => {
    event.preventDefault();
    onSubmitClick();
    onClose();
  };

  return (
    <Modal isOpen>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{message}</ModalBody>
      <ModalFooter>
        <Button outline color="primary" onClick={onClose}>
          Cancel
        </Button>
        <Button outline color="danger" onClick={handleSubmitClick}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
}

AlertModal.defaultProps = {
  title: 'Are you sure?'
};

AlertModal.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmitClick: PropTypes.func.isRequired,
  title: PropTypes.string
};

export default AlertModal;
