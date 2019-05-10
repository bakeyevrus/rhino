import { useRef, useState, useEffect } from 'react';
import makeCytoscape from '../EditorPage/cytoscape';

function useCytoscape(elements) {
  const cyContainerRef = useRef();
  const cyEditorRef = useRef();
  const [selectedElement, selectElement] = useState(null);

  // Will re-create cytoscape instance on every 'element' change
  useEffect(() => {
    if (elements != null) {
      const editor = initializeEditor(cyContainerRef.current, elements, selectElement);
      cyEditorRef.current = editor;
      return () => {
        selectElement(null);
        editor.getNativeInstance().removeListener('click');
        editor.destroy();
      };
    }
    // Return nothing since we don't initialize anything
    return () => ({});
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

  function getAllElements() {
    return cyEditorRef.current.getAllElements();
  }

  function selectByIds(ids) {
    return cyEditorRef.current.selectByIds(ids);
  }

  function getElementNameById(id) {
    const elementData = cyEditorRef.current.getElementDataById(id);
    if (elementData == null) {
      return null;
    }

    return elementData.name;
  }

  return {
    cyContainerRef,
    selectedElement,
    editor: {
      setElementAttribute,
      removeElementAttribute,
      validateName,
      getAllElements,
      getElementNameById,
      selectByIds
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

export default useCytoscape;
