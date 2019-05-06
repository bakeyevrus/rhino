package cz.cvut.fel.bakeyevrus.rhino.mapper;

import cz.cvut.fel.bakeyevrus.rhino.dto.TestCaseDto;
import cz.cvut.fel.bakeyevrus.rhino.model.TestCase;

public class TestCaseMapper {

    private TestCaseMapper() {
        // utils class
    }

    public static TestCaseDto toDto(TestCase testCase) {
        return new TestCaseDto(
                testCase.getId(),
                testCase.getName(),
                testCase.getTdl(),
                testCase.getAlgorithm(),
                testCase.getPaths()
        );
    }

    public static TestCase fromDto(TestCaseDto dto) {
        var testCase = TestCase.of(dto.getName(), dto.getTdl(), dto.getAlgorithm());
        if (dto.getPaths() != null) {
            dto.getPaths().forEach(testCase::addPath);
        }

        if (dto.getId() != null) {
            return testCase.withId(dto.getId());
        }

        return testCase;
    }
}
