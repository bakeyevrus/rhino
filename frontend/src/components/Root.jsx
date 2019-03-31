import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import SecuredRoute from './SecuredRoute';
import LoginPage from '../LoginPage';
import EditorPage from '../EditorPage';
import Modal from './Modals';
import { isLoggedIn } from '../reducers';

Root.propTypes = {
  loggedIn: PropTypes.bool.isRequired
};

function Root({ loggedIn }) {
  return (
    <>
      <Switch>
        {/* TODO: extract endpoints to constants */}
        <Route path="/auth" component={LoginPage} />
        <SecuredRoute loggedIn={loggedIn} path="/editor" component={EditorPage} />
        <Redirect to="/editor" />
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
