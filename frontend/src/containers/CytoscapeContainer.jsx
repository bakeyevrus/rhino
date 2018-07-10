import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { saveProject } from '../actions/actions';
import CytoscapeComponent from '../components/CytoscapeComponent';

/**
 * This class is not using react-redux, because React ref forwarding
 * is not supported yet (7/10/2018). This is the main reason why this class
 * is written with pure Redux
 */
class CytoscapeContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleProjectSave = this.handleProjectSave.bind(this);
  }

  componentDidMount() {
    const { store } = this.context;

    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleProjectSave(projectId, graph) {
    const { store } = this.context;

    store.dispatch(saveProject(projectId, graph));
  }

  render() {
    const { forwardedRef } = this.props;
    const { store } = this.context;
    const state = store.getState();
    const { activeProjectId, projects } = state;
    const activeProject = projects.find(project => project.id === activeProjectId);
    const graph =
      activeProject.elements.nodes || activeProject.elements.edges
        ? [...activeProject.elements.nodes, ...activeProject.elements.edges]
        : [];
    // console.log(activeProject.elements);
    return (
      <CytoscapeComponent
        projectId={activeProject.id}
        graph={graph}
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

export default forwardRef((props, ref) => <CytoscapeContainer {...props} forwardedRef={ref} />);
