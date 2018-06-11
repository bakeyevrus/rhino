import React from 'react';
import PropTypes from 'prop-types';
import CreateAttributeComponent from './CreateAttributeComponent';
import './elementTooltipContent.css';

function ElementTooltipContent({
  elementAttributes,
  onAttributeChange,
  onCreateAttributeClick,
  onDeleteAttributeClick,
}) {
  const handleFormChange = key => (event) => {
    const newValue = event.target.value;
    onAttributeChange(key, newValue);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="attributes-container">
          {Object.entries(elementAttributes)
            // Get the second attribute from array and check if not null
            .filter(([, value]) => value != null)
            .map(([key, value]) => (
              <div key={`input-group-${key}`} className="input-group mb-2">
                {/* It is not convenient to change attribute keys.
              Need to call cy.removeData() and then cy.data(newName, oldValue) */}
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    {key}
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="value-form"
                  value={value}
                  readOnly={key === 'id'}
                  onChange={handleFormChange(key)}
                />
                {key !== 'id' && (
                  <div className="input-group-append ml-1">
                    <button
                      type="button"
                      className="close"
                      aria-label="Close"
                      onClick={onDeleteAttributeClick(key)}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          <CreateAttributeComponent onSaveClick={onCreateAttributeClick} />
        </div>
      </div>
    </div>
  );
}

ElementTooltipContent.propTypes = {
  elementAttributes: PropTypes.objectOf(PropTypes.string).isRequired,
  onAttributeChange: PropTypes.func.isRequired,
  onDeleteAttributeClick: PropTypes.func.isRequired,
  onCreateAttributeClick: PropTypes.func.isRequired,
};

export default ElementTooltipContent;
