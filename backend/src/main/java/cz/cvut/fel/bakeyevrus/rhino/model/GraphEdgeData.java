package cz.cvut.fel.bakeyevrus.rhino.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class GraphEdgeData extends GraphElementData {

    private final String source;
    private final String target;
    private String from;
    private String to;

    public GraphEdgeData(String id, String source, String target) {
        super(id);
        this.source = source;
        this.target = target;
    }
}
