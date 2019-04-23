import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import upperFirst from 'lodash.upperfirst';
import {
  Form, FormGroup, InputGroup, Input, ButtonGroup, Button
} from 'reactstrap';

CreateAttributeForm.propTypes = {
  attributesToCreate: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCreate: PropTypes.func.isRequired
};

function CreateAttributeForm({ attributesToCreate, onCreate }) {
  const [isOpen, setOpen] = useState(false);
  const [attrName, setAttrName] = useFormInput('');
  const [attrValue, setAttrValue] = useFormInput('');
  const formRef = useRef();
  const canAddAttributes = attributesToCreate.length > 0;
  if (!isOpen) {
    return (
      <Button disabled={!canAddAttributes} color="primary" onClick={toggleOpen}>
        Add attribute
      </Button>
    );
  }

  return (
    <Form onSubmit={handleSubmit} innerRef={formRef}>
      <FormGroup>
        <InputGroup>
          <Input
            required
            type="select"
            name="key"
            id="key-form"
            value={attrName}
            onChange={setAttrName}
          >
            {/* Set value as empty string explicitly to force user select another option,
            otherwise validate() function won't be passed */}
            <option value="">Select attribute</option>
            {attributesToCreate.map(attr => (
              <option key={attr} value={attr}>
                {upperFirst(attr)}
              </option>
            ))}
          </Input>
          <Input
            required
            type="text"
            name="value"
            id="value-form"
            value={attrValue}
            onChange={setAttrValue}
          />
        </InputGroup>
      </FormGroup>
      <ButtonGroup style={{ width: '100%' }}>
        {canAddAttributes && (
          <Button type="submit" color="primary">
            Save
          </Button>
        )}
        <Button color="danger" onClick={cancel}>
          Cancel
        </Button>
      </ButtonGroup>
    </Form>
  );

  function toggleOpen() {
    setOpen(!isOpen);
  }

  function cancel() {
    setOpen(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formRef.current.reportValidity()) {
      return;
    }

    onCreate(attrName, attrValue);
  }
}

function useFormInput(initValue) {
  const [value, setValue] = useState(initValue);

  const handleFormChange = (event) => {
    setValue(event.currentTarget.value);
  };

  return [value, handleFormChange];
}

export default CreateAttributeForm;
