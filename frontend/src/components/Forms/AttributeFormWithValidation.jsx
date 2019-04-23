import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import {
  InputGroup,
  FormGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
  FormFeedback
} from 'reactstrap';

AttributeFormWithValidation.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  validate: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool
};

AttributeFormWithValidation.defaultProps = {
  required: false
};

const INPUT_TIMEOUT = 500; // in milliseconds
function AttributeFormWithValidation({
  required,
  name,
  label,
  value: initValue,
  validate,
  onChange
}) {
  const [value, setValue] = useState(initValue);
  const [errorMessage, setErrorMessage] = useState(null);
  // Update value on props change
  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  const isError = errorMessage != null;
  // onChange dependency is important, because when you re-select element, onChange prop differs
  const debounceValidation = useCallback(debounce(validateAndSet, INPUT_TIMEOUT), [onChange]);
  return (
    <FormGroup>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>{label}</InputGroupText>
        </InputGroupAddon>
        <Input
          type="text"
          id={`${name}-form`}
          name={name}
          value={value}
          invalid={isError}
          onChange={handleChange}
        />
        {isError && <FormFeedback>{errorMessage}</FormFeedback>}
      </InputGroup>
    </FormGroup>
  );

  function handleChange(event) {
    event.preventDefault();
    const { value: formValue } = event.currentTarget;
    setValue(formValue);

    debounceValidation(formValue);
  }

  function validateAndSet(formValue) {
    if (required && formValue.length === 0) {
      setErrorMessage(`${label} shouldn't be empty`);
      return;
    }

    const validationMessage = validate(formValue);
    if (validationMessage != null) {
      setErrorMessage(validationMessage);
      return;
    }

    setErrorMessage(null);
    onChange(name, formValue);
  }
}
export default AttributeFormWithValidation;
