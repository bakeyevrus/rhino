package cz.cvut.fel.bakeyevrus.rhino.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum GraphElementGroup {
    @JsonProperty("nodes")
    NODES,
    @JsonProperty("edges")
    EDGES
}
