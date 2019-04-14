/**
 * Generates loader reducer function for provided action types, i.e for given actionTypes
 * ['GET_PROJECT', 'CREATE_PROJECT'] creates reducer, which will return true for actionTypes
 * ['GET_PROJECT_REQUEST', 'CREATE_PROJECT_REQUEST']
 * @param {String[]} actionTypes
 */
const createLoaderReducer = actionTypes => (state = false, action) => {
  const { type } = action;

  // Got actionType itself, similar to '*_SUCCESS' by convention
  if (actionTypes[type] != null) {
    return false;
  }

  // TODO: write Regex where (REQUEST | ERROR) capturing group will be optional
  const matches = /(.*)_(REQUEST|ERROR)/.exec(type);

  // not a *_REQUEST / *_FAILURE actions, so we ignore them
  if (!matches) return state;

  const [, requestName, requestState] = matches;

  // Ex. actionName is FETCH_PROJECT (FETCH_PROJECT_REQUEST) but requestName is AUTH (REQUEST)
  if (actionTypes[requestName] != null) {
    // Store whether a request is happening at the moment or not
    // e.g. will be true when receiving ${ACTION_TYPE}_REQUEST
    //      and false when receiving ${ACTION_TYPE}_SUCCESS / ${ACTION_TYPE}_FAILURE
    return requestState === 'REQUEST';
  }

  return state;
};

export default createLoaderReducer;
