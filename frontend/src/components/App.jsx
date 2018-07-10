import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { switchProject } from '../actions/actions';
import CytoscapeContainer from '../containers/CytoscapeContainer';
import Toolbar from './Toolbar';

function App(props) {
  const { dispatch } = props;
  const myRef = React.createRef();

  const saveActiveProject = () => {
    myRef.current.saveProject();
  };

  const onProjectSwitch = (targetProjectId) => {
    saveActiveProject();
    dispatch(switchProject(targetProjectId));
  };

  return (
    <React.Fragment>
      <Toolbar onProjectSwitch={onProjectSwitch} />
      <CytoscapeContainer ref={myRef} />
    </React.Fragment>
  );
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(App);
