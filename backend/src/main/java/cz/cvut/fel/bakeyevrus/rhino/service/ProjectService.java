package cz.cvut.fel.bakeyevrus.rhino.service;

import cz.cvut.fel.bakeyevrus.rhino.dto.GraphDto;
import cz.cvut.fel.bakeyevrus.rhino.dto.ProjectDto;
import cz.cvut.fel.bakeyevrus.rhino.dto.TestCaseDto;
import cz.cvut.fel.bakeyevrus.rhino.mapper.GraphMapper;
import cz.cvut.fel.bakeyevrus.rhino.mapper.ProjectMapper;
import cz.cvut.fel.bakeyevrus.rhino.mapper.TestCaseMapper;
import cz.cvut.fel.bakeyevrus.rhino.model.Graph;
import cz.cvut.fel.bakeyevrus.rhino.model.Project;
import cz.cvut.fel.bakeyevrus.rhino.oxygen.IOxygenAdapter;
import cz.cvut.fel.bakeyevrus.rhino.repository.ProjectRepository;
import lombok.extern.log4j.Log4j2;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ServerWebInputException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.util.Optional;
import java.util.function.Function;

@Log4j2
@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserDetailsService userDetailsService;
    private final IOxygenAdapter oxygenAdapter;

    public ProjectService(ProjectRepository projectRepository, UserDetailsService userDetailsService, IOxygenAdapter adapter) {
        this.projectRepository = projectRepository;
        this.userDetailsService = userDetailsService;
        this.oxygenAdapter = adapter;
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

    public Mono<ProjectDto> createProject(ProjectDto projectDto) {
        return userDetailsService.getUserId()
                .map(createdBy -> {
                    var project = ProjectMapper.fromDto(projectDto);
                    project.setCreatedBy(createdBy);
                    return project;
                })
                .flatMap(projectRepository::save)
                .map(ProjectMapper::toDto);
    }

    public Mono<Long> deleteProjectById(String projectId) {
        ObjectId id = new ObjectId(projectId);

        return userDetailsService.getUserId()
                .flatMap(userId -> projectRepository.deleteByProjectId(id, userId));
    }

    public Mono<ProjectDto> updateProject(ProjectDto projectDto) {
        ObjectId id = new ObjectId(projectDto.getId());

        return findProjectByIdAndCreatedBy(id)
                .doOnNext(project -> ProjectMapper.merge(projectDto, project))
                .flatMap(projectRepository::save)
                .map(ProjectMapper::toDto);
    }

    public Mono<GraphDto> createGraph(GraphDto graphDto, String projectIdStr) {
        ObjectId projectId = new ObjectId(projectIdStr);
        String graphId = new ObjectId().toHexString();
        Graph graph = GraphMapper.fromDto(graphDto).withId(graphId);

        return findProjectByIdAndCreatedBy(projectId)
                .doOnNext(project -> project.addGraph(graph))
                .flatMap(projectRepository::save)
                .map(project -> project.getGraph(graphId))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .map(GraphMapper::toDto);
    }

    public Mono<Boolean> deleteGraph(String projectIdStr, String graphIdStr) {
        ObjectId projectId = new ObjectId(projectIdStr);

        return findProjectByIdAndCreatedBy(projectId)
                .flatMap(project -> {
                    var isSuccess = project.removeGraph(graphIdStr);
                    return isSuccess ? Mono.just(project) : Mono.empty();
                })
                .flatMap(projectRepository::save)
                .hasElement();


    }

    public Mono<GraphDto> updateGraph(GraphDto graphDto, String projectIdStr) {
        ObjectId projectId = new ObjectId(projectIdStr);
        return findProjectByIdAndCreatedBy(projectId)
                // TODO: how to do it in functional way?
                .flatMap(project -> {
                    var graphOptional = project.getGraph(graphDto.getId());
                    if (graphOptional.isEmpty()) {
                        return Mono.empty();
                    }

                    var graph = graphOptional.get();
                    if (!graph.getType().equals(graphDto.getType())) {
                        return Mono.error(
                                new ServerWebInputException(
                                        "It is forbidden to change graph type, before: " + graph.getType().toString() + ", now: " + graphDto.getType().toString()
                                )
                        );
                    }

                    GraphMapper.merge(graphDto, graph);
                    return projectRepository.save(project);
                })
                .flatMap(project -> Mono.justOrEmpty(project.getGraph(graphDto.getId())))
                .map(GraphMapper::toDto);
    }

    public Mono<TestCaseDto> createTestCase(TestCaseDto dto, String projectIdStr, String graphId) {
        ObjectId projectId = new ObjectId(projectIdStr);
        String testCaseId = new ObjectId().toHexString();
        var testCase = TestCaseMapper.fromDto(dto).withId(testCaseId);

        return findProjectByIdAndCreatedBy(projectId)
                .flatMap(project ->
                        Mono.justOrEmpty(project.getGraph(graphId))
                                .publishOn(Schedulers.elastic())
                                .doOnNext(graph -> {
                                    var paths = oxygenAdapter.generateTestCases(graph, testCase.getTdl(), true);
                                    paths.forEach(testCase::addPath);
                                    graph.addTestCase(testCase);
                                })
                                .thenReturn(project)
                )
                .flatMap(projectRepository::save)
                .thenReturn(testCase)
                .map(TestCaseMapper::toDto);
    }

    public Mono<Boolean> deleteTestCase(String projectIdStr, String graphId, String testCaseId) {
        ObjectId projectId = new ObjectId(projectIdStr);

        return findProjectByIdAndCreatedBy(projectId)
                .flatMap(project -> Mono.justOrEmpty(project.getGraph(graphId))
                        .flatMap(graph -> {
                            var success = graph.removeTestCase(testCaseId);
                            return success ? Mono.just(project) : Mono.empty();
                        })
                )
                .flatMap(projectRepository::save)
                .hasElement();

    }

    private Mono<Project> findProjectByIdAndCreatedBy(ObjectId projectId) {
        return userDetailsService.getUserId()
                .flatMap(userId -> projectRepository.findByIdAndCreatedBy(projectId, userId));
    }

    private Function<Mono<Project>, Mono<Graph>> getGraphFromProject(String graphId) {
        return (f) -> f.map(project -> project.getGraph(graphId))
                .filter(Optional::isPresent)
                .map(Optional::get);
    }
}
