import React from 'react';
import PropTypes from 'prop-types';

function Project({
  id, name, active, onProjectSwitch
}) {
  const handleProjectSelect = projectId => (event) => {
    event.preventDefault();
    onProjectSwitch(projectId);
  };

  const classes = active ? 'nav-item active' : 'nav-item';
  const projectTab = active ? (
    <span className="nav-link">{name}</span>
  ) : (
    <button type="button" className="btn btn-dark nav-link" onClick={handleProjectSelect(id)}>
      {name}
    </button>
  );

  return <li className={classes}>{projectTab}</li>;
}

Project.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onProjectSwitch: PropTypes.func.isRequired
};

export default Project;
