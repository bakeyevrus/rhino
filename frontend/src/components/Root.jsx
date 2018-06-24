import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import testGraph from '../model/MockData';

const initialState = {
  activeProject: 1,
  projects: [
    {
      id: 1,
      name: 'Test project',
      elements: testGraph
    }
  ]
};

const store = createStore(() => {}, initialState);

function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default Root;
