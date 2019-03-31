import { schema, normalize } from 'normalizr';
import editorState from './mockState';

const editorService = {
  fetchEditorState
};

const getEditorStateSchema = () => {
  const project = new schema.Entity('projects');
  const graph = new schema.Entity('graphs');
  const responseSchema = { projects: [project], graphs: [graph] };
  return responseSchema;
};

function timeout(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

function fetchEditorState() {
  return timeout(2).then(() => normalize(editorState, getEditorStateSchema()));
}

export default editorService;
