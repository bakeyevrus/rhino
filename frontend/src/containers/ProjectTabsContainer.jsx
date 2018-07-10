import { connect } from 'react-redux';
import { createProject } from '../actions/actions';
import ProjectTabs from '../components/ProjectTabs';

const mapStateToProps = state => ({
  projects: state.projects.map(project => ({
    id: project.id,
    name: project.name,
    active: project.id === state.activeProjectId
  }))
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onCreateProjectClick: name => dispatch(createProject(name)),
  onProjectSwitch: id => ownProps.onProjectSwitch(id)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectTabs);
