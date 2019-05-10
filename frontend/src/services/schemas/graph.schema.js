import { schema } from 'normalizr';
import testCases from './test-case.schema';

const graphs = new schema.Entity('graphs', { testCases: [testCases] });

export default graphs;
