package cz.cvut.fel.bakeyevrus.rhino.repository;

import cz.cvut.fel.bakeyevrus.rhino.model.Project;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ProjectRepository extends ReactiveMongoRepository<Project, ObjectId> {

    Mono<Project> findByIdAndCreatedBy(ObjectId id, ObjectId createdBy);

    Flux<Project> findAllByCreatedBy(ObjectId createdBy);

    @Query(value = "{'$and': [{'_id': ?0}, {'createdBy': ?1}]}", delete = true)
    Mono<Long> deleteByProjectId(ObjectId id, ObjectId createdBy);
}
