import axios from 'axios';
import { handleErrorResponse, logDifferentResponseStatus, getAuthHeader } from './helper';

const projectService = {
  getAll,
  getById,
  create,
  update,
  deleteById
};

function getAll() {
  return axios.get('/api/v1/project', { headers: getAuthHeader() }).then((response) => {
    if (response.status === 200) {
      const projectList = response.data;
      return normalizeResponse(projectList);
    }

    logDifferentResponseStatus(response, 200);
    return {};
  }, handleErrorResponse);
}

function getById(projectId) {
  validateIdNotNull(projectId);

  return axios.get(`/api/v1/project/${projectId}`, { headers: getAuthHeader() }).then((response) => {
    if (response.status === 200) {
      const project = response.data;
      return project;
    }

    logDifferentResponseStatus(response, 200);
    return {};
  }, handleErrorResponse);
}

function create(project) {
  validateProjectNotNull(project);

  return axios.post('/api/v1/project', project, { headers: getAuthHeader() }).then((response) => {
    if (response.status === 200) {
      const createdProject = response.data;
      return createdProject;
    }

    logDifferentResponseStatus(response, 200);
    return {};
  }, handleErrorResponse);
}

function update(project) {
  validateProjectNotNull(project);
  validateIdNotNull(project.id);

  return axios
    .put(`/api/v1/project/${project.id}`, project, { headers: getAuthHeader() })
    .then((response) => {
      if (response.status === 200) {
        const updatedProject = response.data;
        return updatedProject;
      }

      logDifferentResponseStatus(response, 200);
      return {};
    }, handleErrorResponse);
}

function deleteById(projectId) {
  validateIdNotNull(projectId);

  return axios
    .delete(`/api/v1/project/${projectId}`, { headers: getAuthHeader() })
    .then((response) => {
      if (response.status === 200) {
        return projectId;
      }

      logDifferentResponseStatus(response, 200);
      return '';
    }, handleErrorResponse);
}

function normalizeResponse(projectList) {
  return projectList.reduce(
    (accumulator, project) => ({ ...accumulator, [project.id]: project }),
    {}
  );
}

function validateProjectNotNull(project) {
  if (project == null) {
    throw new Error(`Provided project is null, ${project}`);
  }
}

function validateIdNotNull(id) {
  if (id == null) {
    throw new Error(`Project ID is null, ${id}`);
  }
}

export default projectService;
