import React, { useState, useRef } from 'react';
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
  Label,
  Input,
  Alert
} from 'reactstrap';
import { getGraphById, getGraphErrorMessage, isGraphLoading } from '../../reducers';
import { graphActions as actions } from '../../actions';
import { graphTypes } from '../../const';

GraphModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  graph: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.oneOf(Object.values(graphTypes))
  }),
  createGraph: PropTypes.func,
  updateGraph: PropTypes.func,
  errorMessage: PropTypes.string,
  loading: PropTypes.bool
};

GraphModal.defaultProps = {
  graph: {
    id: null,
    name: '',
    elements: {},
    type: graphTypes.FLOW
  },
  createGraph: () => {
    throw new Error('You are calling createGraph() from update graph modal');
  },
  updateGraph: () => {
    throw new Error('You are calling updateGraph() from create graph modal');
  },
  loading: false,
  errorMessage: null
};

function GraphModal({
  graph, createGraph, updateGraph, loading, errorMessage, onClose
}) {
  const {
    id, name: initName, type: initType, ...restAttributes
  } = graph;
  const isCreate = id === null;
  const [name, setName] = useFormInput(initName);
  const [type, setType] = useFormInput(initType);
  const formRef = useRef();

  return (
    <Modal isOpen>
      <Form onSubmit={handleSubmit} innerRef={formRef}>
        <ModalHeader>{isCreate ? 'Create Graph' : 'Edit Graph'}</ModalHeader>
        <ModalBody>
          <Alert color="danger" isOpen={errorMessage != null} fade={false}>
            {errorMessage}
          </Alert>
          <FormGroup>
            <Label for="graph-name">Graph name</Label>
            <Input
              required
              disabled={loading}
              id="graph-name"
              type="text"
              name="name"
              value={name}
              onChange={setName}
            />
          </FormGroup>
          <FormGroup>
            <Label for="graph-type">Graph type</Label>
            <Input
              disabled={loading || !isCreate}
              id="graph-type"
              type="select"
              name="description"
              value={type}
              onChange={isCreate ? setType : undefined}
            >
              {Object.values(graphTypes).map(graphType => (
                <option key={`type-${graphType}`}>{graphType}</option>
              ))}
            </Input>
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

    const newGraph = {
      name,
      type,
      ...restAttributes
    };

    if (isCreate) {
      createGraph(newGraph);
    } else {
      newGraph.id = id;
      updateGraph(newGraph);
    }
  }
}

function useFormInput(initValue) {
  const [value, setValue] = useState(initValue);

  const handleFormChange = (event) => {
    setValue(event.currentTarget.value);
  };

  return [value, handleFormChange];
}

function mapStateToProps(state, ownProps) {
  const loading = isGraphLoading(state);
  const errorMessage = getGraphErrorMessage(state);
  const newProps = { loading, errorMessage };
  if (ownProps.graphId != null) {
    newProps.graph = getGraphById(state, ownProps.graphId);
  }

  return newProps;
}

function mapDispatchToProps(dispatch, ownProps) {
  const { graphId } = ownProps;
  if (graphId == null) {
    return {
      createGraph: newGraph => dispatch(actions.createGraph(newGraph))
    };
  }

  return {
    updateGraph: updatedGraph => dispatch(actions.updateGraph(updatedGraph))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphModal);
