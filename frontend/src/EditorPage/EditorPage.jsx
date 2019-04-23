import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { projectActions } from '../actions';
import { isLoggedIn, getActiveProjectId, getActiveProject } from '../reducers';
import AppBar from '../components/AppBar';
import SelectProjectBanner from './SelectProjectBanner';
import Editor from './Editor';

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

EditorPage.defaultProps = {
  activeProjectId: null,
  project: {}
};

function EditorPage({
  activeProjectId, project, loggedIn, fetchProject
}) {
  useEffect(() => {
    if (activeProjectId != null) {
      fetchProject(activeProjectId);
    }
  }, [activeProjectId, fetchProject]);
  return (
    <>
      <AppBar loggedIn={loggedIn} />
      {project.id == null && <SelectProjectBanner />}
      {project.id != null && <Editor projectName={project.name} />}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorPage);
