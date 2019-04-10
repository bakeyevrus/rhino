package cz.cvut.fel.bakeyevrus.rhino.service;

import cz.cvut.fel.bakeyevrus.rhino.dto.ProjectDto;
import cz.cvut.fel.bakeyevrus.rhino.mapper.ProjectMapper;
import cz.cvut.fel.bakeyevrus.rhino.model.Project;
import cz.cvut.fel.bakeyevrus.rhino.repository.ProjectRepository;
import lombok.extern.log4j.Log4j2;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Log4j2
@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserDetailsService userDetailsService;

    public ProjectService(ProjectRepository projectRepository, UserDetailsService userDetailsService) {
        this.projectRepository = projectRepository;
        this.userDetailsService = userDetailsService;
    }

    public Flux<ProjectDto> getAllProjects() {
        return userDetailsService.getUserId()
                .flatMapMany(projectRepository::findAllByCreatedBy)
                .map(ProjectMapper::toDto);
    }

    public Mono<ProjectDto> getProjectById(String projectId) {
        ObjectId id = new ObjectId(projectId);

        return findProjectByIdAndCreatedBy(id)
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
        ObjectId id = new ObjectId(projectId);

        return userDetailsService.getUserId()
                .flatMap(userId -> projectRepository.deleteByProjectId(id, userId));
    }

    public Mono<ProjectDto> update(ProjectDto projectDto) {
        ObjectId id = new ObjectId(projectDto.getId());

        return findProjectByIdAndCreatedBy(id)
                .doOnNext(project -> ProjectMapper.merge(projectDto, project))
                .flatMap(projectRepository::save)
                .map(ProjectMapper::toDto);
    }

    private Mono<Project> findProjectByIdAndCreatedBy(ObjectId projectId) {
        return userDetailsService.getUserId()
                .flatMap(userId -> projectRepository.findByIdAndCreatedBy(projectId, userId));
    }
}
