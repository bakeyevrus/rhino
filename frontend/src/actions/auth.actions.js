import { authService } from '../services';

const authRequest = () => ({ type: 'AUTH_REQUEST' });
const authSuccess = token => ({ type: 'AUTH_SUCCESS', token });
const authError = errMsg => ({ type: 'AUTH_ERROR', errMsg });

const login = (email, password) => (dispatch) => {
  dispatch(authRequest());
  authService
    .login(email, password)
    .then(token => dispatch(authSuccess(token)), errMsg => dispatch(authError(errMsg)));
};

const logout = () => {
  authService.logout();
  return {
    type: 'AUTH_LOGOUT'
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
