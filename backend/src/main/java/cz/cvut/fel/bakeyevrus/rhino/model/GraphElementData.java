package cz.cvut.fel.bakeyevrus.rhino.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import cz.cvut.fel.bakeyevrus.rhino.enumeration.GraphElementPriority;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
abstract class GraphElementData {

    // Important to keep, otherwise Mongo driver rename it to _id
    @Field("id")
    private final String id;
    private String name;
    private GraphElementPriority priority;

    @JsonCreator
    public GraphElementData(@JsonProperty("id") String id) {
        this.id = id;
    }
}
