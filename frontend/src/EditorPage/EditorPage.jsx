import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { projectActions } from '../actions';
import { isLoggedIn, getActiveProjectId, getActiveProject } from '../reducers';
import WelcomePage from './WelcomePage';
import AppBar from '../components/AppBar';

function EditorPage({
  activeProjectId, project, loggedIn, fetchProject
}) {
  useEffect(() => {
    fetchProject(activeProjectId);
  }, [activeProjectId, fetchProject]);

  return (
    <>
      <AppBar loggedIn={loggedIn} />
      {project.id != null && <h1>{`Hello from project ${project.name}`}</h1>}
      {project.id == null && <WelcomePage />}
    </>
  );
}

function mapStateToProps(state) {
  return {
    loggedIn: isLoggedIn(state),
    activeProjectId: getActiveProjectId(state),
    project: getActiveProject(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProject: id => dispatch(projectActions.fetchProject(id))
  };
}

EditorPage.defaultProps = {
  activeProjectId: null,
  project: {}
};

EditorPage.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string
  }),
  activeProjectId: PropTypes.string,
  loggedIn: PropTypes.bool.isRequired,
  fetchProject: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorPage);
