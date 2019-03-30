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
  FormText,
  Label,
  Input,
  Alert
} from 'reactstrap';
import { getProjectById, isProjectLoading, getErrorMessage } from '../../reducers';
import { projectActions as actions } from '../../actions';

function ProjectModal({
  project, createProject, updateProject, loading, errorMessage, onClose
}) {
  const { id, name: initName, description: initDesc = '' } = project;
  const isCreate = id === null;
  const [name, setName] = useFormInput(initName);
  const [description, setDescription] = useFormInput(initDesc);
  const formRef = useRef();

  return (
    <Modal isOpen>
      <Form onSubmit={handleSubmit} innerRef={formRef}>
        <ModalHeader>{isCreate ? 'Create Project' : 'Edit Project'}</ModalHeader>
        <ModalBody>
          <Alert color="danger" isOpen={errorMessage != null} fade={false}>
            {errorMessage}
          </Alert>
          <FormGroup>
            <Label for="project-name">Project name</Label>
            <Input
              required
              disabled={loading}
              id="project-name"
              type="text"
              name="name"
              value={name}
              onChange={setName}
            />
          </FormGroup>
          <FormGroup>
            <Label for="project-desc">Project description</Label>
            <Input
              disabled={loading}
              id="project-desc"
              type="textarea"
              name="description"
              value={description}
              onChange={setDescription}
              maxLength="100"
            />
            <FormText>Maximum 100 symbols</FormText>
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

    const newProject = {
      name,
      description: description || null
    };

    if (isCreate) {
      createProject(newProject);
    } else {
      newProject.id = id;
      updateProject(newProject);
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

ProjectModal.defaultProps = {
  project: {
    id: null,
    name: '',
    description: ''
  },
  createProject: () => {
    throw new Error('You are calling createProject() from update project modal');
  },
  updateProject: () => {
    throw new Error('You are calling updateProject() from create project modal');
  },
  loading: false,
  errorMessage: null
};

ProjectModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  project: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string
  }),
  createProject: PropTypes.func,
  updateProject: PropTypes.func,
  errorMessage: PropTypes.string,
  loading: PropTypes.bool
};

function mapStateToProps(state, ownProps) {
  const loading = isProjectLoading(state);
  const errorMessage = getErrorMessage(state);
  const newProps = { loading, errorMessage };
  if (ownProps.project != null) {
    newProps.project = getProjectById(state, ownProps.project.id);
  }

  return newProps;
}

function mapDispatchToProps(dispatch, ownProps) {
  const { project } = ownProps;
  if (project == null || project.id == null) {
    return {
      createProject: newProject => dispatch(actions.createProject(newProject))
    };
  }

  return {
    updateProject: updatedProject => dispatch(actions.updateProject(updatedProject))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectModal);
