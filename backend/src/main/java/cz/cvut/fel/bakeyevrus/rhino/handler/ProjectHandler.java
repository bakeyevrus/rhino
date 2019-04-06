package cz.cvut.fel.bakeyevrus.rhino.handler;

import cz.cvut.fel.bakeyevrus.rhino.dto.ProjectDto;
import cz.cvut.fel.bakeyevrus.rhino.exception.UnauthorizedException;
import cz.cvut.fel.bakeyevrus.rhino.service.ProjectService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.server.ServerWebInputException;
import reactor.core.publisher.Mono;

@Log4j2
@Component
public class ProjectHandler {

    private ProjectService projectService;
    private RequestBodyValidator validator;

    @Autowired
    public ProjectHandler(ProjectService projectService, RequestBodyValidator validator) {
        this.projectService = projectService;
        this.validator = validator;
    }

    public Mono<ServerResponse> getProjectById(ServerRequest request) {
        String projectId = request.pathVariable("id");
        return projectService.getUserProjectById(projectId)
                .flatMap(projectDto -> ServerResponse.ok().syncBody(projectDto))
                .switchIfEmpty(ServerResponse.notFound().build())
                .onErrorResume(
                        UnauthorizedException.class,
                        err -> ServerResponse.status(HttpStatus.UNAUTHORIZED).build()
                );
    }

    public Mono<ServerResponse> createProject(ServerRequest request) {
        return request.bodyToMono(ProjectDto.class)
                .doOnNext(projectDto -> validator.validate(projectDto, ProjectDto.Create.class))
                .map(projectDto -> projectService.create(projectDto))
                .flatMap(projectDto -> ServerResponse.ok().body(projectDto, ProjectDto.class))
                .onErrorResume(
                        ServerWebInputException.class,
                        err -> {
                            log.info(err.getMessage());
                            return ServerResponse.badRequest().build();
                        }
                )
                .onErrorResume(
                        UnauthorizedException.class,
                        err -> ServerResponse.status(HttpStatus.UNAUTHORIZED).build()
                );

    }

    public Mono<ServerResponse> deleteProject(ServerRequest request) {
        String projectId = request.pathVariable("id");
        return projectService.deleteById(projectId)
                .filter(deletedProjects -> deletedProjects > 0)
                .flatMap(deletedProjects -> ServerResponse.ok().build())
                .switchIfEmpty(ServerResponse.notFound().build())
                .onErrorResume(
                        UnauthorizedException.class,
                        err -> ServerResponse.status(HttpStatus.UNAUTHORIZED).build()
                );
    }

    public Mono<ServerResponse> updateProject(ServerRequest request) {
        String projectId = request.pathVariable("id");
        return request.bodyToMono(ProjectDto.class)
                .doOnNext(projectDto -> validator.validate(projectDto, ProjectDto.Update.class))
                .filter(projectDto -> projectId.equals(projectDto.getId()))
                .switchIfEmpty(Mono.error(new ServerWebInputException("URL id and dto id doesn't match")))
                .flatMap(projectDto -> projectService.update(projectDto))
                .flatMap(responseBody -> ServerResponse.ok().syncBody(responseBody))
                .switchIfEmpty(ServerResponse.notFound().build())
                .onErrorResume(
                        ServerWebInputException.class,
                        err -> {
                            log.info(err.getMessage());
                            return ServerResponse.badRequest().build();
                        }
                )
                .onErrorResume(
                        UnauthorizedException.class,
                        err -> ServerResponse.status(HttpStatus.UNAUTHORIZED).build()
                );
    }
}