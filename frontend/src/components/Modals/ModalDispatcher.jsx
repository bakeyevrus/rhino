import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { modalActions } from '../../actions';
import { modalTypes } from '../../const';
import Alert from './AlertModal';
import Project from './ProjectModal';
import Graph from './GraphModal';

const MODAL_TYPES = {
  [modalTypes.ALERT]: Alert,
  [modalTypes.PROJECT]: Project,
  [modalTypes.GRAPH]: Graph
};

function ModalDispatcher({ modalType, modalProps, close }) {
  if (modalType == null) {
    return null;
  }

  const Modal = MODAL_TYPES[modalType];
  return <Modal {...modalProps} onClose={close} />;
}

ModalDispatcher.defaultProps = {
  modalType: null,
  modalProps: {}
};

ModalDispatcher.propTypes = {
  close: PropTypes.func.isRequired,
  modalType: PropTypes.oneOf(Object.keys(modalTypes)),
  /* eslint-disable react/forbid-prop-types */
  modalProps: PropTypes.object
};

function mapStateToProps(state) {
  return {
    ...state.modal
  };
}

function mapDispatchToProps(dispatch) {
  return {
    close: () => dispatch(modalActions.hideModal())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDispatcher);
