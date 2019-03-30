import React from 'react';
import PropTypes from 'prop-types';
import { DropdownItem, Button } from 'reactstrap';
import './projectTab.css';

function ProjectTab({
  id, name, active, description, onSelectClick, onEditClick, onDeleteClick
}) {
  return (
    <>
      {active && <DropdownItem header>Your active project</DropdownItem>}
      <DropdownItem
        disabled={active}
        className="noactive"
        onClick={active ? undefined : handleSelectClick}
      >
        {name}
        {renderProjectDescription()}
      </DropdownItem>
      <div className="dropdown-button-toolbar">
        <Button outline color="primary" size="sm" onClick={handleEditClick}>
          Edit
        </Button>
        <Button outline color="danger" size="sm" className="ml-2" onClick={handleDeleteClick}>
          Delete
        </Button>
      </div>
      <DropdownItem divider />
    </>
  );

  function handleSelectClick(event) {
    event.preventDefault();
    onSelectClick(id);
  }

  function handleDeleteClick(event) {
    event.preventDefault();
    onDeleteClick(id, name);
  }

  function handleEditClick(event) {
    event.preventDefault();
    onEditClick({ id, name, description });
  }

  function renderProjectDescription() {
    if (description == null) {
      return null;
    }

    return <span className="dropdown-item-desc">{description}</span>;
  }
}

ProjectTab.defaultProps = {
  active: false,
  description: null
};

ProjectTab.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onSelectClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  description: PropTypes.string,
  active: PropTypes.bool
};

export default ProjectTab;
