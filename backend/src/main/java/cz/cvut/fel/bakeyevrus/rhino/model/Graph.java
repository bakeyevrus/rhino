package cz.cvut.fel.bakeyevrus.rhino.model;

import cz.cvut.fel.bakeyevrus.rhino.enumeration.GraphType;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Collections;
import java.util.List;

@Data
@AllArgsConstructor
public class Graph {

    // Important to keep, otherwise Mongo driver rename it to _id
    @Field("id")
    private final String id;
    private String name;
    private GraphType type;
    private List<GraphNode> nodes;
    private List<GraphEdge> edges;

    public static Graph of(String name, GraphType type) {
        return new Graph(null, name, type, Collections.emptyList(), Collections.emptyList());
    }

    public Graph withId(String id) {
        return new Graph(id, this.name, this.type, this.nodes, this.edges);
    }
}
