import axios from 'axios';

const login = (email, password) => {
  const encodedPass = btoa(password);
  return axios
    .post('/login', {
      email,
      password: encodedPass
    })
    .then(handleResponse, handleError);
};

const logout = () => {
  if (localStorage.getItem('authToken') != null) {
    localStorage.removeItem('authToken');
  }
};

const register = (newUser) => {
  const password = btoa(newUser.password);

  return axios.post('/register', { ...newUser, password }).then(handleResponse, handleError);
};

function handleResponse(response) {
  if (response.status === 200 || response.status === 201) {
    const { token } = response.data;
    localStorage.setItem('authToken', token);
    return token;
  }

  const { url } = response.request;
  console.warn(`${url} responded with ${response.status}`);
  return '';
}

function handleError(err) {
  let errMsg;
  if (err.response) {
    errMsg = err.response.data.message;
  } else if (err.request) {
    errMsg = 'The request was made but no response was received';
  } else {
    errMsg = 'Unexpected error';
  }

  throw errMsg;
}

const authService = {
  login,
  logout,
  register
};

export default authService;
