import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers';
import Root from './components/Root';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(rootReducer, applyMiddleware(thunk));

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
