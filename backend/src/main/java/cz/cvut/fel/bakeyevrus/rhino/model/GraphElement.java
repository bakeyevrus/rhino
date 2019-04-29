package cz.cvut.fel.bakeyevrus.rhino.model;

import lombok.Data;

@Data
public class GraphElement {

    private GraphElementPosition position;
    private final GraphElementGroup group;
    private boolean removed;
    private boolean selected;
    private boolean selectable;
    private boolean locked;
    private boolean grabbable;
    private String classes;
}
