package cz.cvut.fel.bakeyevrus.rhino.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import cz.cvut.fel.bakeyevrus.rhino.model.GraphEdge;
import cz.cvut.fel.bakeyevrus.rhino.model.GraphNode;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class GraphElementsDto {

    // TODO: encapsulate domain entities and return DTO, possibly with some mapping library
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<GraphNode> nodes = new ArrayList<>();
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<GraphEdge> edges = new ArrayList<>();
}
