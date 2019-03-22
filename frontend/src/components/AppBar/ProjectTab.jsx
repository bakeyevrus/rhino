import React from 'react';
import PropTypes from 'prop-types';
import { DropdownItem, Button } from 'reactstrap';
import './projectTab.css';

function ProjectTab({
  name, active, description, onSelectClick, onEditClick, onDeleteClick
}) {
  return (
    <>
      {active && <DropdownItem header>Your active project</DropdownItem>}
      <DropdownItem
        disabled={active}
        className="noactive"
        onClick={active ? undefined : onSelectClick}
      >
        {name}
        {renderProjectDescription()}
      </DropdownItem>
      <div className="dropdown-button-toolbar">
        <Button outline color="primary" size="sm" onClick={onEditClick}>
          Edit
        </Button>
        <Button outline color="danger" size="sm" className="ml-2" onClick={onDeleteClick}>
          Delete
        </Button>
      </div>
      <DropdownItem divider />
    </>
  );

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
  name: PropTypes.string.isRequired,
  onSelectClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  description: PropTypes.string,
  active: PropTypes.bool
};

export default ProjectTab;
