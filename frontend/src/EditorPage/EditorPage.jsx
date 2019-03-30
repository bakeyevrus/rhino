import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { projectActions } from '../actions';
import WelcomePage from './WelcomePage';

function EditorPage({ project }) {
  useEffect(() => {
    if (project.id == null) {
      return;
    }

    projectActions.fetchProject(project.id);
  }, [project.id]);

  return (
    <>
      {project.id != null && <h1>{`Hello from project ${project.name}`}</h1>}
      {project.id == null && <WelcomePage />}
    </>
  );
}

function mapStateToProps(state) {
  const { activeProject } = state;
  if (activeProject == null) {
    return {};
  }
  const project = state.project.byId[activeProject];
  return {
    project
  };
}

EditorPage.defaultProps = {
  project: {}
};

EditorPage.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string
  })
};

export default connect(mapStateToProps)(EditorPage);
