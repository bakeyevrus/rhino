import cytoscape from 'cytoscape';
import isEmpty from 'lodash.isempty';
import { PRIORITY } from './constants';
import createNameGenerator from './helpers/IdCounter';

class CytoscapeCore {
  config = null;

  nameGenerator = null;

  cy = null;

  plugins = [];

  constructor(container, elements) {
    if (container == null) {
      throw new Error('Container for cytoscape instance is null');
    }

    if (isEmpty(elements)) {
      this.createConfig(container);
    } else {
      this.createConfig(container, elements);
    }

    this.nameGenerator = createNameGenerator();
    this.cy = cytoscape(this.config);
  }

  createNode(x, y) {
    const newNode = this.generateNodeParams(x, y);
    this.cy.add(newNode);
  }

  destroy() {
    this.plugins.forEach(plugin => plugin.destroy());
    this.cy.destroy();
  }

  /**
   * Verifies if cytoscape node or edge has been clicked.
   * Note, that method filters out all non-native cytoscape elements like edgehandle nodes, etc...
   * @param {*} element - element to test
   */
  isElement(element) {
    return element !== this.cy && element.data('name');
  }

  /**
   * Validate name for duplication
   * @param {string} elementName - element name to validate
   */
  isNameValid(elementName) {
    return this.cy.filter(`[name = "${elementName}"]`).size() === 0;
  }

  generateEdgeParams(srcNode, targetNode) {
    return {
      group: 'edges',
      data: {
        name: this.getNextName(false),
        source: srcNode.id(),
        target: targetNode.id(),
        from: srcNode.data('name'),
        to: targetNode.data('name'),
        priority: PRIORITY.LOW
      }
    };
  }

  generateNodeParams(x, y) {
    return {
      group: 'nodes',
      data: {
        name: this.getNextName(true),
        priority: PRIORITY.LOW
      },
      position: { x, y }
    };
  }

  getNativeInstance() {
    return this.cy;
  }

  getNextName(isNode = true) {
    const generate = isNode ? this.nameGenerator.nextLetter : this.nameGenerator.nextNumber;

    let name = generate();
    while (!this.isNameValid(name)) {
      name = generate();
    }

    return name;
  }

  /**
   * Get an element data from its ID
   * @param {string} id
   */
  getElementDataById(id) {
    return this.cy.getElementById(id).data();
  }

  removeAllSelected() {
    this.cy.$(':selected').remove();
  }

  /**
   * Removes element attribute and returns updated element attributes.
   * If id refers to non-existing element, returns null
   *
   * @param {string} id - id of the element to remove attribute from
   * @param {string} attrName  - name of the element attribute to remove
   */
  removeAttribute(id, attrName) {
    const targetElement = this.cy.getElementById(id);
    if (targetElement == null) {
      console.warn(`Element with id ${id} doesn't exist in cytoscape`);
      return null;
    }
    targetElement.removeData(attrName);

    return targetElement.data();
  }

  removeElement(element) {
    this.cy.remove(element);
  }

  select(selector = '*') {
    this.cy.elements().unselect();

    switch (selector) {
      case 'node':
        this.cy.nodes().select();
        break;
      case 'edge':
        this.cy.edges().select();
        break;
      case '*':
        this.cy.elements('*').select();
        break;
      default:
        throw new Error(`Unsupported selector ${selector} passed to select()`);
    }
  }

  selectAllEdges() {
    this.select('edge');
  }

  selectAllNodes() {
    this.select('node');
  }

  selectAll() {
    this.select('*');
  }

  setPlugins(plugins) {
    this.plugins = plugins;
  }

  /**
   * Updates element attribute and returns updated element attributes.
   * If id refers to non-existing element, returns null
   *
   * @param {string} id - id of the element to update
   * @param {string} attrName  - name of the element attribute to update
   * @param {string | number} attrValue - value of the element attribute to set
   */
  updateElementData(id, attrName, attrValue) {
    const targetElement = this.cy.getElementById(id);
    if (targetElement == null) {
      console.warn(`Element with id ${id} doesn't exist in cytoscape`);
      return null;
    }

    targetElement.data(attrName, attrValue);
    if (targetElement.isNode() && attrName === 'name') {
      targetElement.outgoers('edge').forEach(outEdge => outEdge.data('from', attrValue));
      targetElement.incomers('edge').forEach(inEdge => inEdge.data('to', attrValue));
    }
    return targetElement.data();
  }

  createConfig(container, elements) {
    const defaultConf = {
      style: [
        {
          selector: 'node',
          css: {
            shape: 'ellipse'
          }
        },
        {
          selector: 'edge',
          css: {
            'curve-style': 'bezier',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'target-endpoint': 'outside-to-line',
            'arrow-scale': 1.5
          }
        },
        {
          selector: 'node[name], edge[name]',
          style: {
            content: 'data(name)'
          }
        },
        {
          selector: `*:unselected[priority = '${PRIORITY.LOW}']`,
          css: {
            'background-color': '#69d052',
            'line-color': '#69d052'
          }
        },
        {
          selector: `*:unselected[priority = '${PRIORITY.MEDIUM}']`,
          css: {
            'background-color': '#ffc905',
            'line-color': '#ffc905'
          }
        },
        {
          selector: `*:unselected[priority = '${PRIORITY.HIGH}']`,
          css: {
            'background-color': '#ff4545',
            'line-color': '#ff4545'
          }
        },
        // Edgehandle styling
        {
          selector: '.eh-handle',
          style: {
            'background-color': 'red',
            width: 12,
            height: 12,
            shape: 'ellipse',
            'overlay-opacity': 0,
            // makes the handle easier to hit
            'border-width': 12,
            'border-opacity': 0
          }
        },
        {
          selector: '.eh-hover',
          style: {
            'background-color': 'red'
          }
        },
        {
          selector: '.eh-source',
          style: {
            'border-width': 2,
            'border-color': 'red'
          }
        },
        {
          selector: '.eh-target',
          style: {
            'border-width': 2,
            'border-color': 'red'
          }
        },
        {
          selector: '.eh-preview, .eh-ghost-edge',
          style: {
            'background-color': 'red',
            'line-color': 'red',
            'target-arrow-color': 'red',
            'source-arrow-color': 'red'
          }
        }
      ],
      userZoomingEnabled: false
    };
    this.config = {
      ...defaultConf,
      container,
      elements
    };
  }
}

export default CytoscapeCore;
