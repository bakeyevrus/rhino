import React from 'react';
import PropTypes from 'prop-types';

// TODO: create a common container component for CreateAttributeComponent and CreateProject
// Use renderProps pattern
class CreateProject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      inputValue: ''
    };

    this.handleFormOpen = this.handleFormOpen.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
  }

  handleFormOpen() {
    this.setState({
      isOpen: true
    });
  }

  handleSaveClick(event) {
    event.preventDefault();
    const { inputValue } = this.state;
    const { onCreateProjectClick } = this.props;
    onCreateProjectClick(inputValue);
    this.closeForm();
  }

  handleFormChange(event) {
    const { value } = event.currentTarget;
    this.setState({ inputValue: value });
  }

  handleCancelClick(event) {
    event.preventDefault();
    this.closeForm();
  }

  closeForm() {
    this.setState({
      isOpen: false,
      inputValue: ''
    });
  }

  render() {
    const { isOpen, inputValue } = this.state;

    if (isOpen) {
      return (
        <form className="form-inline my-2 my-lg-0">
          <input
            value={inputValue}
            className="form-control mr-sm-2"
            type="text"
            placeholder="Enter project name"
            aria-label="Enter project name"
            onChange={this.handleFormChange}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            disabled={!inputValue}
            onClick={this.handleSaveClick}
          >
            Create
          </button>
          <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.handleCancelClick}>
            Cancel
          </button>
        </form>
      );
    }

    return (
      <li className="nav-item">
        <button type="button" className="btn btn-dark" onClick={this.handleFormOpen}>
          +
        </button>
      </li>
    );
  }
}

CreateProject.propTypes = {
  onCreateProjectClick: PropTypes.func.isRequired
};

export default CreateProject;
