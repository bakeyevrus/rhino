package cz.cvut.fel.bakeyevrus.rhino.dto;

import cz.cvut.fel.bakeyevrus.rhino.enumeration.GraphType;
import cz.cvut.fel.bakeyevrus.rhino.validation.EnumValue;
import cz.cvut.fel.bakeyevrus.rhino.validation.RestAction;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
public class GraphDto implements Serializable {


    @Null(groups = {RestAction.Create.class}, message = "Graph ID must be null")
    @NotEmpty(groups = {RestAction.Update.class}, message = "Graph ID cannot be empty")
    private String id;

    @NotEmpty(message = "Graph name cannot be empty")
    private String name;

    @EnumValue(enumClass = GraphType.class, message = "Type should be either `STATE_MACHINE` or `FLOW`")
    private GraphType type;

    @Null(groups = {RestAction.Create.class}, message = "elements field must be null")
    @NotNull(groups = {RestAction.Update.class}, message = "elements field is missing")
    private GraphElementsDto elements;

    @Null(groups = {RestAction.Create.class}, message = "testCases field must be null")
    @Null(groups = {RestAction.Update.class}, message = "Updating test cases is not allowed using this endpoint")
    private List<TestCaseDto> testCases;

}
