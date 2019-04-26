import { graphTypes } from '../const';

const graphService = {
  createGraph,
  deleteGraph,
  updateGraph
};

function timeout(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}

function generateId() {
  let text = '';
  const maxLength = 20;
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < maxLength; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

function createGraph(graph) {
  const { name } = graph;
  if (name == null || name.length === 0) {
    throw new Error('Graph name is empty!');
  }

  return timeout(2).then(() => ({ id: generateId(), elements: {}, ...graph }));
}

function deleteGraph(id) {
  if (id === null) {
    throw new Error(`Graph with id ${id} doesn't exist`);
  }

  return timeout(2).then(() => id);
}

function updateGraph(graph) {
  const { id, name, type } = graph;
  console.log(graph);
  if (id === null || name === null || !valueExists(graphTypes, type)) {
    console.error(graph);
    throw new Error('Either graph id or name is null, or type invalid');
  }

  return timeout(2).then(() => graph);
  // .then(() => {
  //   throw new Error('Test message');
  // });

  function valueExists(obj, value) {
    return Object.keys(obj).some(key => obj[key] === value);
  }
}

export default graphService;
