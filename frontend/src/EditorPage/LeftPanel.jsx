import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Card, CardHeader, CardBody, CardTitle, Button
} from 'reactstrap';
import { modalActions, graphActions } from '../actions';
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
  deleteGraph: PropTypes.func.isRequired,
  saveGraph: PropTypes.func.isRequired,
  openCreateGraphModal: PropTypes.func.isRequired,
  openUpdateGraphModal: PropTypes.func.isRequired,
  activeGraphId: PropTypes.string,
  isGraphSaving: PropTypes.bool,
  graphs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  )
};

LeftPanel.defaultProps = {
  activeGraphId: null,
  isGraphSaving: false,
  graphs: []
};

function LeftPanel({
  activeProjectName,
  activeGraphId,
  graphs,
  isGraphSaving,
  selectGraph,
  saveGraph,
  deleteGraph,
  openCreateGraphModal,
  openUpdateGraphModal
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
      const GraphTabItem = isActive ? ActiveGraphTab : GraphTab;
      const graphTabProps = {
        key: graph.id,
        id: graph.id,
        name: graph.name,
        onSelectClick: isActive ? undefined : selectGraph,
        onSaveClick: isActive ? saveGraph : undefined,
        onEditClick: isActive ? openUpdateGraphModal : undefined,
        onDeleteClick: isActive ? deleteGraph : undefined,
        isGraphSaving
      };

      return <GraphTabItem {...graphTabProps} />;
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
    openCreateGraphModal: () => dispatch(
      modalActions.showModal({
        modalType: modalTypes.GRAPH
      })
    ),
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
    deleteGraph: (id, name) => dispatch(modalActions.showModal(graphDeleteModal(id, name)))
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
)(LeftPanel);
