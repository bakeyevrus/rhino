package cz.cvut.fel.bakeyevrus.rhino.mapper;

import cz.cvut.fel.bakeyevrus.rhino.dto.ProjectDto;
import cz.cvut.fel.bakeyevrus.rhino.model.Project;
import org.bson.types.ObjectId;

public class ProjectMapper {

    private ProjectMapper() {
        // utils class
    }

    public static Project fromDto(ProjectDto projectDto) {
        Project project = new Project(projectDto.getName(), projectDto.getDescription());
        if (projectDto.getId() != null) {
            project.setId(new ObjectId(projectDto.getId()));
        }

        return project;
    }

    public static ProjectDto toDto(Project project) {
        return new ProjectDto(
                project.getId().toHexString(),
                project.getName(),
                project.getDescription()
        );
    }
}
