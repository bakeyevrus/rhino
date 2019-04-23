import React from 'react';
import PropTypes from 'prop-types';
import {
  InputGroup, FormGroup, InputGroupText, InputGroupAddon, Input
} from 'reactstrap';

SelectAttributeForm.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  onChange: PropTypes.func.isRequired
};

SelectAttributeForm.defaultProps = {
  options: []
};

function SelectAttributeForm({
  name, value, label, options, onChange
}) {
  return (
    <FormGroup>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>{label}</InputGroupText>
        </InputGroupAddon>
        <Input
          type="select"
          name={name}
          id={`${name}-select`}
          value={value}
          onChange={handleChange}
        >
          {options.map(option => (
            <option key={`opt-${option}`} value={option}>
              {option}
            </option>
          ))}
        </Input>
      </InputGroup>
    </FormGroup>
  );

  function handleChange(event) {
    event.preventDefault();
    const { value: formValue } = event.currentTarget;
    onChange(name, formValue);
  }
}

export default SelectAttributeForm;
