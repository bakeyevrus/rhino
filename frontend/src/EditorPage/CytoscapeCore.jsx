import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import CytoscapeEditor from './cytoscape/CytoscapeEditor';

CytoscapeCore.propTypes = {
  graph: PropTypes.shape({
    id: PropTypes.string.isRequired,
    elements: PropTypes.shape({
      nodes: PropTypes.array,
      edges: PropTypes.array
    }).isRequired
  }).isRequired
};

function CytoscapeCore({ graph }) {
  const { elements } = graph;
  const cyContainerRef = useRef(null);
  const cyEditor = useCytoscape(cyContainerRef, elements);

  return (
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
  );
}

function useCytoscape(containerRef, elements) {
  const cyEditorRef = useRef();

  useEffect(() => {
    const editor = new CytoscapeEditor(containerRef.current, elements);
    cyEditorRef.current = editor;
    return () => editor.destroy();
  }, [containerRef, elements]);

  return cyEditorRef;
}

export default CytoscapeCore;
