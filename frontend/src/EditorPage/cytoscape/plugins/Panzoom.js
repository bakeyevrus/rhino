import cytoscape from 'cytoscape';
import panzoom from 'cytoscape-panzoom';
import 'cytoscape-panzoom/cytoscape.js-panzoom.css';
import './panzoom.css';

cytoscape.use(panzoom);
// See https://github.com/cytoscape/cytoscape.js-panzoom for full config description
const config = {
  // zoom factor per zoom tick
  zoomFactor: 0.05,
  // how many ms between zoom ticks
  zoomDelay: 45,
  // min zoom level
  minZoom: 0.1,
  // max zoom level
  maxZoom: 10,
  // padding when fitting
  fitPadding: 50,
  // how many ms in between pan ticks
  panSpeed: 10,
  // max pan distance per tick
  panDistance: 10,
  // the length of the pan drag box in which the vector for panning is calculated
  // (bigger = finer control of pan speed and direction)
  panDragAreaSize: 75,
  // the slowest speed we can pan by (as a percent of panSpeed)
  panMinPercentSpeed: 0.25,
  // radius of inactive area in pan drag box
  panInactiveArea: 8,
  // min opacity of pan indicator (the draggable nib); scales from this to 1.0
  panIndicatorMinOpacity: 0.5,
  // a minimal version of the ui only with zooming
  // (useful on systems with bad mousewheel resolution)
  zoomOnly: false,
  // selector of elements to fit
  fitSelector: undefined,
  // whether to animate on fit
  animateOnFit: () => false,
  // duration of animation on fit
  fitAnimationDuration: 1000,

  // icon class names
  sliderHandleIcon: 'fa fa-minus',
  zoomInIcon: 'oi oi-plus panzoom-icon',
  zoomOutIcon: 'oi oi-minus panzoom-icon',
  resetIcon: 'oi oi-resize-both panzoom-icon'
};

function init(cy) {
  const instance = cy.getNativeInstance().panzoom(config);

  function getInstance() {
    return instance;
  }

  function destroy() {
    cy.getNativeInstance().panzoom('destroy');
  }

  return {
    getInstance,
    destroy
  };
}

export default init;
