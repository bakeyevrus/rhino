import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { switchProject, createProject, getAllProjects } from '../actions/actions';
import WelcomePage from './WelcomePage';
import CytoscapeContainer from '../containers/CytoscapeContainer';
import Toolbar from './Toolbar';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.myRef = React.createRef();
    this.handleProjectSwitch = this.handleProjectSwitch.bind(this);
    this.handleProjectCreate = this.handleProjectCreate.bind(this);
  }

  componentDidMount() {
    const { store } = this.context;

    this.unsubscribe = store.subscribe(() => this.forceUpdate());

    const { dispatch } = this.props;
    dispatch(getAllProjects());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  saveActiveProject() {
    const { store } = this.context;
    const { activeProjectId } = store.getState();

    if (activeProjectId == null) {
      return;
    }

    this.myRef.current.saveProject();
  }

  handleProjectSwitch(targetProjectId) {
    const { dispatch } = this.props;

    this.saveActiveProject();
    dispatch(switchProject(targetProjectId));
  }

  handleProjectCreate(newProjectName) {
    const { dispatch } = this.props;

    this.saveActiveProject();
    dispatch(createProject(newProjectName));
  }

  render() {
    const { myRef } = this;
    const { store } = this.context;

    const { activeProjectId } = store.getState();
    const editorContent =
      activeProjectId == null ? <WelcomePage /> : <CytoscapeContainer ref={myRef} />;

    return (
      <React.Fragment>
        <Toolbar
          onProjectSwitch={this.handleProjectSwitch}
          onProjectCreate={this.handleProjectCreate}
        />
        {editorContent}
      </React.Fragment>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
};

App.contextTypes = {
  store: PropTypes.object
};

export default connect()(App);
