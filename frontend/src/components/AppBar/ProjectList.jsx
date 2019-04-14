import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Button,
  Spinner
} from 'reactstrap';
import ProjectTab from './ProjectTab';
import { modalActions, projectActions } from '../../actions';
import { modalTypes } from '../../const';
import { getProjectList, isProjectLoading, getActiveProjectId } from '../../reducers';

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      active: PropTypes.bool,
      description: PropTypes.string
    })
  ).isRequired,
  openCreateProjectModal: PropTypes.func.isRequired,
  openUpdateProjectModal: PropTypes.func.isRequired,
  fetchProjectList: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  selectProject: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

ProjectList.defaultProps = {
  loading: false
};

// TODO: make overflow:scroll if there are a lot of projects created
function ProjectList({
  projects,
  fetchProjectList,
  openCreateProjectModal,
  openUpdateProjectModal,
  deleteProject,
  selectProject,
  loading
}) {
  useEffect(() => {
    fetchProjectList();
  }, [fetchProjectList]);
  return (
    <Nav navbar>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle caret>My Projects</DropdownToggle>
        <DropdownMenu>{renderProjectTabs()}</DropdownMenu>
      </UncontrolledDropdown>
      <NavItem className="ml-3">
        <Button color="success" onClick={openCreateProjectModal}>
          New Project
        </Button>
      </NavItem>
    </Nav>
  );

  function renderProjectTabs() {
    if (loading) {
      return (
        <div className="d-flex justify-content-center m-2">
          <Spinner color="primary" />
        </div>
      );
    }

    return (
      <div className="dropdown-menu-inner-container">
        {projects.map(project => (
          <ProjectTab
            active={project.active}
            key={project.id}
            id={project.id}
            name={project.name}
            description={project.description}
            onSelectClick={selectProject}
            onEditClick={openUpdateProjectModal}
            onDeleteClick={deleteProject}
          />
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    projects: getProjectList(state),
    activeProjectId: getActiveProjectId(state),
    loading: isProjectLoading(state)
  };
}

function mapDispatchToProps(dispatch) {
  // TODO: find better way how to deal with modals
  return {
    fetchProjectList: () => dispatch(projectActions.fetchProjectList()),
    selectProject: id => dispatch(projectActions.fetchProject(id)),
    openCreateProjectModal: () => dispatch(
      modalActions.showModal({
        modalType: modalTypes.PROJECT
      })
    ),
    openUpdateProjectModal: projectToUpdate => dispatch(
      modalActions.showModal({
        modalType: modalTypes.PROJECT,
        modalProps: {
          // Specify key, because ProjectModal is copying props to state
          // See https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
          key: projectToUpdate.id,
          project: projectToUpdate
        }
      })
    ),
    deleteProject: (id, name) => dispatch(modalActions.showModal(projectDeleteModal(id, name)))
  };

  function projectDeleteModal(id, name) {
    const modalType = modalTypes.ALERT;
    const modalProps = {
      title: 'Warning!',
      message: `Are you sure to delete project ${name}?`,
      onSubmitClick: () => dispatch(projectActions.deleteProject(id))
    };

    return {
      modalType,
      modalProps
    };
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectList);
