import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { getActiveProjectId } from './reducers';
import Root from './components/Root';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();
// Store activeProjectId flag on each store change into local storage
store.subscribe(() => {
  const projectId = getActiveProjectId(store.getState());
  localStorage.setItem('activeProjectId', projectId);
});

/* eslint-disable */
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
