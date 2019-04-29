package cz.cvut.fel.bakeyevrus.rhino.enumeration;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum GraphElementPriority {
    @JsonProperty("Low")
    LOW("Low"),
    @JsonProperty("Medium")
    MEDIUM("Medium"),
    @JsonProperty("High")
    HIGH("High");

    GraphElementPriority(String value) {
        this.value = value;
    }

    private String value;

    public String getValue() {
        return value;
    }
}
