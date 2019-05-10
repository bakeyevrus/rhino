import { combineReducers } from 'redux';
import { graphActionTypes, projectActionTypes, testCaseActionTypes } from '../constants';
import createLoaderReducer from './loader.reducer';
import createErrorMessageReducer from './error.reducer';

const {
  CREATE_GRAPH, UPDATE_GRAPH, SELECT_GRAPH, DELETE_GRAPH, SAVE_GRAPH
} = graphActionTypes;
const { FETCH_PROJECT } = projectActionTypes;
const { GENERATE_TEST_CASE, DELETE_TEST_CASE } = testCaseActionTypes;

function byId(state = {}, action) {
  switch (action.type) {
    case FETCH_PROJECT:
      return {
        ...action.response.entities.graphs
      };
    case CREATE_GRAPH:
    case UPDATE_GRAPH:
      /**
        * Important note:
        * If we start deep copying of properties like in the snippet bellow,
        * then we start getting re-creating new instance of Editor.jsx on every state
        * update, since elements will start pointing on new object every time
          [action.graph.id]: {
          ...action.graph,
          elements: { ...action.graph.elements }
        }
      */
      return {
        ...state,
        ...action.response.entities.graphs
      };
    case SAVE_GRAPH:
      return {
        ...state,
        [action.graph.id]: action.graph
      };
    case DELETE_GRAPH: {
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    }
    case GENERATE_TEST_CASE: {
      const { graphId, response } = action;
      /**
        * Important note:
        * If we start deep copying of properties like in the snippet bellow,
        * then we start getting re-creating new instance of Editor.jsx on every state
        * update, since elements will start pointing on new object every time
          [action.graph.id]: {
          ...action.graph,
          elements: { ...action.graph.elements }
        }
      */
      const graph = state[graphId];
      graph.testCases = graph.testCases.concat(response.result);
      return {
        ...state,
        [graphId]: graph
      };
    }
    case DELETE_TEST_CASE: {
      const { id: testCaseId, graphId } = action;
      /**
        * Important note:
        * If we start deep copying of properties like in the snippet bellow,
        * then we start getting re-creating new instance of Editor.jsx on every state
        * update, since elements will start pointing on new object every time
          [action.graph.id]: {
          ...action.graph,
          elements: { ...action.graph.elements }
        }
      */
      const graph = state[graphId];
      graph.testCases = graph.testCases.filter(id => id !== testCaseId);
      return {
        ...state,
        [graphId]: graph
      };
    }
    default:
      return state;
  }
}

const initGraphId = localStorage.getItem('activeGraphId');
function activeGraphId(state = initGraphId, action) {
  switch (action.type) {
    case SELECT_GRAPH:
      return action.id;
    case UPDATE_GRAPH:
      return action.response.result;
    case DELETE_GRAPH:
      return state === action.id ? null : state;
    default:
      return state;
  }
}

const loading = createLoaderReducer({
  CREATE_GRAPH,
  UPDATE_GRAPH,
  SELECT_GRAPH,
  DELETE_GRAPH
});
const errorMessage = createErrorMessageReducer({
  CREATE_GRAPH,
  UPDATE_GRAPH,
  SELECT_GRAPH,
  DELETE_GRAPH
});

export const getActiveGraphId = state => state.activeGraphId;
export const getActiveGraph = (state) => {
  const id = getActiveGraphId(state);
  return state.byId[id];
};
export const getGraphList = state => Object.keys(state.byId).map(id => state.byId[id]);
export const getGraphById = (state, id) => state.byId[id];
export const isLoading = state => state.loading;
export const getErrorMessage = state => state.errorMessage;

export default combineReducers({
  byId,
  activeGraphId,
  loading,
  errorMessage
});
