package cz.cvut.fel.bakeyevrus.rhino.oxygen;

import com.mxgraph.model.mxGraphModel;
import com.mxgraph.model.mxICell;
import com.mxgraph.view.mxGraph;
import structure.Graph;
import structure.GraphModel;

import java.util.List;

class OxygenGraphMxImpl extends mxGraph implements Graph {

    OxygenGraphMxImpl() {
        setModel(new GraphModelMxImpl());
    }

    @Override
    public void setDefaultLookAndFeel() {
        setAllowDanglingEdges(false);
        setCellsResizable(true);
        setCellsBendable(false);
        setCellsDisconnectable(false);
    }

    @Override
    public GraphModel getGraphModel() {
        return (GraphModel) getModel();
    }


    private class GraphModelMxImpl extends mxGraphModel implements GraphModel {

        @Override
        public Object setValue(Object o, Object o1) {
            return super.setValue(o, o1);
        }

        @Override
        public List<mxICell> getAllNodes() {
            throw new RuntimeException("Not implemented yet.");
        }

        @Override
        public List<mxICell> getAllEdges() {
            throw new RuntimeException("Not implemented yet.");

        }

        @Override
        public mxICell getStart() {
            throw new RuntimeException("Not implemented yet.");
        }

    }
}
