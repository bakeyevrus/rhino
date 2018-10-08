import { combineReducers } from 'redux';

const findProjectIndexById = (state, id) => state.map(project => project.id).indexOf(id);

export const projects = (state = [], action) => {
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

export const activeProjectId = (state = null, action) => {
  switch (action.type) {
    case 'DELETE_PROJECT':
      return null;
    case 'SET_INITIAL_STATE':
      return action.initialState.activeProjectId;
    case 'SWITCH_PROJECT':
    case 'CREATE_PROJECT':
      return action.id;
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  projects,
  activeProjectId
});
