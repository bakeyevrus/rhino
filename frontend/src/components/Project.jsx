import React from 'react';
import PropTypes from 'prop-types';

function Project({
  id, name, active, onSelectProject
}) {
  const handleProjectSelect = projectId => (event) => {
    event.preventDefault();
    onSelectProject(projectId);
  };

  const classes = active ? 'nav-item active' : 'nav-item';
  return (
    <li className={classes}>
      <button type="button" className="btn btn-dark nav-link" onClick={handleProjectSelect(id)}>
        {name}
      </button>
    </li>
  );
}

Project.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onSelectProject: PropTypes.func.isRequired
};

export default Project;
