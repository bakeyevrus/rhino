import { combineReducers } from 'redux';
import createLoaderReducer from './loader.reducer';
import createErrorMessageReducer from './error.reducer';
import { testCaseActionTypes, projectActionTypes, graphActionTypes } from '../constants';

const { GENERATE_TEST_CASE, DELETE_TEST_CASE, SELECT_TEST_CASE } = testCaseActionTypes;
const { FETCH_PROJECT } = projectActionTypes;
const { SELECT_GRAPH } = graphActionTypes;

function byId(state = {}, action) {
  switch (action.type) {
    case FETCH_PROJECT:
      return {
        ...action.response.entities.testCases
      };
    case GENERATE_TEST_CASE:
      return {
        ...state,
        ...action.response.entities.testCases
      };
    case DELETE_TEST_CASE: {
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    }
    default:
      return state;
  }
}

function selectedTestCaseId(state = null, action) {
  switch (action.type) {
    case GENERATE_TEST_CASE:
      return action.response.result;
    case SELECT_TEST_CASE:
      return action.id;
    case DELETE_TEST_CASE:
      return state === action.id ? null : state;
    case SELECT_GRAPH:
      return null;
    default:
      return state;
  }
}

const loading = createLoaderReducer({ GENERATE_TEST_CASE, DELETE_TEST_CASE });
const errorMessage = createErrorMessageReducer({ GENERATE_TEST_CASE, DELETE_TEST_CASE });

export default combineReducers({
  byId,
  selectedTestCaseId,
  loading,
  errorMessage
});

export const getTestCaseById = (state, id) => state.byId[id];
export const getSelectedTestCaseId = state => state.selectedTestCaseId;
export const isTestCaseLoading = state => state.loading;
export const getErrorMessage = state => state.errorMessage;
export const getSelectedTestCase = (state) => {
  const activeTestCaseId = getSelectedTestCaseId(state);
  return activeTestCaseId == null ? null : getTestCaseById(state, activeTestCaseId);
};
