import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { projectActions } from '../actions';
import { isLoggedIn, getActiveProjectId, getProjectById } from '../reducers';
import WelcomePage from './WelcomePage';
import AppBar from '../components/AppBar';

function EditorPage({ project, loggedIn }) {
  useEffect(() => {
    if (project.id == null) {
      return;
    }

    projectActions.fetchProject(project.id);
  }, [project.id]);

  return (
    <>
      <AppBar loggedIn={loggedIn} />
      {project.id != null && <h1>{`Hello from project ${project.name}`}</h1>}
      {project.id == null && <WelcomePage />}
    </>
  );
}

function mapStateToProps(state) {
  const loggedIn = isLoggedIn(state);
  const activeProjectId = getActiveProjectId(state);
  if (activeProjectId == null) {
    return { loggedIn };
  }
  const project = getProjectById(state, activeProjectId);
  return {
    project,
    loggedIn
  };
}

EditorPage.defaultProps = {
  project: {}
};

EditorPage.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string
  }),
  loggedIn: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(EditorPage);
