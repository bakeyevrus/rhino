import React from 'react';
import PropTypes from 'prop-types';
import CreateProject from './CreateProject';
import Project from './Project';

function ProjectTabs({ projects, onProjectSwitch, onProjectCreate }) {
  return (
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
      {projects.map(project => (
        <Project
          key={project.id}
          id={project.id}
          name={project.name}
          active={project.active}
          onProjectSwitch={onProjectSwitch}
        />
      ))}
      <CreateProject onProjectCreate={onProjectCreate} />
    </ul>
  );
}

ProjectTabs.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired
  })).isRequired,
  onProjectSwitch: PropTypes.func.isRequired,
  onProjectCreate: PropTypes.func.isRequired
};

export default ProjectTabs;
