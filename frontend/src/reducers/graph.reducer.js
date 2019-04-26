import { combineReducers } from 'redux';
import { graphActionTypes, graphTypes } from '../constants';
import createLoaderReducer from './loader.reducer';
import createErrorMessageReducer from './error.reducer';

const {
  CREATE_GRAPH, UPDATE_GRAPH, SELECT_GRAPH, DELETE_GRAPH
} = graphActionTypes;

const mockGraphs = {
  graph1: {
    id: 'graph1',
    name: 'Graph1WithReallyLongNameWithReallyReally',
    type: graphTypes.STATE_MACHINE,
    elements: {
      nodes: [
        {
          data: {
            name: 'a',
            priority: 'Medium',
            id: '5b565ee8-f268-4666-802c-7ae3f90d6284'
          },
          position: {
            x: 376.9012968564243,
            y: 137.96386993683436
          },
          group: 'nodes',
          removed: false,
          selected: false,
          selectable: true,
          locked: false,
          grabbable: true,
          classes: ''
        },
        {
          data: {
            name: 'b',
            priority: 'High',
            id: 'fca59304-25cb-4e5b-9b18-824e2bffc43b'
          },
          position: {
            x: 667.8251095493141,
            y: 249.93454698701876
          },
          group: 'nodes',
          removed: false,
          selected: false,
          selectable: true,
          locked: false,
          grabbable: true,
          classes: ''
        },
        {
          data: {
            name: 'c',
            priority: 'Medium',
            id: '900d71a7-b830-4ce1-ac23-5e8e8c6bc011'
          },
          position: {
            x: 415.8910861863992,
            y: 366.90391497694355
          },
          group: 'nodes',
          removed: false,
          selected: false,
          selectable: true,
          locked: false,
          grabbable: true,
          classes: ''
        },
        {
          data: {
            name: 'd',
            priority: 'Low',
            id: 'ca4616dc-0b1b-4db4-a068-5607718c817d'
          },
          position: {
            x: 575.8491962580913,
            y: 78.97931684789793
          },
          group: 'nodes',
          removed: false,
          selected: false,
          selectable: true,
          locked: false,
          grabbable: true,
          classes: ''
        },
        {
          data: {
            name: 'e',
            priority: 'Low',
            id: 'd202a8d1-93d9-4f8a-b037-a8e18afc6daf'
          },
          position: {
            x: 740.8059972695237,
            y: 77.97957865994987
          },
          group: 'nodes',
          removed: false,
          selected: false,
          selectable: true,
          locked: false,
          grabbable: true,
          classes: ''
        }
      ],
      edges: [
        {
          data: {
            id: '5b565ee8-f268-4666-802c-7ae3f90d6284_900d71a7-b830-4ce1-ac23-5e8e8c6bc011',
            name: '2',
            source: '5b565ee8-f268-4666-802c-7ae3f90d6284',
            target: '900d71a7-b830-4ce1-ac23-5e8e8c6bc011',
            from: 'a',
            to: 'c',
            priority: 'Medium'
          },
          position: {},
          group: 'edges',
          removed: false,
          selected: false,
          selectable: true,
          locked: false,
          grabbable: true,
          classes: ''
        },
        {
          data: {
            id: '900d71a7-b830-4ce1-ac23-5e8e8c6bc011_ca4616dc-0b1b-4db4-a068-5607718c817d',
            name: '3',
            source: '900d71a7-b830-4ce1-ac23-5e8e8c6bc011',
            target: 'ca4616dc-0b1b-4db4-a068-5607718c817d',
            from: 'c',
            to: 'd',
            priority: 'High'
          },
          position: {},
          group: 'edges',
          removed: false,
          selected: false,
          selectable: true,
          locked: false,
          grabbable: true,
          classes: ''
        },
        {
          data: {
            id: 'ca4616dc-0b1b-4db4-a068-5607718c817d_fca59304-25cb-4e5b-9b18-824e2bffc43b',
            name: '4',
            source: 'ca4616dc-0b1b-4db4-a068-5607718c817d',
            target: 'fca59304-25cb-4e5b-9b18-824e2bffc43b',
            from: 'd',
            to: 'b',
            priority: 'Low'
          },
          position: {},
          group: 'edges',
          removed: false,
          selected: false,
          selectable: true,
          locked: false,
          grabbable: true,
          classes: ''
        },
        {
          data: {
            id: 'ca4616dc-0b1b-4db4-a068-5607718c817d_d202a8d1-93d9-4f8a-b037-a8e18afc6daf',
            name: '5',
            source: 'ca4616dc-0b1b-4db4-a068-5607718c817d',
            target: 'd202a8d1-93d9-4f8a-b037-a8e18afc6daf',
            from: 'd',
            to: 'e',
            priority: 'Low'
          },
          position: {},
          group: 'edges',
          removed: false,
          selected: false,
          selectable: true,
          locked: false,
          grabbable: true,
          classes: ''
        }
      ]
    }
  },
  graph2: {
    id: 'graph2',
    name: 'Graph2',
    type: graphTypes.FLOW,
    elements: {
      nodes: [
        {
          data: {
            name: 'a',
            priority: 'Medium',
            id: '5b565ee8-f268-4666-802c-7ae3f90d6284'
          },
          position: {
            x: 376.9012968564243,
            y: 137.96386993683436
          },
          group: 'nodes',
          removed: false,
          selected: false,
          selectable: true,
          locked: false,
          grabbable: true,
          classes: ''
        }
      ],
      edges: []
    }
  }
};

function byId(state = mockGraphs, action) {
  switch (action.type) {
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
    case CREATE_GRAPH:
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
