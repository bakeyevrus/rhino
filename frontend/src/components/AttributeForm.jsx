import React from 'react';
import PropTypes from 'prop-types';

function AttributeForm({
  name, value, label, onChange, readOnly, onDeleteClick
}) {
  const canBeDeleted = onDeleteClick != null;
  return (
    <div className="input-group mb-2">
      <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1">
          {label}
        </span>
      </div>
      <input
        readOnly={readOnly}
        type="text"
        className="form-control"
        name={name}
        value={value}
        onChange={onChange}
      />
      {canBeDeleted && (
        <div className="input-group-append ml-1">
          <button type="button" className="close" aria-label="Close" onClick={onDeleteClick}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
    </div>
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
