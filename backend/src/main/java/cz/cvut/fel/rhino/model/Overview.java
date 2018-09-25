package cz.cvut.fel.rhino.model;

import org.springframework.data.annotation.Id;

import java.util.List;

public class Overview {

    @Id
    public String id;

    public String activeProjectId;
    public List<ProjectDescription> projects;

    public Overview() {
    }

    public Overview(String activeProjectId, List<ProjectDescription> projects) {
        this.activeProjectId = activeProjectId;
        this.projects = projects;
    }

    public String getId() {
        return id;
    }

    public String getActiveProjectId() {
        return activeProjectId;
    }

    public void setActiveProjectId(String activeProjectId) {
        this.activeProjectId = activeProjectId;
    }

    public List<ProjectDescription> getProjects() {
        return projects;
    }

    public void setProjects(List<ProjectDescription> projects) {
        this.projects = projects;
    }
}
