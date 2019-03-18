import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { rootReducer } from '../reducers';
import App from './App';
import LoginPage from '../LoginPage';

const store = createStore(rootReducer, applyMiddleware(thunk));

function Root() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          {/* TODO: extract endpoints to constants */}
          <Route exact path="/" component={null} />
          <Route path="/auth" component={LoginPage} />
          <Route path="/editor" component={App} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default Root;
