import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getModalState } from '../../reducers';
import { modalActions } from '../../actions';
import { modalTypes } from '../../const';
import Alert from './AlertModal';
import Notification from './NotificationModal';
import Project from './ProjectModal';
import Graph from './GraphModal';

const MODAL_TYPES = {
  [modalTypes.ALERT]: Alert,
  [modalTypes.PROJECT]: Project,
  [modalTypes.GRAPH]: Graph,
  [modalTypes.NOTIFICATION]: Notification
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
    ...getModalState(state)
  };
}

const { hideModal } = modalActions;
const mapDispatchToProps = {
  close: hideModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDispatcher);
