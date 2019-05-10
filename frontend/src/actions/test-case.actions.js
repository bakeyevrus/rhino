import { testCaseActionTypes } from '../constants';
import { testCaseService } from '../services';
import { request, error } from './helpers';
import { getActiveProjectId, getActiveGraphId } from '../reducers';
import modalActions from './modal.actions';

const { GENERATE_TEST_CASE, DELETE_TEST_CASE, SELECT_TEST_CASE } = testCaseActionTypes;

const testCaseActions = {
  selectTestCase,
  generateTestCase,
  deleteTestCase
};

function generateTestCase(testCase) {
  return (dispatch, getState) => {
    const state = getState();
    const projectId = getActiveProjectId(state);
    const graphId = getActiveGraphId(state);

    dispatch(request(GENERATE_TEST_CASE));
    return testCaseService.generateTestCase(testCase, projectId, graphId).then(
      (response) => {
        dispatch({
          type: GENERATE_TEST_CASE,
          response,
          graphId
        });
        dispatch(modalActions.hideModal());
      },
      errMessage => dispatch(error(GENERATE_TEST_CASE, { errMessage }))
    );
  };
}

function deleteTestCase(testCaseId) {
  return (dispatch, getState) => {
    const state = getState();
    const projectId = getActiveProjectId(state);
    const graphId = getActiveGraphId(state);

    dispatch(request(DELETE_TEST_CASE));
    return testCaseService.deleteTestCase(testCaseId, projectId, graphId).then(
      id => dispatch({
        type: DELETE_TEST_CASE,
        id,
        graphId
      }),
      errMessage => dispatch(error(DELETE_TEST_CASE, { errMessage }))
    );
  };
}

function selectTestCase(id) {
  return {
    type: SELECT_TEST_CASE,
    id
  };
}

export default testCaseActions;
