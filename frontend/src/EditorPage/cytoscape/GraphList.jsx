import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { modalActions, graphActions } from '../../actions';
import { modalTypes } from '../../const';
import { getActiveGraphId, getGraphList } from '../../reducers';
import ActiveGraphTab from './ActiveGraphTab';
import GraphTab from './GraphTab';

GraphList.propTypes = {
  activeGraphId: PropTypes.string,
  graphs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
  selectGraph: PropTypes.func.isRequired,
  deleteGraph: PropTypes.func.isRequired,
  openCreateGraphModal: PropTypes.func.isRequired,
  openUpdateGraphModal: PropTypes.func.isRequired
};

GraphList.defaultProps = {
  activeGraphId: null,
  graphs: []
};

function GraphList({
  activeGraphId,
  graphs,
  selectGraph,
  deleteGraph,
  openCreateGraphModal,
  openUpdateGraphModal
}) {
  return (
    <>
      <Button color="primary" block onClick={openCreateGraphModal}>
        Create
      </Button>
      {renderGraphList()}
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
        onEditClick: isActive ? openUpdateGraphModal : undefined,
        onDeleteClick: isActive ? deleteGraph : undefined
      };

      return <GraphTabItem {...graphTabProps} />;
    });
  }
}

function mapStateToProps(state) {
  return {
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
