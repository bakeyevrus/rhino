package cz.cvut.fel.rhino.model;

public class ProjectDescription {
    private String id;
    private String name;
    //TODO: add missed graph??
    private Object graph;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Object getGraph() {
        return graph;
    }

    public void setGraph(Object graph) {
        this.graph = graph;
    }
}
