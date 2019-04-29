package cz.cvut.fel.bakeyevrus.rhino.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.PersistenceConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
public class GraphEdge extends GraphElement {

    private GraphEdgeData data;

    public GraphEdge() {
        super(GraphElementGroup.EDGES);
    }

    /**
     * Following constructor created exclusively for Spring Data to create an instance of object
     * due to the incorrect behaviour when object has private field which is not used as argument constructor
     * See: https://jira.spring.io/browse/DATACMNS-1374
     */
    @PersistenceConstructor
    private GraphEdge(GraphElementGroup group) {
        super(group);
    }
}
