package cz.cvut.fel.bakeyevrus.rhino.enumeration;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum GraphType {
    @JsonProperty("State machine")
    STATE_MACHINE,
    @JsonProperty("Flow")
    FLOW

}
