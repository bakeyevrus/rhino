import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { getActiveGraph } from '../reducers';
import { graphActions } from '../actions';
import { useCytoscape } from '../hooks';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import SelectGraphBanner from './SelectGraphBanner';

Editor.propTypes = {
  onGraphSaveInBackground: PropTypes.func.isRequired,
  onGraphSelect: PropTypes.func.isRequired,
  onGraphSave: PropTypes.func.isRequired,
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

const SAVE_DELAY = 3 * 1000;
/* TODO: look at this: https://reactjs.org/docs/hooks-reference.html#useref
 * Does it make sense to abstract div to separate component like <EditorCore /> ?
 * Because this component is heavy to maintain, it is overloaded
 */
function Editor({
  graph, onGraphSaveInBackground, onGraphSelect, onGraphSave
}) {
  const { id, elements } = graph;
  const { cyContainerRef, selectedElement, editor } = useCytoscape(elements);
  const {
    setElementAttribute,
    removeElementAttribute,
    validateName,
    getAllElements,
    getElementNameById,
    selectByIds
  } = editor;
  useBackgroundSave(id, saveGraph, SAVE_DELAY);

  return (
    <Container fluid className="mt-2">
      <Row>
        <Col lg={2}>
          <LeftPanel saveGraph={saveGraph} selectGraph={selectGraph} />
        </Col>
        {id != null && (
          <>
            <Col lg={7}>
              <div
                ref={cyContainerRef}
                className="cytoscape-container"
                style={{
                  height: '80vh',
                  width: '100%',
                  overflowX: 'hidden',
                  border: '1px solid black'
                }}
              />
            </Col>
            <Col lg={3}>
              <RightPanel
                selectedElement={selectedElement}
                getElementNameById={getElementNameById}
                highlightPath={selectByIds}
                validateName={validateName}
                setElementAttribute={setElementAttribute}
                removeElementAttribute={removeElementAttribute}
              />
            </Col>
          </>
        )}
        {id == null && (
          <Col lg={10}>
            <SelectGraphBanner />
          </Col>
        )}
      </Row>
    </Container>
  );

  function saveGraph() {
    const graphElements = getAllElements();
    onGraphSaveInBackground({ ...graph, elements: graphElements });
  }

  function selectGraph(targetId) {
    // Save in case there is active graph selected
    if (id != null) {
      const graphElements = getAllElements();
      onGraphSave({ ...graph, elements: graphElements });
    }
    onGraphSelect(targetId);
  }
}

/* Saves graph after user inactivity
 * Save graph function is new after each component re-render,
 * that's how we can measure user inactivity
 */
function useBackgroundSave(graphId, saveGraph, delay) {
  useEffect(() => {
    if (graphId != null) {
      const id = setTimeout(saveGraph, delay);
      return () => {
        clearInterval(id);
      };
    }

    // Return nothing since we are not going to save null graph
    return () => ({});
  }, [graphId, saveGraph, delay]);
}

function mapStateToProps(state) {
  return {
    graph: getActiveGraph(state)
  };
}

const { saveGraphInBackground, selectGraph, saveGraph } = graphActions;
const mapDispatchToProps = {
  onGraphSaveInBackground: saveGraphInBackground,
  onGraphSelect: selectGraph,
  onGraphSave: saveGraph
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
