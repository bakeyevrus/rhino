import { combineReducers } from 'redux';
import { graphActionTypes } from '../constants';
import createErrorReducer from './error.reducer';
import createLoaderReducer from './loader.reducer';

const { SAVE_GRAPH_IN_BACKGROUND, SELECT_GRAPH } = graphActionTypes;

const initialTimestamp = Date.now();
function lastSavedTimestamp(state = initialTimestamp, action) {
  switch (action.type) {
    case SELECT_GRAPH:
      return Date.now();
    case SAVE_GRAPH_IN_BACKGROUND:
      return action.timestamp;
    default:
      return state;
  }
}

const saving = createLoaderReducer({ SAVE_GRAPH_IN_BACKGROUND });
const errorMessage = createErrorReducer({ SAVE_GRAPH_IN_BACKGROUND });

export default combineReducers({
  lastSavedTimestamp,
  saving,
  errorMessage
});

export function getLastSavedTimestamp(state) {
  const timestamp = state.lastSavedTimestamp;

  return timestamp == null ? null : new Date(timestamp).toTimeString();
}

export function isSaving(state) {
  return state.saving;
}
export function getErrorMessage(state) {
  return state.errorMessage;
}
