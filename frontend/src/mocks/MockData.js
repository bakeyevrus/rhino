const project1 = {
  nodes: [
    { data: { id: '1', name: 'Jerry', priority: 'Low' } },
    { data: { id: '2', name: 'Elaine', priority: 'Medium' } },
    { data: { id: '3', name: 'Kramer', priority: 'High' } },
    { data: { id: '4', name: 'George', priority: 'Low' } }
  ],
  edges: [
    { data: { source: '1', target: '2', priority: 'Low' } },
    { data: { source: '1', target: '3', priority: 'Low' } },
    { data: { source: '1', target: '4', priority: 'Medium' } },
    { data: { source: '2', target: '1', priority: 'Low' } },
    { data: { source: '2', target: '3', priority: 'High' } },
    { data: { source: '3', target: '1', priority: 'Low' } },
    { data: { source: '3', target: '2', priority: 'Medium' } },
    { data: { source: '3', target: '4', priority: 'High' } },
    { data: { source: '4', target: '1', priority: 'Low' } }
  ]
};

const project2 = {
  nodes: [
    { data: { id: '1', name: 'Jerry', priority: 'Low' } },
    { data: { id: '2', name: 'Elaine', priority: 'Medium' } },
    { data: { id: '3', name: 'Kramer', priority: 'High' } },
    { data: { id: '4', name: 'George', priority: 'Low' } }
  ],
  edges: [{ data: { source: '1', target: '2', priority: 'Low' } }]
};

export { project1, project2 };
