import { combineReducers } from 'redux';
import { projectActionTypes as projectActions } from '../const';
import createLoaderReducer from './loader.reducer';
import createErrorMessageReducer from './error.reducer';

const {
  FETCH_PROJECT_LIST,
  FETCH_PROJECT,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT
} = projectActions;

function byId(state = {}, action) {
  switch (action.type) {
    case FETCH_PROJECT_LIST:
      return {
        ...action.projects
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
    default:
      return state;
  }
}

const initProjectId = localStorage.getItem('activeProjectId');
function activeProjectId(state = initProjectId, action) {
  switch (action.type) {
    case FETCH_PROJECT:
    case CREATE_PROJECT:
      return action.project.id;
    case DELETE_PROJECT:
      return state === action.id ? null : state;
    default:
      return state;
  }
}

const loading = createLoaderReducer({ ...projectActions });
const errorMessage = createErrorMessageReducer({ ...projectActions });

export default combineReducers({
  byId,
  activeProjectId,
  loading,
  errorMessage
});

export function getActiveProject(state) {
  const id = getActiveProjectId(state);
  return getProjectById(state, id);
}

export function getProjectList(state) {
  const activeId = getActiveProjectId(state);
  const activeProject = getProjectById(state, activeId);
  const projects = [];
  if (activeId != null && activeProject != null) {
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
