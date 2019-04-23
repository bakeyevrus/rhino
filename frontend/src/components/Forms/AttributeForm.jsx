import React from 'react';
import PropTypes from 'prop-types';
import {
  InputGroup, FormGroup, InputGroupText, InputGroupAddon, Input, Button
} from 'reactstrap';

AttributeForm.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  onDeleteClick: PropTypes.func
};

AttributeForm.defaultProps = {
  readOnly: false,
  onDeleteClick: null,
  onChange: null
};

function AttributeForm({
  name, value, label, onChange, readOnly, onDeleteClick
}) {
  const canBeDeleted = onDeleteClick != null;
  return (
    <FormGroup>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>{label}</InputGroupText>
        </InputGroupAddon>
        <Input
          readOnly={readOnly}
          type="text"
          id={`${name}-form`}
          name={name}
          value={value}
          onChange={readOnly ? undefined : handleChange}
        />
        {canBeDeleted && (
          <InputGroupAddon addonType="append">
            <InputGroupText>
              <Button close onClick={handleDelete} />
            </InputGroupText>
          </InputGroupAddon>
        )}
      </InputGroup>
    </FormGroup>
  );

  function handleChange(event) {
    event.preventDefault();
    const { value: formValue } = event.currentTarget;
    onChange(name, formValue);
  }

  function handleDelete(event) {
    event.preventDefault();
    onDeleteClick(name);
  }
}

export default AttributeForm;
