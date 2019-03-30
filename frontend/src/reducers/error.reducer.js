const createErrorMessageReducer = actionTypes => (state = null, action) => {
  const { type, errMessage } = action;

  // Got actionType itself, similar to '*_SUCCESS' by convention
  if (actionTypes[type] != null) {
    return null;
  }

  // TODO: write Regex where (REQUEST | ERROR) capturing group will be optional
  const matches = /(.*)_(REQUEST|ERROR)/.exec(type);

  // not a *_REQUEST / *_FAILURE actions, so we ignore them
  if (!matches) return state;

  const [, requestName, requestState] = matches;

  // Ex. actionName is FETCH_PROJECT (FETCH_PROJECT_ERROR) but requestName is AUTH (ERROR)
  if (actionTypes[requestName] != null) {
    return requestState === 'ERROR' ? errMessage : null;
  }

  return state;
};

export default createErrorMessageReducer;
