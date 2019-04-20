import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { getActiveGraph } from '../reducers';
import CytoscapeCore from './CytoscapeCore';

Editor.propTypes = {
  graph: PropTypes.shape({
    id: PropTypes.string,
    elements: PropTypes.shape({
      nodes: PropTypes.array,
      edges: PropTypes.array
    })
  })
};

Editor.defaultProps = {
  graph: {}
};

function Editor({ graph }) {
  return (
    <Row>
      <Col lg={10}>
        <CytoscapeCore graph={graph} />
      </Col>
      <Col lg={2}>
        <div>Hello, world!</div>
      </Col>
    </Row>
  );
}

function mapStateToProps(state) {
  return {
    graph: getActiveGraph(state)
  };
}

export default connect(mapStateToProps)(Editor);
