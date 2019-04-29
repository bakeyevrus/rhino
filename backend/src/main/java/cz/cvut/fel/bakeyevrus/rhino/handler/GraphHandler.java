package cz.cvut.fel.bakeyevrus.rhino.handler;

import cz.cvut.fel.bakeyevrus.rhino.dto.GraphDto;
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
public class GraphHandler {

    private final ProjectService projectService;
    private final RequestBodyValidator validator;

    public GraphHandler(ProjectService graphService, RequestBodyValidator validator) {
        this.projectService = graphService;
        this.validator = validator;
    }

    public Mono<ServerResponse> createGraph(ServerRequest request) {
        String projectId = request.pathVariable("projectId");
        return request.bodyToMono(GraphDto.class)
                .doOnNext(graphDto -> validator.validate(graphDto, RestAction.Create.class))
                .flatMap(graphDto -> projectService.createGraph(graphDto, projectId))
                .flatMap(graphDto -> ServerResponse.ok().syncBody(graphDto))
                .switchIfEmpty(ServerResponse.notFound().build())
                .transform(handleErrors);

    }

    public Mono<ServerResponse> deleteGraph(ServerRequest request) {
        String projectId = request.pathVariable("projectId");
        String graphId = request.pathVariable("graphId");

        return projectService.deleteGraph(projectId, graphId)
                .flatMap(isGraphDeleted -> isGraphDeleted ? ServerResponse.ok().build() : ServerResponse.notFound().build())
                .transform(handleErrors);
    }

    public Mono<ServerResponse> updateGraph(ServerRequest request) {
        String projectId = request.pathVariable("projectId");
        String graphId = request.pathVariable("graphId");

        return request.bodyToMono(GraphDto.class)
                .doOnNext(graphDto -> validator.validate(graphDto, RestAction.Update.class))
                .transform(matchIds(graphId))
                .flatMap(graphDto -> projectService.updateGraph(graphDto, projectId))
                .flatMap(graphDto -> ServerResponse.ok().syncBody(graphDto))
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

    private Function<Mono<GraphDto>, Mono<GraphDto>> matchIds(String urlGraphId) {
        return f -> f.filter(graphDto -> urlGraphId.equals(graphDto.getId()))
                .switchIfEmpty(Mono.error(new ServerWebInputException("URL id and Graph id doesn't match")));
    }
}
