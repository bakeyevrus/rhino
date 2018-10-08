import uuid from 'uuid/v4';
import { fetchAllProjects } from '../services/AjaxService';

export const createProject = name => ({
  type: 'CREATE_PROJECT',
  id: uuid(),
  name
});

export const deleteProject = id => ({
  type: 'DELETE_PROJECT',
  id
});

export const switchProject = targetProjectId => ({
  type: 'SWITCH_PROJECT',
  id: targetProjectId
});

export const saveProject = (id, graph) => ({
  type: 'SAVE_PROJECT',
  id,
  graph
});

// How initial state could look like
// const initialState = {
//   activeProjectId: '1ff-2xx',
//   projects: [
//     {
//       id: '1ff-2xx',
//       name: 'Test project #1',
//       graph: {}
//     }
//   ]
// };

const setInitialState = initialState => ({
  type: 'SET_INITIAL_STATE',
  initialState
});

export const getAllProjects = () => (dispatch) => {
  fetchAllProjects().then(projects => dispatch(setInitialState(projects)));
};
