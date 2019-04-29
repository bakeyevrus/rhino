package cz.cvut.fel.bakeyevrus.rhino.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

// TODO: find the way how to handle dynamic properties in the object
// See: https://stackoverflow.com/questions/17899872/how-to-map-document-with-dynamic-keys-to-a-spring-mongodb-entity-class
@Data
@EqualsAndHashCode(callSuper = true)
public class GraphNodeData extends GraphElementData {

    @JsonCreator
    public GraphNodeData(@JsonProperty("id") String id) {
        super(id);
    }
}
