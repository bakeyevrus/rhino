package cz.cvut.fel.bakeyevrus.rhino.service;

import cz.cvut.fel.bakeyevrus.rhino.exception.UnauthorizedException;
import lombok.extern.log4j.Log4j2;
import org.bson.types.ObjectId;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.Objects;

@Log4j2
@Service
public class UserDetailsService {

    public Mono<ObjectId> getUserId() {
        return ReactiveSecurityContextHolder.getContext()
                .filter(Objects::nonNull)
                .map(securityContext -> new ObjectId(securityContext.getAuthentication().getDetails().toString()))
                .switchIfEmpty(Mono.error(() -> {
                    log.error("Authentication token is missing in Security Context");
                    return new UnauthorizedException("Authentication token is missing in Security Context");
                }));
    }

}
