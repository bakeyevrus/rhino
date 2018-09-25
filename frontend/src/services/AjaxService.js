export const fetchAllProjects = () => fetch('/api/project').then(response => response.json());
