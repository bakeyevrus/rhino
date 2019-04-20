import cytoscape from 'cytoscape';
import isEmpty from 'lodash.isempty';
import { PRIORITY } from './constants';
import createNameGenerator from './helpers/IdCounter';

class CytoscapeCore {
  config = null;

  nameGenerator = null;

  cy = null;

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
    this.cy.destroy();
  }

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

  removeAllSelected() {
    this.cy.$(':selected').remove();
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
        // TODO: should plugin itself provide styles via cy.style().update()
        // or cytoscape core should know about it plugins?
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
