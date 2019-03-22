import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Button
} from 'reactstrap';
import ProjectTab from './ProjectTab';

// TODO: make overflow:scroll if there are a lot of projects created

function ProjectList({
  projects,
  activeProjectId,
  createProject,
  deleteProject,
  selectProject,
  editProject
}) {
  return (
    <Nav navbar>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle caret>My Projects</DropdownToggle>
        <DropdownMenu>{renderProjectTabs()}</DropdownMenu>
      </UncontrolledDropdown>
      <NavItem className="ml-3">
        <Button color="success" onClick={createProject}>
          New Project
        </Button>
      </NavItem>
    </Nav>
  );

  function renderProjectTabs() {
    const { [activeProjectId]: activeProject, ...restProjects } = projects;
    return (
      <>
        {activeProject && renderProjectTab(activeProject, true)}
        {Object.values(restProjects).map(project => renderProjectTab(project, false))}
      </>
    );
  }

  function renderProjectTab(project, active) {
    return (
      <ProjectTab
        active={active}
        key={project.id}
        name={project.name}
        description={project.description}
        onSelectClick={selectProject}
        onEditClick={editProject}
        onDeleteClick={deleteProject(project.id)}
      />
    );
  }
}

ProjectList.defaultProps = {
  activeProjectId: null
};

ProjectList.propTypes = {
  projects: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  createProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  selectProject: PropTypes.func.isRequired,
  editProject: PropTypes.func.isRequired,
  activeProjectId: PropTypes.string
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    createProject: () => {},
    editProject: () => {},
    selectProject: () => {},
    deleteProject: projectId => () => {}
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectList);
