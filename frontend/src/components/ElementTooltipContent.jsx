import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash.map';
import upperFirst from 'lodash.upperfirst';
import {
  PRIORITY,
  ATTRIBUTE_FORM_OPTIONS as REQUIRED_ATTRIBUTES,
  ATTRIBUTE_FORM_CUSTOM_OPTIONS as CUSTOM_ATTRIBUTES
} from '../constants';
import AttributeForm from './AttributeForm';
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
    name, priority, from, to
  } = elementAttributes;

  const elementCustomAttributes = Object.keys(CUSTOM_ATTRIBUTES)
    .filter((attrKey) => {
      const attrName = CUSTOM_ATTRIBUTES[attrKey];
      return elementAttributes[attrName] != null;
    })
    .map(attrKey => CUSTOM_ATTRIBUTES[attrKey]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="attributes-container">
          {/* Name attribute form */}
          <AttributeForm
            name="name-form"
            value={name}
            label="Name"
            onChange={handleFormChange(REQUIRED_ATTRIBUTES.NAME)}
          />
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
              onChange={handleFormChange(REQUIRED_ATTRIBUTES.PRIORITY)}
            >
              {map(PRIORITY, option => (
                <option key={`option-${option}`} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          {/* From attribute form */}
          {from && (
            <AttributeForm
              readOnly
              name="from-form"
              value={from}
              label="From"
              onChange={handleFormChange(REQUIRED_ATTRIBUTES.FROM)}
            />
          )}
          {/* From attribute form */}
          {to && (
            <AttributeForm
              readOnly
              name="to-form"
              value={to}
              label="To"
              onChange={handleFormChange(REQUIRED_ATTRIBUTES.TO)}
            />
          )}
          {/* Custom attributes */}
          {elementCustomAttributes.map(attrName => (
            <AttributeForm
              key={attrName}
              name={`${attrName}-form`}
              value={elementAttributes[attrName]}
              label={upperFirst(attrName)}
              onChange={handleFormChange(attrName)}
              onDeleteClick={onDeleteAttributeClick(attrName)}
            />
          ))}
          <CreateAttributeComponent
            selectedOptions={elementCustomAttributes}
            onSaveClick={onCreateAttributeClick}
          />
        </div>
      </div>
    </div>
  );
}

ElementTooltipContent.propTypes = {
  elementAttributes: PropTypes.object.isRequired,
  onAttributeChange: PropTypes.func.isRequired,
  onDeleteAttributeClick: PropTypes.func.isRequired,
  onCreateAttributeClick: PropTypes.func.isRequired
};

export default ElementTooltipContent;
