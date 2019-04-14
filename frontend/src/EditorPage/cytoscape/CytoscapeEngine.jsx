import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import CytoscapeCore from './CytoscapeComponent';
import GraphList from './GraphList';

function CytoscapeEngine({ paper }) {
  return (
    <Container fluid className="mt-2">
      <Row noGutters>
        <Col xs={2}>
          <GraphList />
        </Col>
        <Col xs={8}>{/* <CytoscapeCore paper={paper} /> */}</Col>
        <Col xs={2}>
          <div style={{ border: '1px' }} />
        </Col>
      </Row>
    </Container>
  );
}

export default CytoscapeEngine;
