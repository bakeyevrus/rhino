package cz.cvut.fel.bakeyevrus.rhino.oxygen;

import cz.cvut.fel.bakeyevrus.rhino.model.Graph;

import java.util.List;

public interface IOxygenAdapter {

    List<List<String>> generateTestCases(Graph graph, int tdlDepth, boolean optimize);
}
