package cz.cvut.fel.bakeyevrus.rhino.dto;

import cz.cvut.fel.bakeyevrus.rhino.enumeration.TestCaseAlgorithm;
import cz.cvut.fel.bakeyevrus.rhino.validation.EnumValue;
import cz.cvut.fel.bakeyevrus.rhino.validation.RestAction;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Null;
import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
public class TestCaseDto implements Serializable {

    @Null(groups = {RestAction.Create.class}, message = "Test case ID must be null")
    private String id;

    @NotEmpty(message = "Test case name cannot be empty")
    private String name;

    @Min(value = 1, message = "Test depth level should be > 0")
    @Max(value = 3, message = "Test depth level should be less or equal to 3")
    private int tdl;

    @EnumValue(enumClass = TestCaseAlgorithm.class, message = "Incorrect algorithm type provided")
    private TestCaseAlgorithm algorithm;

    @Null(groups = RestAction.Create.class, message = "paths field must be null")
    private List<List<String>> paths;
}
