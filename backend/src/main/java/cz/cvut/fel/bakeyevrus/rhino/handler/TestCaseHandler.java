package cz.cvut.fel.bakeyevrus.rhino.handler;

import cz.cvut.fel.bakeyevrus.rhino.dto.TestCaseDto;
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
public class TestCaseHandler {

    private final RequestBodyValidator validator;
    private final ProjectService projectService;

    public TestCaseHandler(RequestBodyValidator validator, ProjectService projectService) {
        this.validator = validator;
        this.projectService = projectService;
    }

    public Mono<ServerResponse> createTestCase(ServerRequest request) {
        String projectId = request.pathVariable("projectId");
        String graphId = request.pathVariable("graphId");
        return request.bodyToMono(TestCaseDto.class)
                .doOnNext(testCaseDto -> validator.validate(testCaseDto, RestAction.Create.class))
                .flatMap(testCaseDto -> projectService.createTestCase(testCaseDto, projectId, graphId))
                .flatMap(testCaseDto -> ServerResponse.ok().syncBody(testCaseDto))
                .switchIfEmpty(ServerResponse.notFound().build())
                .transform(handleErrors);
    }

    public Mono<ServerResponse> deleteTestCase(ServerRequest request) {
        String projectId = request.pathVariable("projectId");
        String graphId = request.pathVariable("graphId");
        String testCaseId = request.pathVariable("testCaseId");

        return projectService.deleteTestCase(projectId, graphId, testCaseId)
                .flatMap(success -> success ? ServerResponse.ok().build() : ServerResponse.notFound().build())
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
}
