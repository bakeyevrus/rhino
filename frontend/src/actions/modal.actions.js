import { modalActionTypes } from '../const';

export const modalActions = {
  showModal,
  hideModal
};

function showModal(modalType, modalProps) {
  return {
    type: modalActionTypes.SHOW_MODAL,
    modalType,
    modalProps
  };
}

function hideModal() {
  return {
    type: modalActionTypes.HIDE_MODAL
  };
}

export default modalActionTypes;
