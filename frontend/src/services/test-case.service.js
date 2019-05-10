import axios from 'axios';
import { normalize } from 'normalizr';
import {
  validateIdNotNull,
  getAuthHeader,
  handleErrorResponse,
  logDifferentResponseStatus
} from './helper';
import { testCaseSchema } from './schemas';

const testCaseService = {
  generateTestCase,
  deleteTestCase
};

function generateTestCase(testCase, projectId, graphId) {
  if (testCase == null) {
    throw new Error('Provided test case is null');
  }
  validateIdNotNull(graphId, 'Graph');
  validateIdNotNull(projectId, 'Project');

  return axios
    .post(getRootUrl(projectId, graphId), testCase, { headers: getAuthHeader() })
    .then(handleSuccessResponse, handleErrorResponse);

  function handleSuccessResponse(response) {
    if (response.status === 200) {
      return normalize(response.data, testCaseSchema);
    }

    logDifferentResponseStatus(response, 200);
    return {};
  }
}

function deleteTestCase(testCaseId, projectId, graphId) {
  validateIdNotNull(testCaseId, 'Test case');
  validateIdNotNull(graphId, 'Graph');
  validateIdNotNull(projectId, 'Project');

  return axios
    .delete(`${getRootUrl(projectId, graphId)}/${testCaseId}`, { headers: getAuthHeader() })
    .then(handleSuccessResponse, handleErrorResponse);

  function handleSuccessResponse(response) {
    if (response.status === 200) {
      return testCaseId;
    }

    logDifferentResponseStatus(response, 200);
    return {};
  }
}

function getRootUrl(projectId, graphId) {
  return `/api/v1/project/${projectId}/graph/${graphId}/test-case`;
}

export default testCaseService;
