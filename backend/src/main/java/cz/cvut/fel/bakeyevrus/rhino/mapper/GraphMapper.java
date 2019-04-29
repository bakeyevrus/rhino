package cz.cvut.fel.bakeyevrus.rhino.mapper;

import cz.cvut.fel.bakeyevrus.rhino.dto.GraphDto;
import cz.cvut.fel.bakeyevrus.rhino.dto.GraphElementsDto;
import cz.cvut.fel.bakeyevrus.rhino.model.Graph;
import cz.cvut.fel.bakeyevrus.rhino.model.GraphEdge;
import cz.cvut.fel.bakeyevrus.rhino.model.GraphNode;

import java.util.Collections;
import java.util.List;

public class GraphMapper {

    private GraphMapper() {
        // utils class
    }

    /**
     * Maps fields from {@link GraphDto} into {@link Graph}
     *
     * @param graphDto source entity to map from
     * @param graph    target entity to map into
     */
    public static void merge(GraphDto graphDto, Graph graph) {
        graph.setName(graphDto.getName());
        var elements = graphDto.getElements();

        if (elements != null) {
            List<GraphNode> nodes = elements.getNodes() == null ? Collections.emptyList() : elements.getNodes();
            graph.setNodes(nodes);

            List<GraphEdge> edges = elements.getEdges() == null ? Collections.emptyList() : elements.getEdges();
            graph.setEdges(edges);
        }
    }


    // TODO: map also nodes and edges
    public static Graph fromDto(GraphDto dto) {
        var graph = Graph.of(dto.getName(), dto.getType());

        var elements = dto.getElements();
        if (elements != null) {
            graph.setNodes(elements.getNodes());
            graph.setEdges(elements.getEdges());
        }

        if (dto.getId() != null) {
            return graph.withId(dto.getId());
        }

        return graph;
    }

    public static GraphDto toDto(Graph graph) {
        GraphElementsDto elementsDto = new GraphElementsDto();

        var edges = graph.getEdges();
        if (edges != null && !edges.isEmpty()) {
            elementsDto.setEdges(edges);
        }
        var nodes = graph.getNodes();
        if (nodes != null && !nodes.isEmpty()) {
            elementsDto.setNodes(nodes);
        }

        return new GraphDto(
                graph.getId(),
                graph.getName(),
                graph.getType(),
                elementsDto
        );
    }
}
