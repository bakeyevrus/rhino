import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { projectActions } from '../actions';
import { isLoggedIn, getActiveProjectId, getActiveProject } from '../reducers';
import AppBar from '../components/AppBar';
import SelectProjectBanner from './SelectProjectBanner';
import LeftPanel from './LeftPanel';
import Editor from './Editor';

function EditorPage({
  activeProjectId, project, loggedIn, fetchProject
}) {
  useEffect(() => {
    if (activeProjectId != null) {
      fetchProject(activeProjectId);
    }
  }, [activeProjectId, fetchProject]);
  return (
    <>
      <AppBar loggedIn={loggedIn} />
      {project.id == null && <SelectProjectBanner />}
      {project.id != null && renderEditorContent()}
    </>
  );

  function renderEditorContent() {
    return (
      <Container fluid className="mt-2">
        <Row>
          <Col lg={2}>
            <LeftPanel />
          </Col>
          <Col lg={10}>
            <Editor />
          </Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: isLoggedIn(state),
    activeProjectId: getActiveProjectId(state),
    project: getActiveProject(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProject: id => dispatch(projectActions.fetchProject(id))
  };
}

EditorPage.defaultProps = {
  activeProjectId: null,
  project: {}
};

EditorPage.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string
  }),
  activeProjectId: PropTypes.string,
  loggedIn: PropTypes.bool.isRequired,
  fetchProject: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorPage);
