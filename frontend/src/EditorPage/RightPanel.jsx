import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SelectedElementCard from './SelectedElementCard';
import SelectedTestCaseCard from './SelectedTestCaseCard';
import EditorStatusCard from './EditorStatusCard';
import { getSelectedTestCase } from '../reducers';
import { testCaseActions, modalActions } from '../actions';
import { modalTypes } from '../constants';

RightPanel.propTypes = {
  selectedElement: PropTypes.shape({
    id: PropTypes.string
  }),
  selectedTestCase: PropTypes.shape({
    id: PropTypes.string
  }),
  deleteTestCase: PropTypes.func.isRequired,
  closeCard: PropTypes.func.isRequired,
  highlightPath: PropTypes.func.isRequired,
  getElementNameById: PropTypes.func.isRequired,
  setElementAttribute: PropTypes.func.isRequired,
  removeElementAttribute: PropTypes.func.isRequired,
  validateName: PropTypes.func.isRequired
};

RightPanel.defaultProps = {
  selectedElement: null,
  selectedTestCase: null
};

function RightPanel({
  selectedElement,
  selectedTestCase,
  deleteTestCase,
  closeCard,
  highlightPath,
  getElementNameById,
  setElementAttribute,
  removeElementAttribute,
  validateName
}) {
  return (
    <>
      <EditorStatusCard />
      {selectedElement && (
        <SelectedElementCard
          /* Key is essential here, otherwise re-selecting element in editor will just update props,
           * which could lead to bugs. By specifying key we tell React to rebuild this component
           * for every new selected component
           */
          key={selectedElement.id}
          selectedElement={selectedElement}
          validateName={validateName}
          setElementAttribute={setElementAttribute}
          removeElementAttribute={removeElementAttribute}
        />
      )}
      {selectedTestCase && (
        <SelectedTestCaseCard
          closeCard={closeCard}
          selectedTestCase={selectedTestCase}
          getElementNameById={getElementNameById}
          highlightPath={highlightPath}
          deleteTestCase={deleteTestCase}
        />
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    selectedTestCase: getSelectedTestCase(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteTestCase: (id, name) => dispatch(modalActions.showModal(testCaseDeleteModal(id, name))),
    closeCard: () => dispatch(testCaseActions.selectTestCase(null))
  };

  function testCaseDeleteModal(id, name) {
    const modalType = modalTypes.ALERT;
    const modalProps = {
      title: 'Warning!',
      message: `Are you sure to delete test case ${name}?`,
      onSubmitClick: () => dispatch(testCaseActions.deleteTestCase(id))
    };

    return { modalType, modalProps };
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RightPanel);
