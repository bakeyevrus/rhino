import React from 'react';
import { Switch, Route } from 'react-router';
import App from './App';
import { AppBar } from './AppBar';
import LoginPage from '../LoginPage';

function Root() {
  return (
    <>
      <AppBar loggedIn />
      <Switch>
        {/* TODO: extract endpoints to constants */}
        <Route exact path="/" component={null} />
        <Route path="/auth" component={LoginPage} />
        <Route path="/editor" component={App} />
      </Switch>
    </>
  );
}

export default Root;
