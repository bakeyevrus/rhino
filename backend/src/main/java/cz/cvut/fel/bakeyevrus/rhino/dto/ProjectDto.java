package cz.cvut.fel.bakeyevrus.rhino.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import cz.cvut.fel.bakeyevrus.rhino.validation.RestAction;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Null;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
public class ProjectDto implements Serializable {

    @Null(groups = {RestAction.Create.class}, message = "Project ID must be null")
    @NotEmpty(groups = {RestAction.Update.class}, message = "Project ID cannot be empty")
    private String id;

    @NotEmpty(message = "Project name cannot be empty")
    private String name;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Size(max = 100, message = "Description should be no more than 100 symbols")
    private String description;

    @Null(groups = {RestAction.Create.class}, message = "Project graphs must be null")
    @Null(groups = {RestAction.Update.class}, message = "Updating graphs is not allowed using this endpoint")
    private List<GraphDto> graphs;
}
