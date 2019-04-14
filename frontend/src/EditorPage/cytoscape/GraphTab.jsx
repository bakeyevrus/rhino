import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'reactstrap';
import './graphTab.css';

function GraphTab({ id, name, onSelectClick }) {
  return (
    <ListGroupItem className="graph-title" onClick={handleSelectClick}>
      {name}
    </ListGroupItem>
  );

  function handleSelectClick(event) {
    event.preventDefault();
    onSelectClick(id);
  }
}

GraphTab.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onSelectClick: PropTypes.func.isRequired
};

export default GraphTab;
