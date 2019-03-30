import { modalActionTypes } from '../const';

const initialState = {
  modalType: null,
  modalProps: {}
};

function modal(state = initialState, action) {
  switch (action.type) {
    case modalActionTypes.SHOW_MODAL:
      return {
        modalType: action.modalType,
        modalProps: action.modalProps
      };
    case modalActionTypes.HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
}

export default modal;
