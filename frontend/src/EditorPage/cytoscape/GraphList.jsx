import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { modalActions, graphActions } from '../../actions';
import { modalTypes } from '../../const';
import { getActiveProject, getActiveGraphId, getGraphList } from '../../reducers';
import ActiveGraphTab from './ActiveGraphTab';
import GraphTab from './GraphTab';

GraphList.propTypes = {
  activeProjectName: PropTypes.string.isRequired,
  selectGraph: PropTypes.func.isRequired,
  deleteGraph: PropTypes.func.isRequired,
  openCreateGraphModal: PropTypes.func.isRequired,
  openUpdateGraphModal: PropTypes.func.isRequired,
  activeGraphId: PropTypes.string,
  graphs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  )
};

GraphList.defaultProps = {
  activeGraphId: null,
  graphs: []
};

function GraphList({
  activeProjectName,
  activeGraphId,
  graphs,
  selectGraph,
  deleteGraph,
  openCreateGraphModal,
  openUpdateGraphModal
}) {
  return (
    <ListGroup>
      <ListGroupItem>
        {`Project name: ${activeProjectName}`}
        <Button color="primary" block onClick={openCreateGraphModal} className="mt-2">
          Create graph
        </Button>
      </ListGroupItem>
      {renderGraphList()}
    </ListGroup>
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
        onEditClick: isActive ? openUpdateGraphModal : undefined,
        onDeleteClick: isActive ? deleteGraph : undefined
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
    activeGraphId: getActiveGraphId(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectGraph: id => dispatch(graphActions.switchGraph(id)),
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
)(GraphList);
