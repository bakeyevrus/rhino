import { modalActionTypes } from '../const';

const { SHOW_MODAL, HIDE_MODAL } = modalActionTypes;

const modalActions = {
  showModal,
  hideModal
};

function showModal(modal) {
  return {
    type: SHOW_MODAL,
    modal
  };
}

function hideModal() {
  return {
    type: HIDE_MODAL
  };
}

export default modalActions;
