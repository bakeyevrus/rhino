import { combineReducers } from 'redux';
import { projectActionTypes as projectActions, editorActionTypes as editorActions } from '../const';
import createLoaderReducer from './loader.reducer';
import createErrorMessageReducer from './error.reducer';

const {
  FETCH_PROJECT_LIST,
  FETCH_PROJECT,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT
} = projectActions;

const { FETCH_EDITOR_STATE } = editorActions;

function byId(state = {}, action) {
  switch (action.type) {
    case FETCH_PROJECT_LIST:
      return {
        ...action.projects.byId
      };
    case FETCH_PROJECT:
    case CREATE_PROJECT:
    case UPDATE_PROJECT:
      return {
        ...state,
        [action.project.id]: action.project
      };
    case DELETE_PROJECT: {
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    }
    case FETCH_EDITOR_STATE:
      return {
        ...action.response.entities.projects
      };
    default:
      return state;
  }
}

function activeProjectId(state = null, action) {
  switch (action.type) {
    case FETCH_PROJECT_LIST:
      return action.projects.activeProjectId;
    case FETCH_PROJECT:
    case CREATE_PROJECT:
      return action.project.id;
    case DELETE_PROJECT:
      return state === action.id ? null : state;
    case FETCH_EDITOR_STATE:
      return action.response.result.activeProjectId;
    default:
      return state;
  }
}

const loading = createLoaderReducer({ ...projectActions, ...editorActions });
const errorMessage = createErrorMessageReducer({ ...projectActions, ...editorActions });

export default combineReducers({
  byId,
  activeProjectId,
  loading,
  errorMessage
});

export function getProjectList(state) {
  const activeId = getActiveProjectId(state);
  const projects = [];
  if (activeId != null) {
    projects.push({
      ...state.byId[activeId],
      active: true
    });
  }

  Object.keys(state.byId)
    .filter(projectId => projectId !== activeId)
    .forEach((projectId) => {
      const project = state.byId[projectId];
      projects.push({
        ...project,
        active: false
      });
    });

  return projects;
}

export function isLoading(state) {
  return state.loading;
}

export function getActiveProjectId(state) {
  return state.activeProjectId;
}

export function getProjectById(state, id) {
  return state.byId[id];
}

export function getErrorMessage(state) {
  return state.errorMessage;
}
