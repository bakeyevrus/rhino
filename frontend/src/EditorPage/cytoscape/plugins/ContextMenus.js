import cytoscape from 'cytoscape';
import $ from 'jquery';
import contextMenus from 'cytoscape-context-menus';
import 'cytoscape-context-menus/cytoscape-context-menus.css';

cytoscape.use(contextMenus, $);

function init(cy) {
  const config = createConfig();
  const instance = cy.getNativeInstance().contextMenus(config);

  function createConfig() {
    const menuOptions = {
      menuItems: [
        {
          id: 'add-node',
          content: 'Add node',
          tooltipText: 'add node',
          coreAsWell: true,
          onClickFunction: event => cy.createNode(event.position.x, event.position.y),
          hasTrailingDivider: true
        },
        {
          id: 'remove',
          content: 'Remove',
          tooltipText: 'remove',
          // Filters the elements to have this menu item on cxttap
          // If the selector is not truthy no elements will have this menu item on cxttap
          selector: 'node, edge',
          onClickFunction: event => cy.removeElement(event.target),
          disabled: false,
          show: true,
          hasTrailingDivider: true,
          coreAsWell: false
        },
        {
          id: 'remove-all-selected',
          content: 'Remove all selected',
          tooltip: 'remove all selected',
          onClickFunction: () => cy.removeAllSelected(),
          disabled: false,
          show: true,
          hasTrailingDivider: false,
          coreAsWell: true
        },
        {
          id: 'select-all',
          content: 'Select all',
          tooltipText: 'select all',
          onClickFunction: () => cy.selectAll(),
          hasTrailingDivider: false,
          show: true,
          coreAsWell: true
        },
        {
          id: 'select-all-nodes',
          content: 'Select all nodes',
          tooltipText: 'select all nodes',
          onClickFunction: () => cy.selectAllNodes(),
          hasTrailingDivider: false,
          show: true,
          coreAsWell: true
        },
        {
          id: 'select-all-edges',
          content: 'Select all edges',
          tooltipText: 'select all edges',
          onClickFunction: () => cy.selectAllEdges(),
          hasTrailingDivider: true,
          show: true,
          coreAsWell: true
        }
      ],
      // css classes that menu items will have
      menuItemClasses: [],
      // css classes that context menu will have
      contextMenuClasses: []
    };

    return menuOptions;
  }

  function getInstance() {
    return instance;
  }

  function destroy() {
    cy.getNativeInstance().contextMenus('destroy');
  }

  return {
    getInstance,
    destroy
  };
}

export default init;
