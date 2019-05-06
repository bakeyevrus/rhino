package cz.cvut.fel.bakeyevrus.rhino.oxygen;

import com.mxgraph.model.mxICell;
import structure.AbstractGraphCell;
import structure.Graph;
import structure.GraphModelCore;

import java.util.List;

class OxygenGraphModelCoreGenerator {

    private final OxygenGraphModel model;

    OxygenGraphModelCoreGenerator() {
        model = new OxygenGraphModel();
    }

    OxygenGraphModelCoreGenerator(AbstractGraphCell start) {
        model = new OxygenGraphModel();
        setStart(start);
    }

    public mxICell setStart(AbstractGraphCell start) {
        var startNode = connectNewNode(start, "startsyle");
        model.setStart(startNode);

        return startNode;
    }

    public mxICell connectNewNode(AbstractGraphCell node) {
        Graph graph = model.getGraph();
        graph.getGraphModel().beginUpdate();
        mxICell newCell = (mxICell) graph.insertVertex(graph.getDefaultParent(), null, node, 0, 0, 0, 0, "");
        graph.getGraphModel().endUpdate();
        return newCell;
    }

    private mxICell connectNewNode(AbstractGraphCell node, String style) {
        Graph graph = model.getGraph();
        graph.getGraphModel().beginUpdate();
        mxICell newCell = (mxICell) graph.insertVertex(graph.getDefaultParent(), null, node, 0, 0, 0, 0, style);
        graph.getGraphModel().endUpdate();
        return newCell;
    }

    public mxICell connectNewEdge(AbstractGraphCell edge, mxICell source, mxICell target) {
        Graph graph = model.getGraph();
        graph.getGraphModel().beginUpdate();
        mxICell mxEdge = (mxICell) graph.insertEdge(graph.getDefaultParent(), null, edge, source, target);
        graph.getGraphModel().endUpdate();
        return mxEdge;
    }


    public GraphModelCore generate() {
        return new GraphModelCore(model.getGraph(), model.getNodes(), model.getEdges(), model.getStart());
    }

    public mxICell getStart() {
        return model.getStart();
    }

    public List<mxICell> getEdges() {
        return model.getEdges();
    }
}
