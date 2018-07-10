import { combineReducers } from 'redux';

const findProjectIndexById = (state, id) =>
  // TODO: solution doesn't work with IE 11
  state.findIndex(project => project.id === id);

export const projects = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_PROJECT':
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          elements: []
        }
      ];
    case 'REMOVE_PROJECT':
      return state.filter(project => project.id !== action.id);
    case 'SAVE_PROJECT': {
      const targetProjectIndex = findProjectIndexById(state, action.id);
      const oldProject = state[targetProjectIndex];
      const updatedProject = {
        ...oldProject,
        elements: action.elements
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
