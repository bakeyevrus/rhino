import { combineReducers } from 'redux';
import modal, * as fromModal from './modal.reducer';
import auth, * as fromAuth from './auth.reducer';
import projects, * as fromProjects from './project.reducer';
import graphs, * as fromGraphs from './graph.reducer';
import editor, * as fromEditor from './editor.reducer';

export default combineReducers({
  projects,
  graphs,
  auth,
  modal,
  editor
});

// Auth
export const isLoggedIn = state => fromAuth.isLoggedIn(state.auth);

// Graphs
export const getActiveGraph = state => fromGraphs.getActiveGraph(state.graphs);
export const getGraphList = state => fromGraphs.getGraphList(state.graphs);
export const getActiveGraphId = state => fromGraphs.getActiveGraphId(state.graphs);
export const getGraphById = (state, id) => fromGraphs.getGraphById(state.graphs, id);
export const isGraphLoading = state => fromGraphs.isLoading(state.graphs);
export const getGraphErrorMessage = state => fromGraphs.getErrorMessage(state.graphs);

// Projects
export const getActiveProject = state => fromProjects.getActiveProject(state.projects);
export const getProjectList = state => fromProjects.getProjectList(state.projects);
export const isProjectLoading = state => fromProjects.isLoading(state.projects);
export const getActiveProjectId = state => fromProjects.getActiveProjectId(state.projects);
export const getProjectById = (state, id) => fromProjects.getProjectById(state.projects, id);
export const getProjectErrorMessage = state => fromProjects.getErrorMessage(state.projects);

// Editor
export const getLastSavedTimestamp = state => fromEditor.getLastSavedTimestamp(state.editor);
export const isGraphSavingInBackground = state => fromEditor.isSaving(state.editor);
export const getEditorErrorMessage = state => fromEditor.getErrorMessage(state.editor);

// Modals
export const getModalState = state => fromModal.getModalState(state.modal);
