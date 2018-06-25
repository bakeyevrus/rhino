import * as actions from './actions';

const mockUuid = '00000000-0000-0000-0000-000000000000';
jest.mock('uuid/v4', () => () => mockUuid);

describe('actions', () => {
  it('should create an action to add new project', () => {
    const name = 'Test project';
    const expectedAction = {
      type: 'CREATE_PROJECT',
      id: mockUuid,
      name
    };
    expect(actions.createProject(name)).toEqual(expectedAction);
  });

  it('should create an action to remove existing project', () => {
    const projectId = mockUuid;
    const expectedAction = {
      type: 'REMOVE_PROJECT',
      id: projectId
    };
    expect(actions.removeProject(projectId)).toEqual(expectedAction);
  });

  it('should create an action to change active project', () => {
    const targetProjectId = mockUuid;
    const expectedAction = {
      type: 'SWITCH_PROJECT',
      id: targetProjectId
    };
    expect(actions.switchProject(targetProjectId)).toEqual(expectedAction);
  });
});
