import CytoscapeCore from './CytoscapeCore';
import Panzoom from './plugins/Panzoom';
import ContextMenus from './plugins/ContextMenus';
import Edgehandles from './plugins/Edgehandles';
import GridGuide from './plugins/GridGuide';
import { graphTypes } from '../../const';

const { FLOW } = graphTypes;
/**
 * Map of dependencies for each graph type. If you plan to create new type,
 * you should start from here
 */
const DEPENDENCY_MAP = {
  [FLOW]: {
    core: CytoscapeCore,
    plugins: [Panzoom, ContextMenus, Edgehandles, GridGuide]
  }
};

/**
 * This purpose of this function is to serve as abstract factory,
 * i.e create instances of cytoscape and plugins based on the input parameters
 * like graph type.
 */
function makeCytoscape(container, elements, graphType = FLOW) {
  const CyCore = DEPENDENCY_MAP[graphType].core;
  const pluginFactoryArray = DEPENDENCY_MAP[graphType].plugins;

  const cy = new CyCore(container, elements);
  const plugins = pluginFactoryArray.map(factoryMethod => factoryMethod(cy));
  cy.setPlugins(plugins);

  return cy;
}

export default makeCytoscape;
