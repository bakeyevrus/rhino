import React from 'react';
import PropTypes from 'prop-types';
import { ATTRIBUTE_FORM_CUSTOM_OPTIONS } from '../constants';

class CreateAttributeComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      key: '',
      value: ''
    };

    this.handleFormOpen = this.handleFormOpen.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
  }

  handleFormOpen() {
    this.setState({ isOpen: true });
  }

  handleSaveClick() {
    const { key, value } = this.state;
    const { onSaveClick } = this.props;
    if (key.length === 0 || value === 0) return;
    onSaveClick(key, value);
    this.closeForm();
    this.resetState();
  }

  handleFormChange(event) {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  }

  handleCancelClick() {
    this.closeForm();
    this.resetState();
  }

  closeForm() {
    this.setState({ isOpen: false });
  }

  resetState() {
    this.setState({
      key: '',
      value: ''
    });
  }

  validate() {
    return this.state.key.length > 0 && this.state.value.length > 0;
  }

  render() {
    const { isOpen, key, value } = this.state;
    const { selectedOptions } = this.props;

    const filteredKeyFormOptions = ATTRIBUTE_FORM_CUSTOM_OPTIONS.filter(option => !selectedOptions.includes(option));

    if (!isOpen) {
      return (
        <div className="mx-auto">
          <button
            type="button"
            className="btn btn-outline-primary mx-auto"
            onClick={this.handleFormOpen}
          >
            New
          </button>
        </div>
      );
    }
    return (
      <React.Fragment>
        <div className="input-group mb-2">
          <div className="input-group-prepend">
            <span className="input-group-text">Key and value</span>
          </div>
          <select name="key" value={key} onChange={this.handleFormChange} className="custom-select">
            {/* Set value as empty string explicitly to force user select another option,
            otherwise validate() function won't be passed */}
            <option value="">Select key</option>
            {filteredKeyFormOptions.map(option => (
              <option key={`option-${option}`} value={option}>
                {option}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="form-control"
            name="value"
            placeholder="Attribute value"
            value={value}
            onChange={this.handleFormChange}
          />
        </div>
        <div className="ml-2 mb-2">
          <button
            type="button"
            className="btn btn-primary mr-2"
            onClick={this.handleSaveClick}
            disabled={!this.validate()}
          >
            Save
          </button>
          <button type="button" className="btn btn-danger" onClick={this.handleCancelClick}>
            Cancel
          </button>
        </div>
      </React.Fragment>
    );
  }
}

CreateAttributeComponent.propTypes = {
  selectedOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSaveClick: PropTypes.func.isRequired
};

export default CreateAttributeComponent;
