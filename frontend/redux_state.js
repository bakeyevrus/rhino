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
  projects: {
    requestPending: false,
    activeProjectId: 'prj1',
    byId: {
      prj1: { id: 'prj1', name: 'Project1' },
      prj2: { id: 'prj2', name: 'Project2' }
    }
  },
  // Graphs are bounded to active(!) project
  graphs: {
    activeGraphId: 'graph1',
    byId: {
      graph1: { id: 'graph1', name: 'Graph1', editorState: {} },
      graph2: { id: 'graph2', name: 'Graph2', editorState: {} }
    }
  }
};
