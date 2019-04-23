import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';

cytoscape.use(edgehandles);

function init(cy) {
  const config = createConfig();
  const instance = cy.getNativeInstance().edgehandles(config);

  function createConfig() {
    // For full config description visit:
    // https://github.com/cytoscape/cytoscape.js-edgehandles
    const configChanges = {
      // whether to show added edges preview before releasing selection
      edgeParams(sourceNode, targetNode) {
        return cy.generateEdgeParams(sourceNode, targetNode);
      }
    };

    return configChanges;
  }

  function getInstance() {
    return instance;
  }

  function destroy() {
    instance.destroy();
  }

  return {
    getInstance,
    destroy
  };
}

export default init;
