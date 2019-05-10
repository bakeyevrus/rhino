import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  Alert
} from 'reactstrap';
import { isTestCaseLoading, getTestCaseErrorMessage } from '../../reducers';
import { testCaseActions } from '../../actions';
import { useFormInput } from '../../hooks';
import { testCaseAlgorithms } from '../../constants';

TestCaseModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  generateTestCase: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errorMessage: PropTypes.string
};

TestCaseModal.defaultProps = {
  loading: false,
  errorMessage: null
};

function TestCaseModal({
  loading, errorMessage, generateTestCase, onClose
}) {
  const [name, setName] = useFormInput('');
  const [tdlDepth, setTdlDepth] = useFormInput(1);
  const [algorithm, setAlgorithm] = useFormInput(testCaseAlgorithms.PCT);
  const formRef = useRef();

  return (
    <Modal isOpen>
      <Form onSubmit={handleSubmit} innerRef={formRef}>
        <ModalHeader>Generate Test Case</ModalHeader>
        <ModalBody>
          <Alert color="danger" isOpen={errorMessage != null} fade={false}>
            {errorMessage}
          </Alert>
          <FormGroup>
            <Label for="graph-name">Name</Label>
            <Input
              required
              disabled={loading}
              id="test-case-name"
              type="text"
              name="name"
              value={name}
              onChange={setName}
            />
          </FormGroup>
          <FormGroup>
            <Label for="graph-type">Algorithm Type</Label>
            <Input
              disabled={loading}
              id="test-case-algorithm"
              type="select"
              name="algorithm"
              value={algorithm}
              onChange={setAlgorithm}
            >
              {Object.values(testCaseAlgorithms).map(testCaseAlgorithm => (
                <option key={testCaseAlgorithm}>{testCaseAlgorithm}</option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="graph-name">Test Depth Level (TDL)</Label>
            <Input
              required
              disabled={loading}
              id="test-case-tdl-depth"
              type="number"
              name="tdlDepth"
              value={tdlDepth}
              onChange={setTdlDepth}
              min="1"
              max="4"
            />
            <FormText>Number from 1 to 4</FormText>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button disabled={loading} color="danger" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={loading} type="submit" color="primary">
            Submit
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );

  function handleSubmit(event) {
    event.preventDefault();
    if (!formRef.current.reportValidity()) {
      return;
    }

    generateTestCase({
      name,
      algorithm,
      tdl: tdlDepth
    });
  }
}

function mapStateToProps(state) {
  return {
    loading: isTestCaseLoading(state),
    errorMessage: getTestCaseErrorMessage(state)
  };
}

const { generateTestCase } = testCaseActions;
const mapDispatchToProps = {
  generateTestCase
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestCaseModal);
