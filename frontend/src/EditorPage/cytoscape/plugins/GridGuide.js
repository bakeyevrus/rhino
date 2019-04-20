import cytoscape from 'cytoscape';
import gridGuide from 'cytoscape-grid-guide';
import $ from 'jquery';

cytoscape.use(gridGuide, $);

// Full config description:
// https://github.com/iVis-at-Bilkent/cytoscape.js-grid-guide
const config = {
  // This option prevents bug when edgehandle plugin nodes
  // (i.e small red nodes) are aligned to the center of the grid
  snapToGridOnRelease: false,
  gridSpacing: 30
};

function init(cy) {
  cy.getNativeInstance().gridGuide(config);

  function destroy() {
    cy.getNativeInstance().gridGuide('destroy');
  }

  return {
    destroy
  };
}

export default init;
