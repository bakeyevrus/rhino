import { combineReducers } from 'redux';
import modal, * as fromModal from './modal.reducer';
import auth, * as fromAuth from './auth.reducer';
import project, * as fromProjects from './project.reducer';
import graphs, * as fromGraphs from './graph.reducer';
import editor, * as fromEditor from './editor.reducer';

const rootReducer = combineReducers({
  project,
  graphs,
  auth,
  modal,
  editor
});

export default rootReducer;

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
export const getActiveProject = state => fromProjects.getActiveProject(state.project);
export const getProjectList = state => fromProjects.getProjectList(state.project);
export const isProjectLoading = state => fromProjects.isLoading(state.project);
export const getActiveProjectId = state => fromProjects.getActiveProjectId(state.project);
export const getProjectById = (state, id) => fromProjects.getProjectById(state.project, id);
export const getProjectErrorMessage = state => fromProjects.getErrorMessage(state.project);

// Editor
export const getLastSavedTimestamp = state => fromEditor.getLastSavedTimestamp(state.editor);
export const isGraphSavingInBackground = state => fromEditor.isSaving(state.editor);
export const getEditorErrorMessage = state => fromEditor.getErrorMessage(state.editor);

// Modals
export const getModalState = state => fromModal.getModalState(state.modal);
