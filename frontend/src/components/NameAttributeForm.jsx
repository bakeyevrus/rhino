import React from 'react';
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
import USER_INPUT_PROCESSING_DEBOUNCE from '../config';

class NameAttributeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      error: null
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.validateInputWithDebounce = debounce(
      this.validateInput,
      USER_INPUT_PROCESSING_DEBOUNCE
    ).bind(this);
  }

  validateInput(event) {
    const { onChange, validate } = this.props;
    const { value } = event.target;

    if (!value) {
      this.setState({ error: 'Please, provide some name' });
      return;
    }
    if (!validate(value)) {
      this.setState({ error: 'The name exists already' });
      return;
    }

    this.setState({ error: null });
    onChange(event);
  }

  handleFormChange(event) {
    event.persist();
    const { value } = event.target;

    this.setState({
      value
    });

    this.validateInputWithDebounce(event);
  }

  render() {
    const { value, error } = this.state;

    return (
      <FormGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Name</InputGroupText>
          </InputGroupAddon>
          <Input
            type="text"
            id="name-form"
            value={value}
            invalid={!!error}
            onChange={this.handleFormChange}
          />
          {!!error && <FormFeedback>{error}</FormFeedback>}
        </InputGroup>
      </FormGroup>
    );
  }
}

NameAttributeForm.propTypes = {
  value: PropTypes.string.isRequired,
  validate: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default NameAttributeForm;
