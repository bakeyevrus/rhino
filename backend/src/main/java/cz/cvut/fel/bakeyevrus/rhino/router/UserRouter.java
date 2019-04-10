package cz.cvut.fel.bakeyevrus.rhino.router;

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
public class UserRouter {

    @Bean
    public RouterFunction<ServerResponse> route(UserHandler userHandler, ProjectHandler projectHandler) {
        // TODO: extract routes to constants
        return RouterFunctions.route()
                .POST("/register", accept(APPLICATION_JSON), userHandler::register)
                .POST("/login", accept(APPLICATION_JSON), userHandler::login)
                .GET("/api/v1/project", projectHandler::getListOfProjects)
                .POST("/api/v1/project", accept(APPLICATION_JSON), projectHandler::createProject)
                .GET("/api/v1/project/{id}", projectHandler::getProjectById)
                .PUT("/api/v1/project/{id}", accept(APPLICATION_JSON), projectHandler::updateProject)
                .DELETE("/api/v1/project/{id}", projectHandler::deleteProject)
                .build();
    }
}
