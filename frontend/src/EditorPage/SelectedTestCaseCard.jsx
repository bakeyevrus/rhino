import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardHeader, CardBody, CardTitle, CardText, Table, Button
} from 'reactstrap';

SelectedTestCaseCard.propTypes = {
  selectedTestCase: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    paths: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
  }).isRequired,
  highlightPath: PropTypes.func.isRequired,
  getElementNameById: PropTypes.func.isRequired,
  closeCard: PropTypes.func.isRequired,
  deleteTestCase: PropTypes.func.isRequired
};

function SelectedTestCaseCard({
  selectedTestCase,
  highlightPath,
  getElementNameById,
  deleteTestCase,
  closeCard
}) {
  const { id, name, paths } = selectedTestCase;
  const isValid = paths.length > 0;
  let isPathValid = true;

  paths.forEach(path => path.forEach((elementId) => {
    if (!isPathValid) {
      // Skip processing since we are not going to display path
      return elementId;
    }

    const elementName = getElementNameById(elementId);
    if (elementName == null) {
      isPathValid = false;
      return elementId;
    }

    return elementName;
  }));

  return (
    <Card>
      <CardHeader className={isValid && isPathValid ? null : 'bg-danger'}>
        {name}
        <Button close onClick={closeCard} size="sm">
          <span className="oi oi-x graph-panel-icon" aria-hidden="true" style={{ top: 0 }} />
        </Button>
      </CardHeader>
      <CardBody>
        {!isValid && (
          <>
            <CardTitle className="text-danger">Malformed graph detected</CardTitle>
            <CardText tag="div">
              <p>
                {`Server didn't generate any test case. Please, check if the following preconditions
                has been met:`}
              </p>
              <ul>
                {/* eslint-disable react/jsx-curly-brace-presence, quotes */}
                <li>Your graph is saved</li>
                <li>Graph has start node</li>
                {/* eslint-disable react/jsx-curly-brace-presence, quotes */}
                <li>{`Graph doesn't have any cycles`}</li>
                <li>All the nodes are connected</li>
              </ul>
            </CardText>
          </>
        )}
        {isValid && !isPathValid && (
          <>
            <CardTitle className="text-danger">Modified graph detected</CardTitle>
            <CardText>
              {`Your graph seems to modified since the last test case generation. Probably some element has been removed. Try to delete stale test case and submit new one`}
            </CardText>
          </>
        )}
        {isValid && isPathValid && (
          <Table size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Path</th>
              </tr>
            </thead>
            <tbody>{renderTableBody()}</tbody>
          </Table>
        )}
        <Button block color="danger" onClick={handleDeleteTestCaseClick}>
          Delete
        </Button>
      </CardBody>
    </Card>
  );

  function renderTableBody() {
    return paths.map((path, idx) => {
      const pathStr = path.map(getElementNameById).join(' -> ');
      return (
        <tr key={pathStr} onClick={handleRowSelect(path)} style={{ cursor: 'pointer' }}>
          <th scope="row">{idx}</th>
          <td>{pathStr}</td>
        </tr>
      );
    });
  }

  function handleRowSelect(path) {
    return () => highlightPath(path);
  }

  function handleDeleteTestCaseClick() {
    deleteTestCase(id, name);
  }
}

export default SelectedTestCaseCard;
