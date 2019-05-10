export function handleErrorResponse(err) {
  let errMsg;
  if (err.response) {
    const { response } = err;
    errMsg = response.data.message || getDefaultErrorMessage(response.status);
  } else if (err.request) {
    errMsg = 'The request was made but no response was received';
  } else {
    errMsg = 'Unexpected error';
  }

  throw errMsg;
}

function getDefaultErrorMessage(responseStatus) {
  switch (responseStatus) {
    case 401:
      return 'Authentication token has been expired or missing';
    case 404:
      return 'Requested entity is missing on server';
    default:
      return "Server didn't return any message";
  }
}

/**
 * Validates if provided id not null, otherwise throws error
 * @param {*} id - id to validate
 * @param {string} entityName - entity, which provided id part of.
 * Used in error message for debugging
 */
export function validateIdNotNull(id, entityName = 'Provided') {
  if (id == null) {
    throw new Error(`${entityName} id is null`);
  }
}

export function logDifferentResponseStatus(response, statusExpected) {
  const { url } = response.request;
  console.warn(`${url} responded with ${response.status}, but HTTP ${statusExpected} was expected`);
}

export function getAuthHeader() {
  const token = localStorage.getItem('authToken');
  if (token == null) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`
  };
}
