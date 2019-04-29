package cz.cvut.fel.bakeyevrus.rhino.router;

import cz.cvut.fel.bakeyevrus.rhino.handler.GraphHandler;
import cz.cvut.fel.bakeyevrus.rhino.handler.ProjectHandler;
import cz.cvut.fel.bakeyevrus.rhino.handler.UserHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.web.reactive.function.server.RequestPredicates.accept;

@Configuration
public class MainRouter {

    private static String RHINO_API_PREFIX = "/api/v1";
    private static String PROJECT = RHINO_API_PREFIX + "/project";
    private static String PROJECT_BY_ID = PROJECT + "/{projectId}";
    private static String GRAPH = PROJECT_BY_ID + "/graph";
    private static String GRAPH_BY_ID = GRAPH + "/{graphId}";

    @Bean
    public RouterFunction<ServerResponse> route(UserHandler userHandler, ProjectHandler projectHandler, GraphHandler graphHandler) {
        return RouterFunctions.route()
                .POST("/register", accept(APPLICATION_JSON), userHandler::register)
                .POST("/login", accept(APPLICATION_JSON), userHandler::login)
                .GET(PROJECT, projectHandler::getListOfProjects)
                .POST(PROJECT, accept(APPLICATION_JSON), projectHandler::createProject)
                .GET(PROJECT_BY_ID, projectHandler::getProjectById)
                .PUT(PROJECT_BY_ID, accept(APPLICATION_JSON), projectHandler::updateProject)
                .DELETE(PROJECT_BY_ID, projectHandler::deleteProject)
                .POST(GRAPH, accept(APPLICATION_JSON), graphHandler::createGraph)
                .PUT(GRAPH_BY_ID, accept(APPLICATION_JSON), graphHandler::updateGraph)
                .DELETE(GRAPH_BY_ID, graphHandler::deleteGraph)
                .build();
    }
}
