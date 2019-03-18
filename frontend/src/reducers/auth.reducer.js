// TODO: validate at bootstrap if token is not expired
const initialState = {
  authenticating: false,
  errMessage: null,
  loggedIn: localStorage.getItem('authToken') != null
};

// TODO: anything better than managing 3 flags together?
export const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_REQUEST':
      return {
        ...state,
        authenticating: true,
        loggedIn: false,
        errMessage: null
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        authenticating: false,
        loggedIn: true,
        errMessage: null
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        authenticating: false,
        loggedIn: false,
        errMessage: action.errMsg
      };
    default:
      return state;
  }
};

export default auth;
