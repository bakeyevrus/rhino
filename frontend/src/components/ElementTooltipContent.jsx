import React from 'react';
import PropTypes from 'prop-types';
import './elementTooltipContent.css';

ElementTooltipContent.propTypes = {
  elementAttributes: PropTypes.object.isRequired,
  onDeleteAttributeClick: PropTypes.func.isRequired,
  onCreateAttributeClick: PropTypes.func.isRequired,
};

function ElementTooltipContent({
  elementAttributes,
  onCreateAttributeClick,
  onDeleteAttributeClick,
}) {
  return (
    <React.Fragment>
      <div className="attributes-container">
        {Object.entries(elementAttributes).map(([key, value]) => (
          <React.Fragment>
            <p>
              {key}: {value}
            </p>
            <button type="button" onClick={null}>
              Remove
            </button>
          </React.Fragment>
        ))}
      </div>
    </React.Fragment>
  );
}

export default ElementTooltipContent;
