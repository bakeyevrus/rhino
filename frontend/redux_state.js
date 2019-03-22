/* eslint-disable-next-line */
const oldState = {
  activeProjectId: 2134,
  projects: [
    {
      id: 123,
      name: 'Hello world',
      elements: ['...']
    },
    {
      id: 2134,
      name: 'Test',
      elements: ['...']
    }
  ]
};

// New state
/* eslint-disable-next-line */
const stateExample = {
  auth: {
    authenticating: false,
    loggedIn: false,
    errMsg: null
  },
  modal: {
    // ...modalProps
  },
  activeProjectId: 'prj1',
  activeGraphId: 'graph2',
  projects: {
    prj1: { id: 'prj1', name: 'Project1' },
    prj2: { id: 'prj2', name: 'Project2' }
  },
  // Graphs are bounded to active(!) project
  graphs: {
    graph1: { id: 'graph1', name: 'Graph1', editorState: {} },
    graph2: { id: 'graph2', name: 'Graph2', editorState: {} }
  }
};
