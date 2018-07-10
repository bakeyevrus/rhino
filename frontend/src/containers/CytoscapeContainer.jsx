import React from 'react';
import { connect } from 'react-redux';
import CytoscapeComponent from '../components/CytoscapeComponent';

const findActiveProject = (targetProjectId, projects) =>
  projects.find(project => project.id === targetProjectId);

const mapStateToProps = (state) => {
  const activeProject = findActiveProject(state.activeProjectId, state.projects);

  return {
    projectId: activeProject.id,
    graph: activeProject.elements
  };
};

const ConnectedCytoscapeContainer = connect(mapStateToProps)(CytoscapeComponent);

export default React.forwardRef((props, ref) => (
  <ConnectedCytoscapeContainer {...props} ref={ref} />
));
