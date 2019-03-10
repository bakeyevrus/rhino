package cz.cvut.fel.bakeyevrus.rhino.handler;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Component
public class HelloHandler {

    public Mono<ServerResponse> welcome(ServerRequest request) {
        return ServerResponse.ok()
                .body(Mono.just("Greetings, traveller!"), String.class);
    }
}
