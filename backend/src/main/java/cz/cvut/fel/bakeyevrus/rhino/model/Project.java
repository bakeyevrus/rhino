package cz.cvut.fel.bakeyevrus.rhino.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@Document(collection = "projects")
public class Project {

    @Id
    private ObjectId id;
    private String name;
    private String description;
    private List<Graph> graphs;
    private ObjectId createdBy;

    public Project(String name, String description) {
        this.name = name;
        this.description = description;
    }
}
