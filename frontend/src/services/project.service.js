const projectService = {
  fetchProjectList,
  fetchProject,
  createProject,
  updateProject,
  deleteProject
};

const projects = {
  byId: {
    1: {
      id: '1',
      name: 'I am super long project name in order to break markdown',
      description: 'I am super much more longer project description in order to break markdown'
    },
    2: { id: '2', name: 'World' },
    3: {
      id: '3',
      name: 'I am super long project name in order to break markdown',
      description:
        'I am super-super much more longer project description in order to break markdown'
    }
  },
  activeProjectId: '2'
};

function timeout(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

function generateId() {
  let text = '';
  const maxLength = 20;
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < maxLength; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

function deleteProject(id) {
  if (id == null) {
    throw new Error(`Provided ID is null, ${id}`);
  }

  return timeout(2).then(() => {
    const projectToDelete = projects.byId[id];
    if (projectToDelete == null) {
      throw new Error("Provided ID doesn't exist in DB");
    }
    delete projects.byId[id];
    if (id === projects.activeProjectId) {
      projects.activeProjectId = null;
    }
    return projectToDelete;
  });
}

function createProject(project) {
  if (project == null) {
    throw new Error(`Provided project is null, ${project}`);
  }

  return timeout(2).then(() => {
    const id = generateId();
    const createdProject = {
      ...project,
      id
    };

    projects.byId[id] = createdProject;

    return createdProject;
  });
}

function fetchProject(projectId) {
  if (projectId == null) {
    throw new Error(`Provided projectId is null, ${projectId}`);
  }

  return timeout(2).then(() => {
    const targetProject = projects.byId[projectId];
    if (targetProject == null) {
      throw new Error(`Project with id ${projectId} hasn't been found`);
    }
    projects.activeProjectId = projectId;

    return targetProject;
  });
}

function updateProject(updatedProject) {
  if (updatedProject == null || updatedProject.id == null) {
    throw new Error('Either id or project passed is null', updatedProject);
  }

  return timeout(2).then(() => {
    const { id } = updatedProject;
    if (projects.byId[id] == null) {
      throw new Error(`Project with id ${id} hasn't been found`);
    }
    projects.byId[id] = {
      ...updatedProject
    };

    return updatedProject;
  });
}

function fetchProjectList() {
  return timeout(2).then(() => projects);
}

export default projectService;
