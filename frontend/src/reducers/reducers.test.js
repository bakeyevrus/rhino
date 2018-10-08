import { rootReducer as reducer, projects, activeProjectId } from './reducers';

describe('reducers', () => {
  it('should create initial state', () => {
    const stateAfter = {
      activeProjectId: null,
      projects: []
    };
    expect(reducer(undefined, {})).toEqual(stateAfter);
  });

  it('should handle SET_INITIAL_STATE', () => {
    const stateBefore = {
      activeProjectId: null,
      projects: []
    };
    const action = {
      type: 'SET_INITIAL_STATE',
      initialState: {
        activeProjectId: '1ff-2xx',
        projects: [
          {
            id: '1ff-2xx',
            name: 'Test project #1',
            graph: {}
          }
        ]
      }
    };
    const stateAfter = {
      activeProjectId: '1ff-2xx',
      projects: [
        {
          id: '1ff-2xx',
          name: 'Test project #1',
          graph: {}
        }
      ]
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle CREATE_PROJECT', () => {
    const stateBefore = [];
    const action = {
      type: 'CREATE_PROJECT',
      id: 1,
      name: 'Test project'
    };
    const stateAfter = [
      {
        id: 1,
        name: 'Test project',
        graph: {}
      }
    ];

    expect(projects(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle DELETE_PROJECT', () => {
    const stateBefore = [
      {
        id: 1,
        name: 'Test Project',
        elements: {}
      }
    ];
    const action = {
      type: 'DELETE_PROJECT',
      id: 1
    };
    const stateAfter = [];

    expect(projects(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle SWITCH_PROJECT', () => {
    const stateBefore = 1;
    const action = {
      type: 'SWITCH_PROJECT',
      id: 2
    };
    const stateAfter = 2;

    expect(activeProjectId(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle SAVE_PROJECT', () => {
    const stateBefore = [
      {
        id: 1,
        name: 'Test project',
        graph: {
          elements: {
            nodes: {
              data: { id: '2', name: 'Ron', priority: 'High' }
            }
          }
        }
      }
    ];
    const action = {
      type: 'SAVE_PROJECT',
      id: 1,
      graph: {
        elements: {
          nodes: {
            data: { id: '1', name: 'Jerry', priority: 'Low' }
          }
        }
      }
    };
    const stateAfter = [
      {
        id: 1,
        name: 'Test project',
        graph: {
          elements: {
            nodes: {
              data: { id: '1', name: 'Jerry', priority: 'Low' }
            }
          }
        }
      }
    ];

    expect(projects(stateBefore, action)).toEqual(stateAfter);
  });
});
