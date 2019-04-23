import React from 'react';
import PropTypes from 'prop-types';
import SelectedElementCard from './SelectedElementCard';

RightPanel.propTypes = {
  selectedElement: PropTypes.shape({
    id: PropTypes.string
  }),
  setElementAttribute: PropTypes.func.isRequired,
  removeElementAttribute: PropTypes.func.isRequired,
  validateName: PropTypes.func.isRequired
};

RightPanel.defaultProps = {
  selectedElement: null
};

function RightPanel({
  selectedElement,
  setElementAttribute,
  removeElementAttribute,
  validateName
}) {
  return (
    <>
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
    </>
  );
}

export default RightPanel;
