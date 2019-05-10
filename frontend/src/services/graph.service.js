import axios from 'axios';
import { normalize } from 'normalizr';
import { graphSchema } from './schemas';
import { getAuthHeader, logDifferentResponseStatus, handleErrorResponse } from './helper';

const graphService = {
  createGraph,
  deleteGraph,
  updateGraph
};

function createGraph(graph, projectId) {
  if (graph == null) {
    throw new Error(`Provided graph is null, ${graph}`);
  }

  return axios
    .post(getRootUrl(projectId), graph, { headers: getAuthHeader() })
    .then(handleSuccessResponse, handleErrorResponse);

  function handleSuccessResponse(response) {
    if (response.status === 200) {
      return normalize(response.data, graphSchema);
    }

    logDifferentResponseStatus(response, 200);
    return {};
  }
}

function deleteGraph(graphId, projectId) {
  if (graphId == null || projectId == null) {
    throw new Error('Either graph or project ID is null');
  }

  return axios
    .delete(`${getRootUrl(projectId)}/${graphId}`, { headers: getAuthHeader() })
    .then(handleSuccessResponse, handleErrorResponse);

  function handleSuccessResponse(response) {
    if (response.status === 200) {
      return graphId;
    }

    logDifferentResponseStatus(response, 200);
    return '';
  }
}

function updateGraph(graph, projectId) {
  const { id } = graph;
  validateGraphNotNull(graph);
  validateIdNotNull(id);
  validateIdNotNull(projectId);
  // TODO: decide if we can update test cases using this endpoint
  const requestBody = { ...graph, testCases: null };

  return axios
    .put(`${getRootUrl(projectId)}/${id}`, requestBody, { headers: getAuthHeader() })
    .then(handleSuccessResponse, handleErrorResponse);

  function handleSuccessResponse(response) {
    if (response.status === 200) {
      return normalize(response.data, graphSchema);
    }

    logDifferentResponseStatus(response, 200);
    return {};
  }
}

function validateGraphNotNull(graph) {
  if (graph == null) {
    throw new Error(`Provided graph is null, ${graph}`);
  }
}

function validateIdNotNull(id) {
  if (id == null) {
    throw new Error(`Graph ID is null, ${id}`);
  }
}

function getRootUrl(projectId) {
  return `/api/v1/project/${projectId}/graph`;
}

export default graphService;
