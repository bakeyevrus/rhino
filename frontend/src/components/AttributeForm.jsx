import React from 'react';
import PropTypes from 'prop-types';
import {
  InputGroup, FormGroup, InputGroupText, InputGroupAddon, Input, Button
} from 'reactstrap';

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
          onChange={onChange}
        />
        {canBeDeleted && (
          <InputGroupAddon addonType="append">
            <InputGroupText>
              <Button close onClick={onDeleteClick} />
            </InputGroupText>
          </InputGroupAddon>
        )}
      </InputGroup>
    </FormGroup>
  );
}

AttributeForm.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  onDeleteClick: PropTypes.func
};

AttributeForm.defaultProps = {
  readOnly: false,
  onDeleteClick: null
};

export default AttributeForm;
