import { authService } from '../services';
import { authActionTypes } from '../const';

const {
  AUTH_REQUEST, AUTH_SUCCESS, AUTH_ERROR, AUTH_LOGOUT
} = authActionTypes;

const authRequest = () => ({ type: AUTH_REQUEST });
const authSuccess = token => ({ type: AUTH_SUCCESS, token });
const authError = errMsg => ({
  type: AUTH_ERROR,
  errMessage: errMsg || 'Sorry, something went wrong'
});

const login = (email, password, history) => (dispatch) => {
  dispatch(authRequest());
  return authService.login(email, password).then(
    (token) => {
      dispatch(authSuccess(token));
      history.push('/editor');
    },
    errMsg => dispatch(authError(errMsg))
  );
};

const logout = () => {
  authService.logout();
  return {
    type: AUTH_LOGOUT
  };
};

const register = (user, history) => (dispatch) => {
  dispatch(authRequest());
  return authService.register(user).then(
    (token) => {
      dispatch(authSuccess(token));
      history.push('/editor');
    },
    errMsg => dispatch(authError(errMsg))
  );
};

const authActions = {
  login,
  logout,
  register
};

export default authActions;
