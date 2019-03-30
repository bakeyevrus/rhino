import { combineReducers } from 'redux';
import auth from './auth.reducer';
import modal from './modal.reducer';
import editorProject, * as fromProjects from './project.reducer';

const findProjectIndexById = (state, id) => state.map(project => project.id).indexOf(id);

const projects = (state = [], action) => {
  switch (action.type) {
    case 'SET_INITIAL_STATE':
      return action.initialState.projects;
    case 'CREATE_PROJECT':
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          graph: {}
        }
      ];
    case 'DELETE_PROJECT':
      return state.filter(project => project.id !== action.id);
    case 'SAVE_PROJECT': {
      const targetProjectIndex = findProjectIndexById(state, action.id);
      const oldProject = state[targetProjectIndex];
      const updatedProject = {
        ...oldProject,
        graph: action.graph
      };
      return [
        ...state.slice(0, targetProjectIndex),
        updatedProject,
        ...state.slice(targetProjectIndex + 1, state.length)
      ];
    }
    default:
      return state;
  }
};

const activeProjectId = (state = null, action) => {
  switch (action.type) {
    case 'DELETE_PROJECT':
      return null;
    case 'SET_INITIAL_STATE':
      return action.initialState.activeProjectId;
    case 'SWITCH_PROJECT':
    case 'CREATE_PROJECT':
      return action.id || null;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  projects,
  activeProjectId,
  project: editorProject,
  auth,
  modal
});

export default rootReducer;

export const isLoggedIn = state => state.auth.loggedIn;

// Projects
export const getProjectList = state => fromProjects.getProjectList(state.project);
export const isProjectLoading = state => fromProjects.isLoading(state.project);
export const getActiveProjectId = state => fromProjects.getActiveProjectId(state.project);
export const getProjectById = (state, id) => fromProjects.getProjectById(state.project, id);
export const getErrorMessage = state => fromProjects.getErrorMessage(state.project);
