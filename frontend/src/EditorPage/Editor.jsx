import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { getActiveGraph } from '../reducers';
import makeCytoscape from './cytoscape';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

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
  const { elements } = graph;
  const { cyContainerRef, selectedElement, editor } = useCytoscape(elements);
  const { setElementAttribute, removeElementAttribute, validateName } = editor;
  return (
    <Container fluid className="mt-2">
      <Row>
        <Col lg={2}>
          <LeftPanel />
        </Col>
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
            validateName={validateName}
            setElementAttribute={setElementAttribute}
            removeElementAttribute={removeElementAttribute}
          />
        </Col>
      </Row>
    </Container>
  );
}

function useCytoscape(elements) {
  const cyContainerRef = useRef();
  const cyEditorRef = useRef();
  const [selectedElement, selectElement] = useState(null);

  useEffect(() => {
    const editor = initializeEditor(cyContainerRef.current, elements, selectElement);
    cyEditorRef.current = editor;
    return () => {
      selectElement(null);
      editor.getNativeInstance().removeListener('click');
      editor.destroy();
    };
  }, [elements]);

  function setElementAttribute(key, value) {
    const { id } = selectedElement;
    const updatedElement = cyEditorRef.current.updateElementData(id, key, value);

    /* Passing new object with spread attributes is essential, otherwise React
       won't re-render, since cyEditor returns the same instance after update */
    selectElement({ ...updatedElement });
  }

  function removeElementAttribute(attrName) {
    const { id } = selectedElement;
    const elementAttributes = cyEditorRef.current.removeAttribute(id, attrName);

    /* Passing new object with spread attributes is essential, otherwise React
       won't re-render, since cyEditor returns the same instance after update */
    selectElement({ ...elementAttributes });
  }

  function validateName(name) {
    if (name == null || name.length === 0) {
      return 'Name cannot be empty';
    }

    if (!cyEditorRef.current.isNameValid(name)) {
      return 'Entered name already exists';
    }

    return null;
  }

  return {
    cyContainerRef,
    selectedElement,
    editor: {
      setElementAttribute,
      removeElementAttribute,
      validateName
    }
  };
}

function initializeEditor(container, elements, onElementSelect) {
  const editor = makeCytoscape(container, elements);

  editor.getNativeInstance().on('click', (event) => {
    const element = event.target;
    if (editor.isElement(element)) {
      onElementSelect(element.data());
    } else {
      // Reset selected element
      onElementSelect(null);
    }
  });

  return editor;
}

function mapStateToProps(state) {
  return {
    graph: getActiveGraph(state)
  };
}

export default connect(mapStateToProps)(Editor);
