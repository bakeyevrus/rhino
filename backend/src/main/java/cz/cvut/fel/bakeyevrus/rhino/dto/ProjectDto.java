package cz.cvut.fel.bakeyevrus.rhino.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Null;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Data
@AllArgsConstructor
public class ProjectDto implements Serializable {

    public interface Create {
    }

    public interface Update {

    }

    @Null(groups = {Create.class}, message = "Project ID must be null")
    @NotEmpty(groups = {Update.class}, message = "Project ID cannot be empty")
    private String id;

    @NotEmpty(message = "Project name cannot be empty")
    private String name;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Size(max = 100, message = "Description should be no more than 100 symbols")
    private String description;
}
