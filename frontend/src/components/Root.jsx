import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import { AppBar } from './AppBar';
import LoginPage from '../LoginPage';
import EditorPage from '../EditorPage';
import Modal from './Modals';
import { isLoggedIn } from '../reducers';

Root.propTypes = {
  loggedIn: PropTypes.bool.isRequired
};

function Root({ loggedIn: tempNotUsed }) {
  const loggedIn = true;
  return (
    <>
      <AppBar loggedIn={loggedIn} />
      <Switch>
        {/* TODO: extract endpoints to constants */}
        <Route path="/auth" component={LoginPage} />
        <Route path="/editor" component={EditorPage} />
        <Redirect to="/auth" />
      </Switch>
      <Modal />
    </>
  );
}

function mapStateToProps(state) {
  return {
    loggedIn: isLoggedIn(state)
  };
}

export default connect(mapStateToProps)(Root);
