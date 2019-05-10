import { schema } from 'normalizr';
import graphs from './graph.schema';

const projects = new schema.Entity('projects', { graphs: [graphs] });

export default projects;
