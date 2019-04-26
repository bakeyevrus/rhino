import React from 'react';
import { Jumbotron } from 'reactstrap';

function SelectProjectBanner() {
  return (
    <Jumbotron>
      <h1 className="display-6">No active graph selected</h1>
      <p className="lead">Start by selecting any existing graph or creating new one.</p>
    </Jumbotron>
  );
}

export default SelectProjectBanner;
