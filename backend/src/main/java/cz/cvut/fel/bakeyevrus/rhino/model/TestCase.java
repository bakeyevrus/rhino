package cz.cvut.fel.bakeyevrus.rhino.model;

import cz.cvut.fel.bakeyevrus.rhino.enumeration.TestCaseAlgorithm;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.LinkedList;
import java.util.List;

@Data
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class TestCase {

    // Important to keep, otherwise Mongo driver rename it to _id
    @Field("id")
    private final String id;
    private final String name;
    private final int tdl;
    private final TestCaseAlgorithm algorithm;
    private final List<List<String>> paths;

    public static TestCase of(String name, int tdl, TestCaseAlgorithm algorithm) {
        return new TestCase(null, name, tdl, algorithm, new LinkedList<>());
    }

    public TestCase withId(String id) {
        return new TestCase(id, this.name, this.tdl, this.algorithm, this.paths);
    }

    public void addPath(List<String> path) {
        List<String> copiedList = new LinkedList<>(path);
        paths.add(copiedList);
    }
}
