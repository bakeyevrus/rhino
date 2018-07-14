import uuid from 'uuid/v4';

export const createProject = name => ({
  type: 'CREATE_PROJECT',
  id: uuid(),
  name
});

export const removeProject = id => ({
  type: 'REMOVE_PROJECT',
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
