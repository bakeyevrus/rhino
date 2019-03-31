import editorState, {
  findProjectById,
  removeProject,
  addProject,
  setActiveProject,
  mutateProject
} from './mockState';

const projectService = {
  fetchProject,
  createProject,
  updateProject,
  deleteProject
};

function timeout(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Server state: ', editorState);
      resolve();
    }, seconds * 1000);
  });
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
    const projectToDelete = findProjectById(id);
    if (projectToDelete == null) {
      throw new Error("Provided ID doesn't exist in DB");
    }
    removeProject(id);
    if (id === editorState.activeProjectId) {
      setActiveProject(null);
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

    addProject(createdProject);

    return createdProject;
  });
}

function fetchProject(projectId) {
  if (projectId == null) {
    throw new Error(`Provided projectId is null, ${projectId}`);
  }

  return timeout(2).then(() => {
    const targetProject = findProjectById(projectId);
    if (targetProject == null) {
      throw new Error(`Project with id ${projectId} hasn't been found`);
    }
    setActiveProject(projectId);

    return targetProject;
  });
}

function updateProject(updatedProject) {
  if (updatedProject == null || updatedProject.id == null) {
    throw new Error('Either id or project passed is null', updatedProject);
  }

  return timeout(2).then(() => {
    const { id } = updatedProject;
    const targetProject = findProjectById(id);
    if (targetProject == null) {
      throw new Error(`Project with id ${id} hasn't been found`);
    }
    mutateProject(updatedProject);

    return updatedProject;
  });
}

export default projectService;
