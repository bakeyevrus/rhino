import { combineReducers } from 'redux';
import { authActionTypes } from '../const';

const {
  AUTH_SUCCESS, AUTH_ERROR, AUTH_REQUEST, AUTH_LOGOUT
} = authActionTypes;

const authenticating = (state = false, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return true;
    case AUTH_ERROR:
    case AUTH_SUCCESS:
      return false;
    default:
      return state;
  }
};

// TODO: validate at bootstrap if token is not expired
const initialLoggedIn = localStorage.getItem('authToken') != null;
const loggedIn = (state = initialLoggedIn, action) => {
  switch (action.type) {
    case AUTH_LOGOUT:
    case AUTH_REQUEST:
    case AUTH_ERROR:
      return false;
    case AUTH_SUCCESS:
      return true;
    default:
      return state;
  }
};

const errMessage = (state = null, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return null;
    case AUTH_ERROR:
      return action.errMessage;
    // Return previous error message
    case AUTH_REQUEST:
    default:
      return state;
  }
};

const auth = combineReducers({
  authenticating,
  loggedIn,
  errMessage
});

export default auth;

export const isLoggedIn = state => state.loggedIn;
