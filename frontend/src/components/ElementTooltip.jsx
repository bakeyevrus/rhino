import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash.map';
import upperFirst from 'lodash.upperfirst';
import { Container, Row } from 'reactstrap';
import {
  PRIORITY,
  ATTRIBUTE_FORM_OPTIONS as REQUIRED_ATTRIBUTES,
  ATTRIBUTE_FORM_CUSTOM_OPTIONS as CUSTOM_ATTRIBUTES
} from '../constants';
import AttributeForm from './AttributeForm';
import NameAttributeForm from './NameAttributeForm';
import CreateAttributeComponent from './CreateAttributeComponent';
import './elementTooltip.css';

function ElementTooltip({
  elementAttributes,
  onAttributeChange,
  validateName,
  onCreateAttributeClick,
  onDeleteAttributeClick
}) {
  const handleFormChange = key => (event) => {
    const newValue = event.target.value;
    onAttributeChange(key, newValue);
  };
  const {
    id, name, priority, from, to
  } = elementAttributes;

  const elementCustomAttributes = Object.keys(CUSTOM_ATTRIBUTES)
    .filter((attrKey) => {
      const attrName = CUSTOM_ATTRIBUTES[attrKey];
      return elementAttributes[attrName] != null;
    })
    .map(attrKey => CUSTOM_ATTRIBUTES[attrKey]);

  return (
    <Container fluid>
      <Row>
        <div className="attributes-container">
          <NameAttributeForm
            key={id}
            value={name}
            validate={validateName}
            onChange={handleFormChange(REQUIRED_ATTRIBUTES.NAME)}
          />
          {/* Priority attribute form */}
          <div className="input-group mb-3">
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
      </Row>
    </Container>
  );
}

ElementTooltip.propTypes = {
  elementAttributes: PropTypes.object.isRequired,
  validateName: PropTypes.func.isRequired,
  onAttributeChange: PropTypes.func.isRequired,
  onDeleteAttributeClick: PropTypes.func.isRequired,
  onCreateAttributeClick: PropTypes.func.isRequired
};

export default ElementTooltip;
