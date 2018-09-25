package cz.cvut.fel.rhino.repo;

import cz.cvut.fel.rhino.model.Overview;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OverviewRepository extends MongoRepository<Overview, String> {

    Overview getFirstBy();
}
