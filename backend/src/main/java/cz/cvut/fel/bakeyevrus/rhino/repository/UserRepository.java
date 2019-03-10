package cz.cvut.fel.bakeyevrus.rhino.repository;

import cz.cvut.fel.bakeyevrus.rhino.model.User;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface UserRepository extends ReactiveMongoRepository<User, String> {

    Mono<User> findByEmail(String email);
}
