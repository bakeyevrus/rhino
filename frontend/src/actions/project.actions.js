import { projectService } from '../services';
import { projectActionTypes } from '../constants';
import modalActions from './modal.actions';
import { error, request } from './helpers';

const {
  FETCH_PROJECT_LIST,
  FETCH_PROJECT,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT
} = projectActionTypes;

const projectActions = {
  fetchProjectList,
  fetchProject,
  createProject,
  updateProject,
  deleteProject
};

function fetchProjectList() {
  return (dispatch) => {
    dispatch(request(FETCH_PROJECT_LIST));

    return projectService.getAll().then(
      projects => dispatch({
        type: FETCH_PROJECT_LIST,
        projects
      }),
      errMessage => dispatch(error(FETCH_PROJECT_LIST, { errMessage }))
    );
  };
}

function fetchProject(projectId) {
  return (dispatch) => {
    dispatch(request(FETCH_PROJECT));

    return projectService.getById(projectId).then(
      response => dispatch({
        type: FETCH_PROJECT,
        response
      }),
      errMessage => dispatch(error(FETCH_PROJECT, { errMessage }))
    );
  };
}

function createProject(newProject) {
  return (dispatch) => {
    dispatch(request(CREATE_PROJECT));

    return projectService.create(newProject).then(
      (project) => {
        dispatch({
          type: CREATE_PROJECT,
          project
        });
        dispatch(modalActions.hideModal());
      },
      errMessage => dispatch(error(CREATE_PROJECT, { errMessage }))
    );
  };
}

function updateProject(updatedProject) {
  return (dispatch) => {
    dispatch(request(UPDATE_PROJECT));

    return projectService.update(updatedProject).then(
      (project) => {
        dispatch({
          type: UPDATE_PROJECT,
          project
        });
        dispatch(modalActions.hideModal());
      },
      errMessage => dispatch(error(UPDATE_PROJECT, { errMessage }))
    );
  };
}

function deleteProject(id) {
  return (dispatch) => {
    dispatch(request(DELETE_PROJECT));

    return projectService.deleteById(id).then(
      (projectId) => {
        dispatch({
          type: DELETE_PROJECT,
          id: projectId
        });
      },
      errMessage => dispatch(error(DELETE_PROJECT, { errMessage }))
    );
  };
}

export default projectActions;
