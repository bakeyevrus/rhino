import { combineReducers } from 'redux';
import { graphActionTypes, graphTypes } from '../const';
import createLoaderReducer from './loader.reducer';
import createErrorMessageReducer from './error.reducer';

const {
  CREATE_GRAPH, UPDATE_GRAPH, SWITCH_GRAPH, DELETE_GRAPH
} = graphActionTypes;

const mockGraphs = {
  graph1: {
    id: 'graph1',
    name: 'Graph1WithReallyLongNameWithReallyReally',
    type: graphTypes.STATE_MACHINE,
    editorState: {}
  },
  graph2: {
    id: 'graph2',
    name: 'Graph2',
    type: graphTypes.FLOW,
    editorState: {}
  }
};

function byId(state = mockGraphs, action) {
  switch (action.type) {
    case CREATE_GRAPH:
    case UPDATE_GRAPH:
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
    case SWITCH_GRAPH:
      return action.id;
    case CREATE_GRAPH:
    case UPDATE_GRAPH:
      return action.graph.id;
    case DELETE_GRAPH:
      return state === action.id ? null : state;
    default:
      return state;
  }
}

const loading = createLoaderReducer({ ...graphActionTypes });
const errorMessage = createErrorMessageReducer({ ...graphActionTypes });

export const getGraphList = state => Object.keys(state.byId).map(id => state.byId[id]);
export const getActiveGraphId = state => state.activeGraphId;
export const getGraphById = (state, id) => state.byId[id];
export const isLoading = state => state.loading;
export const getErrorMessage = state => state.errorMessage;

export default combineReducers({
  byId,
  activeGraphId,
  loading,
  errorMessage
});
