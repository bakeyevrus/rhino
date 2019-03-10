package cz.cvut.fel.bakeyevrus.rhino.router;

import cz.cvut.fel.bakeyevrus.rhino.handler.HelloHandler;
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
    public RouterFunction<ServerResponse> route(UserHandler userHandler, HelloHandler helloHandler) {
        return RouterFunctions.route()
                .POST("/register", accept(APPLICATION_JSON), userHandler::register)
                .POST("/login", accept(APPLICATION_JSON), userHandler::login)
                .GET("/api/v1/hello", helloHandler::welcome)
                .build();
    }
}
