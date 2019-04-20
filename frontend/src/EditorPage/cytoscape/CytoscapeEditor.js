import CytoscapeCore from './CytoscapeCore';
import Panzoom from './plugins/Panzoom';
import ContextMenus from './plugins/ContextMenus';
import Edgehandles from './plugins/Edgehandles';
import GridGuide from './plugins/GridGuide';

const PLUGIN_LIST = [Panzoom, ContextMenus, Edgehandles, GridGuide];

class CytoscapeEditor {
  plugins = null;

  cy = null;

  constructor(container, elements) {
    this.cy = new CytoscapeCore(container, elements);
    this.initPlugins();
  }

  getCytoscape() {
    return this.cy;
  }

  initPlugins() {
    this.plugins = PLUGIN_LIST.map(init => init(this.cy));
  }

  destroyPlugins() {
    this.plugins.forEach(plugin => plugin.destroy());
  }

  destroy() {
    this.destroyPlugins();
    this.cy.destroy();
  }
}

export default CytoscapeEditor;
