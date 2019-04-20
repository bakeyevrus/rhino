import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Collapse, Card, CardBody, CardTitle, Button, ListGroup, ListGroupItem
} from 'reactstrap';

function ActiveGraphTab({
  id, name, onEditClick, onDeleteClick
}) {
  const [listOpen, setListOpen] = useState(false);
  return (
    <Card>
      <CardBody>
        <CardTitle
          className="d-flex justify-content-between align-items-center active-graph-title"
          tag="h4"
        >
          {name}
          <div>
            <Button close onClick={handleDeleteClick} size="sm" className="ml-2">
              <span className="oi oi-delete graph-panel-icon" aria-hidden="true" />
            </Button>
            <Button size="sm" close onClick={handleEditClick}>
              <span className="oi oi-pencil graph-panel-icon" aria-hidden="true" />
            </Button>
          </div>
        </CardTitle>
        <Button block size="sm">
          New TDL
        </Button>
        <Button block size="sm" onClick={toggle}>
          Show TDL
        </Button>
        <Collapse isOpen={listOpen}>
          <ListGroup className="mt-2">
            <ListGroupItem>TDL #1</ListGroupItem>
            <ListGroupItem>TDL #2</ListGroupItem>
          </ListGroup>
        </Collapse>
      </CardBody>
    </Card>
  );

  function toggle() {
    setListOpen(!listOpen);
  }

  function handleEditClick(event) {
    event.preventDefault();
    onEditClick(id);
  }

  function handleDeleteClick(event) {
    event.preventDefault();
    onDeleteClick(id, name);
  }
}

ActiveGraphTab.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default ActiveGraphTab;
