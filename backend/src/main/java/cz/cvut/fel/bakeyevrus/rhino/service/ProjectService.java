package cz.cvut.fel.bakeyevrus.rhino.service;

import cz.cvut.fel.bakeyevrus.rhino.dto.ProjectDto;
import cz.cvut.fel.bakeyevrus.rhino.mapper.ProjectMapper;
import cz.cvut.fel.bakeyevrus.rhino.model.Project;
import cz.cvut.fel.bakeyevrus.rhino.repository.ProjectRepository;
import lombok.extern.log4j.Log4j2;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Log4j2
@Service
public class ProjectService {

    private ProjectRepository projectRepository;
    private UserDetailsService userDetailsService;

    public ProjectService(ProjectRepository projectRepository, UserDetailsService userDetailsService) {
        this.projectRepository = projectRepository;
        this.userDetailsService = userDetailsService;
    }

    public Mono<ProjectDto> getUserProjectById(String projectId) {
        Mono<ObjectId> objectIdMono = getProjectId(projectId);

        return projectRepository.findById(objectIdMono)
                .filterWhen(project ->
                        userDetailsService.getUserId().map(userId -> project.getCreatedBy().equals(userId))
                )
                .map(ProjectMapper::toDto);

    }

    public Mono<ProjectDto> create(ProjectDto projectDto) {
        return userDetailsService.getUserId()
                .map(createdBy -> {
                    var project = ProjectMapper.fromDto(projectDto);
                    project.setCreatedBy(createdBy);
                    return project;
                })
                .flatMap(projectRepository::save)
                .map(ProjectMapper::toDto);
    }

    public Mono<Long> deleteById(String projectId) {
        return Mono.zip(getProjectId(projectId), userDetailsService.getUserId())
                .flatMap(tuple -> projectRepository.deleteByProjectId(tuple.getT1(), tuple.getT2()));
    }

    public Mono<ProjectDto> update(ProjectDto projectDto) {
        Mono<Project> projectMono = userDetailsService.getUserId()
                .map(userId -> {
                    var updatedProject = ProjectMapper.fromDto(projectDto);
                    updatedProject.setCreatedBy(userId);
                    return updatedProject;
                });


        return projectMono.flatMap(
                project ->
                        projectRepository.findByIdAndCreatedBy(project.getId(), project.getCreatedBy())
                                .switchIfEmpty(Mono.error(new RuntimeException("Entity Not Found")))
                                .then(projectMono)
        )
                .flatMap(projectRepository::save)
                .map(ProjectMapper::toDto);

    }

    private Mono<ObjectId> getProjectId(String id) {
        try {
            return Mono.just(new ObjectId(id));
        } catch (IllegalArgumentException e) {
            log.debug(e.getMessage());
            return Mono.empty();
        }
    }
}
