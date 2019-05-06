package cz.cvut.fel.bakeyevrus.rhino.oxygen;

import com.mxgraph.model.mxICell;
import cz.cvut.fel.bakeyevrus.rhino.model.Graph;
import cz.cvut.fel.bakeyevrus.rhino.model.GraphEdge;
import cz.cvut.fel.bakeyevrus.rhino.model.GraphNode;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;
import reactor.util.function.Tuple2;
import reactor.util.function.Tuples;
import situations_generators.PCT_algorithms.PCTSituationsGeneratorImpl;
import situations_generators.SituationsGeneratorInterface;
import structure.GraphModelCore;
import structure.Priority;
import structure.TestSituations;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Log4j2
@Component
public class OxygenAdapter implements IOxygenAdapter {

    @Override
    public List<List<String>> generateTestCases(Graph graph, int tdlDepth, boolean optimize) {
        GraphModelCore oxGraph = convertToOxygenGraph(graph);
        return generateTestSituations(oxGraph, tdlDepth, optimize);

    }

    private GraphModelCore convertToOxygenGraph(Graph graph) {
        OxygenGraphModelCoreGenerator oxGraph = new OxygenGraphModelCoreGenerator();

        Map<String, mxICell> oxNodes = graph.getNodes().stream()
                .map(GraphNode::getData)
                /*
                 * This transformation makes side effect, which is bad, but due to the OxygenAPI is ok, since we get
                 * clear and simple code
                 */
                .map(node -> {
                    var oxNode = new OxygenGraphNode(node.getId());
                    var mxNode = node.isStartNode() ? oxGraph.setStart(oxNode) : oxGraph.connectNewNode(oxNode);

                    return Tuples.of(node.getId(), mxNode);
                })
                .collect(Collectors.toMap(
                        Tuple2::getT1,
                        Tuple2::getT2
                ));

        graph.getEdges().stream()
                .map(GraphEdge::getData)
                .forEach(edge -> oxGraph.connectNewEdge(
                        new OxygenGraphEdge(edge.getId(), edge.getPriority().name()),
                        oxNodes.get(edge.getSource()),
                        oxNodes.get(edge.getTarget())
                ));

        return oxGraph.generate();
    }

    private List<List<String>> generateTestSituations(GraphModelCore oxGraph, int tdlDepth, boolean optimize) {
        SituationsGeneratorInterface generator = new PCTSituationsGeneratorImpl(oxGraph, tdlDepth, Priority.LOW, optimize);
        TestSituations result;
        try {
            result = generator.generateTestSituations();
        } catch (Exception e) {
            log.error("Test generation failed", e);
            return Collections.emptyList();
        }

        return result.getTestSituations().stream()
                .map(testSituation -> testSituation.stream().map(mxCell -> mxCell.getValue().toString()).collect(Collectors.toUnmodifiableList()))
                .collect(Collectors.toUnmodifiableList());
    }
}
