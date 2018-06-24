import React from 'react';

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
        <div className="w-100 d-flex flex-row justify-content-between mx-2 ">
          <span className="navbar-text">Current project: unnamed</span>
          <span className="navbar-text ">Status: SAVED</span>
        </div>
      </div>
    </nav>
  );
}

export default Toolbar;