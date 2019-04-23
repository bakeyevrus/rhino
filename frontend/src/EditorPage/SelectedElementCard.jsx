import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody } from 'reactstrap';
import upperFirst from 'lodash.upperfirst';
import {
  AttributeForm as Form,
  AttributeFormWithValidation as FormWithValidation,
  SelectAttributeForm as Select
} from '../components/Forms';
import {
  PRIORITY,
  ELEMENT_ATTRIBUTES as REQUIRED_ATTRIBUTES,
  CUSTOM_ELEMENT_ATTRIBUTES as CUSTOM_ATTRIBUTES
} from './cytoscape/constants';
import CreateAttribute from './CreateAttributeForm';

const priorityOptions = Object.values(PRIORITY);

SelectedElementCard.propTypes = {
  selectedElement: PropTypes.shape({
    name: PropTypes.string.isRequired,
    priority: PropTypes.oneOf(priorityOptions).isRequired,
    from: PropTypes.string,
    to: PropTypes.string
  }).isRequired,
  setElementAttribute: PropTypes.func.isRequired,
  removeElementAttribute: PropTypes.func.isRequired,
  validateName: PropTypes.func.isRequired
};

function SelectedElementCard({
  selectedElement,
  validateName,
  setElementAttribute,
  removeElementAttribute
}) {
  const {
    name, priority, from, to
  } = selectedElement;

  // Picking custom (i.e non-required) attributes from selectedElement
  const [customElemAttrs, missedElemAttrs] = pickExistingAttributes(
    CUSTOM_ATTRIBUTES,
    selectedElement
  );
  return (
    <Card>
      <CardHeader>Selected element</CardHeader>
      <CardBody>
        <FormWithValidation
          required
          name={REQUIRED_ATTRIBUTES.NAME}
          label="Name"
          value={name}
          validate={validateName}
          onChange={setElementAttribute}
        />
        {from && <Form readOnly name={REQUIRED_ATTRIBUTES.FROM} value={from} label="From" />}
        {to && <Form readOnly name={REQUIRED_ATTRIBUTES.TO} value={to} label="To" />}
        <Select
          name={REQUIRED_ATTRIBUTES.PRIORITY}
          value={priority}
          label="Priority"
          options={priorityOptions}
          onChange={setElementAttribute}
        />
        {customElemAttrs.map(attr => (
          <Form
            key={attr}
            id={`${attr}-form`}
            name={attr}
            value={selectedElement[attr]}
            label={upperFirst(attr)}
            onChange={setElementAttribute}
            onDeleteClick={removeElementAttribute}
          />
        ))}
        <CreateAttribute attributesToCreate={missedElemAttrs} onCreate={setElementAttribute} />
      </CardBody>
    </Card>
  );
}

function pickExistingAttributes(attributes, fromObj) {
  const presentAttrs = [];
  const missedAttrs = [];
  Object.values(attributes).forEach((attr) => {
    if (fromObj[attr] == null) {
      missedAttrs.push(attr);
    } else {
      presentAttrs.push(attr);
    }
  });

  return [presentAttrs, missedAttrs];
}

export default SelectedElementCard;
