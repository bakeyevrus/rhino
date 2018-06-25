import { connect } from 'react-redux';
import { createProject, switchProject } from '../actions/actions';
import ProjectTabs from '../components/ProjectTabs';

const mapStateToProps = state => ({
  projects: state.projects.map(project => ({
    id: project.id,
    name: project.name,
    active: project.id === state.activeProjectId
  }))
});

const mapDispatchToProps = dispatch => ({
  onCreateProjectClick: name => dispatch(createProject(name)),
  onSelectProject: id => dispatch(switchProject(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectTabs);
