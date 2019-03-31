const editorState = {
  projects: [
    {
      id: '1',
      name: 'I am super long project name in order to break markdown',
      description: 'I am super much more longer project description in order to break markdown'
    },
    { id: '2', name: 'World' },
    {
      id: '3',
      name: 'I am super long project name in order to break markdown',
      description:
        'I am super-super much more longer project description in order to break markdown'
    }
  ],
  graphs: [{ id: 'g-1', name: 'My graph 1' }, { id: 'g-2', name: 'My graph 2' }],
  activeProjectId: '2',
  activeGraphId: 'g-1'
};

export const findProjectById = id => editorState.projects.find(project => project.id === id);
export const removeProject = (id) => {
  editorState.projects = editorState.projects.filter(project => project.id !== id);
};
export const addProject = (project) => {
  editorState.projects.push(project);
};
export const setActiveProject = (projectId) => {
  editorState.activeProjectId = projectId;
};

export const mutateProject = (project) => {
  const idx = editorState.projects.findIndex(val => val.id === project.id);
  editorState.projects[idx] = { ...project };
};

export default editorState;
