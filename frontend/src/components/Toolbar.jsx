import React from 'react';
import ProjectTabsContainer from '../containers/ProjectTabsContainer';

function Toolbar() {
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
        <ProjectTabsContainer />
      </div>
    </nav>
  );
}

export default Toolbar;
