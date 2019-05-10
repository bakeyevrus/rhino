import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Card, CardHeader, CardBody, CardTitle, Button
} from 'reactstrap';
import { modalActions } from '../actions';
import { modalTypes } from '../constants';
import {
  getActiveProject,
  getActiveGraphId,
  getGraphList,
  isGraphSavingInBackground
} from '../reducers';
import ActiveGraphTab from './ActiveGraphTab';
import GraphTab from './GraphTab';
import './leftPanel.css';

LeftPanel.propTypes = {
  activeProjectName: PropTypes.string.isRequired,
  selectGraph: PropTypes.func.isRequired,
  saveGraph: PropTypes.func.isRequired,
  openCreateGraphModal: PropTypes.func.isRequired,
  activeGraphId: PropTypes.string,
  graphs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  )
};

LeftPanel.defaultProps = {
  activeGraphId: null,
  graphs: []
};

function LeftPanel({
  activeProjectName,
  activeGraphId,
  graphs,
  selectGraph,
  saveGraph,
  openCreateGraphModal
}) {
  return (
    <>
      <Card>
        <CardHeader>Your Active Project</CardHeader>
        <CardBody>
          <CardTitle>{activeProjectName}</CardTitle>
        </CardBody>
      </Card>
      <Card className="mt-2">
        <CardHeader>
          Your Graphs
          <Button close onClick={openCreateGraphModal} size="sm">
            <span className="oi oi-plus graph-panel-icon" aria-hidden="true" />
          </Button>
        </CardHeader>
        {renderGraphList()}
      </Card>
    </>
  );

  function renderGraphList() {
    if (graphs.length === 0) {
      return null;
    }

    return graphs.map((graph) => {
      const isActive = graph.id === activeGraphId;
      if (isActive) {
        return <ActiveGraphTab key={graph.id} saveGraph={saveGraph} />;
      }

      return (
        <GraphTab key={graph.id} id={graph.id} name={graph.name} onSelectClick={selectGraph} />
      );
    });
  }
}

function mapStateToProps(state) {
  const { name: activeProjectName } = getActiveProject(state);
  return {
    activeProjectName,
    graphs: getGraphList(state),
    activeGraphId: getActiveGraphId(state),
    isGraphSaving: isGraphSavingInBackground(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openCreateGraphModal: () => dispatch(modalActions.showModal({ modalType: modalTypes.GRAPH }))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftPanel);
