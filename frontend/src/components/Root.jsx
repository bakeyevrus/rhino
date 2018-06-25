import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import { rootReducer } from '../reducers/reducers';
import testGraph from '../model/MockData';

const initialState = {
  activeProjectId: '1ff-2xx',
  projects: [
    {
      id: '1ff-2xx',
      name: 'Test project #1',
      elements: testGraph
    },
    {
      id: '1ff-2xy',
      name: 'Test project #2',
      elements: testGraph
    }
  ]
};

const store = createStore(rootReducer, initialState);

function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default Root;
