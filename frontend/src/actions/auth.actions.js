import { authService } from '../services';
import { authActionTypes } from '../const';

const {
  AUTH_REQUEST, AUTH_SUCCESS, AUTH_ERROR, AUTH_LOGOUT
} = authActionTypes;

const authRequest = () => ({ type: AUTH_REQUEST });
const authSuccess = token => ({ type: AUTH_SUCCESS, token });
const authError = errMsg => ({ type: AUTH_ERROR, errMsg: errMsg || 'Sorry, something went wrong' });

const login = (email, password) => (dispatch) => {
  dispatch(authRequest());
  authService
    .login(email, password)
    .then(token => dispatch(authSuccess(token)), errMsg => dispatch(authError(errMsg)));
};

const logout = () => {
  authService.logout();
  return {
    type: AUTH_LOGOUT
  };
};

const register = user => (dispatch) => {
  dispatch(authRequest());
  authService
    .register(user)
    .then(token => dispatch(authSuccess(token)), errMsg => dispatch(authError(errMsg)));
};

export const authActions = {
  login,
  logout,
  register
};

export default authActions;
