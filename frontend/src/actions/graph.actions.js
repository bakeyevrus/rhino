import { graphActionTypes, modalTypes } from '../constants';
import { graphService } from '../services';
import { getActiveProjectId } from '../reducers';
import { request, error } from './helpers';
import modalActions from './modal.actions';

const {
  CREATE_GRAPH,
  UPDATE_GRAPH,
  SELECT_GRAPH,
  DELETE_GRAPH,
  SAVE_GRAPH_IN_BACKGROUND
} = graphActionTypes;

const graphActions = {
  createGraph,
  updateGraph,
  deleteGraph,
  selectGraph,
  saveGraph,
  saveGraphInBackground
};

function createGraph(newGraph, projectId) {
  return (dispatch) => {
    dispatch(request(CREATE_GRAPH));
    return graphService.createGraph(newGraph, projectId).then(
      (graph) => {
        dispatch({
          type: CREATE_GRAPH,
          graph
        });
        dispatch(modalActions.hideModal());
      },
      errMessage => dispatch(error(CREATE_GRAPH, { errMessage }))
    );
  };
}

function deleteGraph(graphId) {
  return (dispatch, getState) => {
    const projectId = getActiveProjectId(getState());
    dispatch(request(DELETE_GRAPH));
    return graphService.deleteGraph(graphId, projectId).then(
      id => dispatch({
        type: DELETE_GRAPH,
        id
      }),
      errMessage => dispatch(error(DELETE_GRAPH, { errMessage }))
    );
  };
}

function updateGraph(updatedGraph) {
  return (dispatch, getState) => {
    const projectId = getActiveProjectId(getState());

    dispatch(request(UPDATE_GRAPH));
    return graphService.updateGraph(updatedGraph, projectId).then(
      (graph) => {
        dispatch({
          type: UPDATE_GRAPH,
          graph
        });
        dispatch(modalActions.hideModal());
      },
      errMessage => dispatch(error(UPDATE_GRAPH, { errMessage }))
    );
  };
}

function saveGraph(graph) {
  return (dispatch) => {
    // Save graph in state
    dispatch({
      type: UPDATE_GRAPH,
      graph
    });
    // Push graph to backend
    dispatch(saveGraphInBackground(graph));
  };
}

/* TODO: implement logic for canceling action if saving already in process
 * For that in current saved graph id need to be persisted in editor state and
 * isLoading && graph.id === savedGraphId should be true
 */
function saveGraphInBackground(graph) {
  return (dispatch, getState) => {
    const projectId = getActiveProjectId(getState());
    dispatch(request(SAVE_GRAPH_IN_BACKGROUND));
    return graphService.updateGraph(graph, projectId).then(
      () => {
        dispatch({
          type: SAVE_GRAPH_IN_BACKGROUND,
          timestamp: Date.now()
        });
      },
      (errMessage) => {
        dispatch(error(SAVE_GRAPH_IN_BACKGROUND, { errMessage }));
        dispatch(modalActions.showModal(createNotificationModal(errMessage)));
      }
    );
  };
}

function createNotificationModal(errMessage) {
  return {
    modalType: modalTypes.NOTIFICATION,
    modalProps: {
      title: 'Synchronization error',
      message:
        "There was an error while saving your graph. Try manual synchronization clicking 'Save graph' button.",
      errorMessage: `Server response: ${errMessage}`
    }
  };
}

function selectGraph(id) {
  return (dispatch) => {
    dispatch({
      type: SELECT_GRAPH,
      id
    });
  };
}

export default graphActions;
