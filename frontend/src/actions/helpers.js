export function request(actionType) {
  return {
    type: `${actionType}_REQUEST`
  };
}

export function error(actionType, actionPayload) {
  return {
    type: `${actionType}_ERROR`,
    ...actionPayload
  };
}
