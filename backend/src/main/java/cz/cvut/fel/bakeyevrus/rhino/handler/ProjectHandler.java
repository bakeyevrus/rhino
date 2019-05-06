package cz.cvut.fel.bakeyevrus.rhino.handler;

import cz.cvut.fel.bakeyevrus.rhino.dto.ProjectDto;
import cz.cvut.fel.bakeyevrus.rhino.exception.UnauthorizedException;
import cz.cvut.fel.bakeyevrus.rhino.service.ProjectService;
import cz.cvut.fel.bakeyevrus.rhino.validation.RequestBodyValidator;
import cz.cvut.fel.bakeyevrus.rhino.validation.RestAction;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.server.ServerWebInputException;
import reactor.core.publisher.Mono;

import java.util.function.Function;

@Log4j2
@Component
public class ProjectHandler {

    private final ProjectService projectService;
    private final RequestBodyValidator validator;

    public ProjectHandler(ProjectService projectService, RequestBodyValidator validator) {
        this.projectService = projectService;
        this.validator = validator;
    }

    public Mono<ServerResponse> getListOfProjects(ServerRequest request) {
        return ServerResponse.ok().body(projectService.getAllProjects(), ProjectDto.class)
                .transform(handleErrors);
    }

    public Mono<ServerResponse> getProjectById(ServerRequest request) {
        String projectId = request.pathVariable("projectId");
        return projectService.getProjectById(projectId)
                .flatMap(projectDto -> ServerResponse.ok().syncBody(projectDto))
                .switchIfEmpty(ServerResponse.notFound().build())
                .transform(handleErrors);
    }

    public Mono<ServerResponse> createProject(ServerRequest request) {
        return request.bodyToMono(ProjectDto.class)
                .doOnNext(projectDto -> validator.validate(projectDto, RestAction.Create.class))
                .flatMap(projectService::createProject)
                .flatMap(projectDto -> ServerResponse.ok().syncBody(projectDto))
                .transform(handleErrors);

    }

    public Mono<ServerResponse> deleteProject(ServerRequest request) {
        String projectId = request.pathVariable("projectId");
        return projectService.deleteProjectById(projectId)
                .filter(deletedProjects -> deletedProjects > 0)
                .flatMap(deletedProjects -> ServerResponse.ok().build())
                .switchIfEmpty(ServerResponse.notFound().build())
                .transform(handleErrors);
    }

    public Mono<ServerResponse> updateProject(ServerRequest request) {
        String projectId = request.pathVariable("projectId");

        return request.bodyToMono(ProjectDto.class)
                .doOnNext(projectDto -> validator.validate(projectDto, RestAction.Update.class))
                .transform(matchIds(projectId))
                .flatMap(projectService::updateProject)
                .flatMap(responseBody -> ServerResponse.ok().syncBody(responseBody))
                .switchIfEmpty(ServerResponse.notFound().build())
                .transform(handleErrors);
    }

    private final Function<Mono<ServerResponse>, Mono<ServerResponse>> handleErrors =
            f -> f.onErrorResume(
                    ServerWebInputException.class,
                    err -> {
                        log.info(err.getMessage());
                        return ServerResponse.badRequest().build();
                    })
                    .onErrorResume(
                            UnauthorizedException.class,
                            err -> ServerResponse.status(HttpStatus.UNAUTHORIZED).build()
                    );

    private Function<Mono<ProjectDto>, Mono<ProjectDto>> matchIds(String urlProjectId) {
        return f -> f.filter(projectDto -> urlProjectId.equals(projectDto.getId()))
                .switchIfEmpty(Mono.error(new ServerWebInputException("URL id and Project id doesn't match")));
    }

}