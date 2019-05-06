package cz.cvut.fel.bakeyevrus.rhino.oxygen;

import com.mxgraph.model.mxICell;
import structure.Graph;

import java.io.Serializable;
import java.util.ArrayList;

class OxygenGraphModel implements Serializable {

    /**
     * Graph used for creating the GraphComponent
     */
    private Graph graph;

    /**
     * Start node of the graph.
     */
    private mxICell start;

    /**
     * Constructor initialize fields.
     */
    public OxygenGraphModel() {
        graph = new OxygenGraphMxImpl();
        graph.setDefaultLookAndFeel();
    }

    public Graph getGraph() {
        return graph;
    }

    /**
     * @return all nodes in the graph
     */
    public ArrayList<mxICell> getNodes() {
        Object[] n = graph.getChildCells(graph.getDefaultParent());
        ArrayList<mxICell> line = new ArrayList<>();
        for (Object o : n) {
            mxICell edge = (mxICell) o;
            if (edge.isVertex()) {
                line.add(edge);
            }
        }
        return line;
    }

    /**
     * @return all edges in the graph
     */
    public ArrayList<mxICell> getEdges() {
        Object[] n = graph.getChildCells(graph.getDefaultParent());
        ArrayList<mxICell> line = new ArrayList<>();
        for (Object o : n) {
            mxICell edge = (mxICell) o;
            if (edge.isEdge()) {
                line.add(edge);
            }
        }
        return line;
    }

    public mxICell getStart() {
        return start;
    }

    public void setStart(mxICell start) {
        this.start = start;
    }
}