import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Collapse, Card, CardBody, CardTitle, Button, ListGroup, ListGroupItem
} from 'reactstrap';
import { isGraphSavingInBackground, getTestCaseList, getActiveGraph } from '../reducers';
import { graphActions, modalActions, testCaseActions } from '../actions';
import { modalTypes } from '../constants';

ActiveGraphTab.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  saveGraph: PropTypes.func.isRequired,
  deleteGraph: PropTypes.func.isRequired,
  openUpdateGraphModal: PropTypes.func.isRequired,
  openCreateTestCaseModal: PropTypes.func.isRequired,
  selectTestCase: PropTypes.func.isRequired,
  isGraphSaving: PropTypes.bool,
  testCases: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    })
  )
};

ActiveGraphTab.defaultProps = {
  isGraphSaving: false,
  testCases: []
};

function ActiveGraphTab({
  id,
  name,
  testCases,
  openUpdateGraphModal,
  deleteGraph,
  saveGraph,
  openCreateTestCaseModal,
  selectTestCase,
  isGraphSaving
}) {
  const [listOpen, setListOpen] = useState(false);
  const shouldDisplayTestCases = testCases.length > 0;
  return (
    <Card>
      <CardBody>
        <CardTitle
          className="d-flex justify-content-between align-items-center active-graph-title"
          tag="h5"
        >
          <b>{name}</b>
          <div>
            <Button close onClick={handleDeleteClick} size="sm" className="ml-2">
              <span className="oi oi-delete graph-panel-icon" aria-hidden="true" />
            </Button>
            <Button close onClick={handleEditClick} size="sm">
              <span className="oi oi-pencil graph-panel-icon" aria-hidden="true" />
            </Button>
          </div>
        </CardTitle>
        <Button block size="sm" color="primary" disabled={isGraphSaving} onClick={handleSaveClick}>
          Save graph
        </Button>
        <Button
          block
          size="sm"
          color="primary"
          disabled={isGraphSaving}
          onClick={handleGenerateTestCaseClick}
        >
          Generate Test Case
        </Button>
        {shouldDisplayTestCases && (
          <Button
            block
            size="sm"
            color="primary"
            onClick={shouldDisplayTestCases ? toggle : undefined}
          >
            Show TDL
          </Button>
        )}
        {renderTestCases()}
      </CardBody>
    </Card>
  );

  function toggle() {
    setListOpen(!listOpen);
  }

  function renderTestCases() {
    return (
      <Collapse isOpen={listOpen}>
        <ListGroup className="mt-2">
          {testCases.map(testCase => (
            <ListGroupItem
              key={testCase.id}
              onClick={handleSelectTestCase(testCase.id)}
              className="graph-title"
            >
              {testCase.name}
            </ListGroupItem>
          ))}
        </ListGroup>
      </Collapse>
    );
  }

  function handleEditClick(event) {
    event.preventDefault();
    openUpdateGraphModal(id);
  }

  function handleDeleteClick(event) {
    event.preventDefault();
    deleteGraph(id, name);
  }

  function handleSaveClick(event) {
    event.preventDefault();
    saveGraph();
  }

  function handleGenerateTestCaseClick(event) {
    event.preventDefault();
    openCreateTestCaseModal();
  }

  function handleSelectTestCase(testCaseId) {
    return (event) => {
      event.preventDefault();
      selectTestCase(testCaseId);
    };
  }
}

function mapStateToProps(state) {
  const { id, name } = getActiveGraph(state);
  return {
    id,
    name,
    testCases: getTestCaseList(state),
    isGraphSaving: isGraphSavingInBackground(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openUpdateGraphModal: graphId => dispatch(
      modalActions.showModal({
        modalType: modalTypes.GRAPH,
        modalProps: {
          // Specify key, because GraphModal is copying props to state
          key: graphId,
          graphId
        }
      })
    ),
    deleteGraph: (id, name) => dispatch(modalActions.showModal(graphDeleteModal(id, name))),
    openCreateTestCaseModal: () => dispatch(
      modalActions.showModal({
        modalType: modalTypes.TEST_CASE
      })
    ),
    selectTestCase: id => dispatch(testCaseActions.selectTestCase(id))
  };

  function graphDeleteModal(id, name) {
    const modalType = modalTypes.ALERT;
    const modalProps = {
      title: 'Warning!',
      message: `Are you sure to delete graph ${name}?`,
      onSubmitClick: () => dispatch(graphActions.deleteGraph(id))
    };

    return { modalType, modalProps };
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveGraphTab);
