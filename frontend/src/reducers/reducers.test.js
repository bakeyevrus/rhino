import { rootReducer as reducer, projects, activeProjectId } from './reducers';

describe('reducers', () => {
  it('should create initial state', () => {
    const stateAfter = {
      activeProjectId: null,
      projects: []
    };
    expect(reducer(undefined, {})).toEqual(stateAfter);
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
        elements: {}
      }
    ];

    expect(projects(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle REMOVE_PROJECT', () => {
    const stateBefore = [
      {
        id: 1,
        name: 'Test Project',
        elements: {}
      }
    ];
    const action = {
      type: 'REMOVE_PROJECT',
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
});
