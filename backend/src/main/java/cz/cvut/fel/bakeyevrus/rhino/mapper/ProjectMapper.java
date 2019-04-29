package cz.cvut.fel.bakeyevrus.rhino.mapper;

import cz.cvut.fel.bakeyevrus.rhino.dto.ProjectDto;
import cz.cvut.fel.bakeyevrus.rhino.model.Project;
import org.bson.types.ObjectId;

import java.util.stream.Collectors;

public class ProjectMapper {

    private ProjectMapper() {
        // utils class
    }

    /**
     * Maps fields from {@link ProjectDto} into {@link Project}, note that graphs are ignored
     *
     * @param projectDto source entity to map from
     * @param project    target entity to map into
     */
    public static void merge(ProjectDto projectDto, Project project) {
        project.setName(projectDto.getName());
        project.setDescription(projectDto.getDescription());
    }

    public static Project fromDto(ProjectDto projectDto) {
        Project project = Project.of(projectDto.getName(), projectDto.getDescription());

        if (projectDto.getGraphs() != null) {
            projectDto.getGraphs()
                    .stream()
                    .map(GraphMapper::fromDto)
                    .forEach(project::addGraph);
        }

        if (projectDto.getId() != null) {
            return project.withId(new ObjectId(projectDto.getId()));
        }

        return project;
    }

    public static ProjectDto toDto(Project project) {
        var graphDtoList = project.getGraphs().stream()
                .map(GraphMapper::toDto)
                .collect(Collectors.toList());

        return new ProjectDto(
                project.getId().toHexString(),
                project.getName(),
                project.getDescription(),
                graphDtoList
        );
    }
}
