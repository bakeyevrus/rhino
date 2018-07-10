import React from 'react';
import PropTypes from 'prop-types';
import ProjectTabsContainer from '../containers/ProjectTabsContainer';

function Toolbar(props) {
  const { onProjectSwitch } = props;

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a className="navbar-brand" href="asd">
        Rhino
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbar"
        aria-controls="navbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbar">
        <ProjectTabsContainer onProjectSwitch={onProjectSwitch} />
      </div>
    </nav>
  );
}

Toolbar.propTypes = {
  onProjectSwitch: PropTypes.func.isRequired
};

export default Toolbar;
