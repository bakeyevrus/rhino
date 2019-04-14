import { graphActionTypes } from '../const';
import { graphService } from '../services';
import modalActions from './modal.actions';

const {
  CREATE_GRAPH, UPDATE_GRAPH, SWITCH_GRAPH, DELETE_GRAPH
} = graphActionTypes;

const graphActions = {
  createGraph,
  updateGraph,
  deleteGraph,
  switchGraph
};

function createGraph(newGraph) {
  return (dispatch) => {
    dispatch(request(CREATE_GRAPH));
    return graphService.createGraph(newGraph).then(
      (graph) => {
        dispatch({
          type: CREATE_GRAPH,
          graph
        });
        dispatch(modalActions.hideModal());
      },
      errMessage => error(CREATE_GRAPH, { errMessage })
    );
  };
}

function deleteGraph(id) {
  return (dispatch) => {
    dispatch(request(DELETE_GRAPH));
    return graphService.deleteGraph(id).then(
      graphId => dispatch({
        type: DELETE_GRAPH,
        id: graphId
      }),
      errMessage => error(DELETE_GRAPH, { errMessage })
    );
  };
}

function updateGraph(updatedGraph) {
  return (dispatch) => {
    dispatch(request(UPDATE_GRAPH));
    return graphService.updateGraph(updatedGraph).then(
      (graph) => {
        dispatch({
          type: UPDATE_GRAPH,
          graph
        });
        dispatch(modalActions.hideModal());
      },
      errMessage => error(UPDATE_GRAPH, { errMessage })
    );
  };
}

function switchGraph(id) {
  return {
    type: SWITCH_GRAPH,
    id
  };
}

function request(actionType) {
  return {
    type: `${actionType}_REQUEST`
  };
}

function error(actionType, actionPayload) {
  return {
    type: `${actionType}_ERROR`,
    ...actionPayload
  };
}

export default graphActions;
