import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';

class DeleteProjectButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  toggleModal() {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen
    }));
  }

  confirmDelete() {
    const { onClick: onDeleteConfirm } = this.props;

    onDeleteConfirm();
    this.setState({
      modalOpen: false
    });
  }

  render() {
    const { modalOpen } = this.state;

    return (
      <div>
        <Button color="danger" onClick={this.toggleModal}>
          Delete this project
        </Button>
        <Modal isOpen={modalOpen} toggle={this.toggleModal} backdrop={false}>
          <ModalHeader toggle={this.toggleModal}>Confirm your intention</ModalHeader>
          <ModalFooter>
            <Button color="danger" onClick={this.confirmDelete}>
              Delete
            </Button>
            <Button color="primary" onClick={this.toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

DeleteProjectButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default DeleteProjectButton;
