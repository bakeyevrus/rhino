import { combineReducers } from 'redux';

export const projects = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_PROJECT':
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          elements: {}
        }
      ];
    case 'REMOVE_PROJECT':
      return state.filter(project => project.id !== action.id);
    default:
      return state;
  }
};

export const activeProjectId = (state = null, action) => {
  switch (action.type) {
    case 'SWITCH_PROJECT':
      return action.id;
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
