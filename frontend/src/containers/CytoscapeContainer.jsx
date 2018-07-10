import React, { forwardRef } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CytoscapeComponent from '../components/CytoscapeComponent';

class CytoscapeContainer extends React.Component {
  componentDidMount() {
    this.unsubscribe = this.context.store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { forwardedRef } = this.props;
    const { store } = this.context;
    const state = store.getState();
    const { activeProjectId, projects } = state;
    const activeProject = projects.find(project => project.id === activeProjectId);
    return (
      <CytoscapeComponent
        projectId={activeProject.id}
        graph={activeProject.elements}
        onProjectSave={this.handleProjectSave}
        ref={forwardedRef}
      />
    );
  }
}

CytoscapeContainer.propTypes = {
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired
};

CytoscapeContainer.contextTypes = {
  store: PropTypes.object
};

// const findActiveProject = (targetProjectId, projects) =>
//   projects.find(project => project.id === targetProjectId);

// const mapStateToProps = (state) => {
//   const activeProject = findActiveProject(state.activeProjectId, state.projects);

//   return {
//     projectId: activeProject.id,
//     graph: activeProject.elements
//   };
// };

// const mapDispatchToProps = dispatch => ({
//   onProjectSave: (projectId, graph) => dispatch(saveProject(projectId, graph))
// });

// const ConnectedCytoscapeContainer = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(CytoscapeComponent);

// export default forwardRef((props, ref) => <ConnectedCytoscapeContainer {...props} ref={ref} />);
export default forwardRef((props, ref) => <CytoscapeContainer {...props} forwardedRef={ref} />);
