import { combineReducers } from 'redux';
import { graphActionTypes, projectActionTypes } from '../constants';
import createLoaderReducer from './loader.reducer';
import createErrorMessageReducer from './error.reducer';

const {
  CREATE_GRAPH, UPDATE_GRAPH, SELECT_GRAPH, DELETE_GRAPH
} = graphActionTypes;
const { FETCH_PROJECT } = projectActionTypes;

function byId(state = {}, action) {
  switch (action.type) {
    case FETCH_PROJECT:
      return {
        ...action.project.graphs
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
        [action.graph.id]: action.graph
      };
    case DELETE_GRAPH: {
      const newState = { ...state };
      delete newState[action.id];
      return newState;
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
      return action.graph.id;
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
