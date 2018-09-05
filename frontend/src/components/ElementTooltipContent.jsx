import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash.map';
import { PRIORITY } from '../constants';
import CreateAttributeComponent from './CreateAttributeComponent';
import './elementTooltipContent.css';

function ElementTooltipContent({
  elementAttributes,
  onAttributeChange,
  onCreateAttributeClick,
  onDeleteAttributeClick
}) {
  const handleFormChange = key => (event) => {
    const newValue = event.target.value;
    onAttributeChange(key, newValue);
  };
  const {
    id, priority, source, target, ...customAttributes
  } = elementAttributes;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="attributes-container">
          {/* ID attribute form */}
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                ID
              </span>
            </div>
            <input readOnly type="text" className="form-control" name="id-form" value={id} />
          </div>
          {/* Source attribute form */}
          {source && (
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Source
                </span>
              </div>
              <input
                readOnly
                type="text"
                className="form-control"
                name="source-form"
                value={source}
              />
            </div>
          )}
          {/* Target attribute form */}
          {target && (
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Target
                </span>
              </div>
              <input
                readOnly
                type="text"
                className="form-control"
                name="target-form"
                value={target}
              />
            </div>
          )}
          {/* Priority attribute form */}
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Priority
              </span>
            </div>
            <select
              name="priority-form"
              value={priority}
              className="custom-select"
              onChange={handleFormChange('priority')}
            >
              {map(PRIORITY, option => (
                <option key={`option-${option}`} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {Object.entries(customAttributes)
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
                  name={`${key}-form`}
                  value={value}
                  onChange={handleFormChange(key)}
                />
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
              </div>
            ))}
          <CreateAttributeComponent
            selectedOptions={Object.keys(customAttributes).filter(attribute => customAttributes[attribute] != null)}
            onSaveClick={onCreateAttributeClick}
          />
        </div>
      </div>
    </div>
  );
}

ElementTooltipContent.propTypes = {
  elementAttributes: PropTypes.objectOf(PropTypes.string).isRequired,
  onAttributeChange: PropTypes.func.isRequired,
  onDeleteAttributeClick: PropTypes.func.isRequired,
  onCreateAttributeClick: PropTypes.func.isRequired
};

export default ElementTooltipContent;
