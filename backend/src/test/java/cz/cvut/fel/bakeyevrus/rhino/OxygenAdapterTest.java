package cz.cvut.fel.bakeyevrus.rhino;

import cz.cvut.fel.bakeyevrus.rhino.enumeration.GraphElementPriority;
import cz.cvut.fel.bakeyevrus.rhino.enumeration.GraphType;
import cz.cvut.fel.bakeyevrus.rhino.model.*;
import cz.cvut.fel.bakeyevrus.rhino.oxygen.IOxygenAdapter;
import cz.cvut.fel.bakeyevrus.rhino.oxygen.OxygenAdapter;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.List;

import static cz.cvut.fel.bakeyevrus.rhino.enumeration.GraphElementPriority.*;

@RunWith(JUnit4.class)
public class OxygenAdapterTest {

    @Test
    public void testBasic() {
        Graph graph = Graph.of("Test graph", GraphType.FLOW);

        var nodes = List.of(
                createNode("node#1", true),
                createNode("node#2", false),
                createNode("node#3", false)
        );

        var edges = List.of(
                createEdge("edge#1", "node#1", "node#2", LOW),
                createEdge("edge#2", "node#1", "node#3", HIGH),
                createEdge("edge#3", "node#2", "node#3", MEDIUM)
        );
        graph.setNodes(nodes);
        graph.setEdges(edges);

        var expectedPathsAmount = 2;

        IOxygenAdapter adapter = new OxygenAdapter();
        List<List<String>> testPaths = adapter.generateTestCases(graph, 1, true);

        Assert.assertEquals(expectedPathsAmount, testPaths.size());

    }

    private GraphNode createNode(String id, boolean startNode) {
        GraphNode node = new GraphNode();
        GraphNodeData nodeData = new GraphNodeData(id);
        nodeData.setStartNode(startNode);
        node.setData(nodeData);

        return node;
    }

    private GraphEdge createEdge(String id, String source, String target, GraphElementPriority priority) {
        GraphEdge edge = new GraphEdge();
        GraphEdgeData edgeData = new GraphEdgeData(id, source, target);
        edgeData.setPriority(priority);
        edge.setData(edgeData);

        return edge;
    }
}
