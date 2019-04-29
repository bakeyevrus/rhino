package cz.cvut.fel.bakeyevrus.rhino.model;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Document(collection = "projects")
public class Project {

    @Id
    private final ObjectId id;
    private String name;
    private String description;
    private List<Graph> graphs;
    private ObjectId createdBy;

    public static Project of(String name, String description) {
        return new Project(null, name, description, Collections.emptyList(), null);
    }

    public Project withId(ObjectId id) {
        return new Project(
                id, this.name, this.description, this.graphs, this.createdBy
        );
    }

    public void addGraph(Graph graph) {
        graphs.add(graph);
    }

    public boolean removeGraph(String id) {
        return graphs.removeIf(graph -> graph.getId().equals(id));
    }

    public Optional<Graph> getGraph(String graphId) {
        return graphs.stream().filter(graph -> graphId.equals(graph.getId())).findFirst();
    }
}
