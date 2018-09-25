package cz.cvut.fel.rhino.rest;

import cz.cvut.fel.rhino.model.Overview;
import cz.cvut.fel.rhino.repo.OverviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class ProjectOverviewController {

    @Autowired
    private OverviewRepository repository;

    @GetMapping("api/project")
    @ResponseBody
    public Overview getOverview() {
        return repository.getFirstBy();
    }

    @PostMapping("api/project")
    @ResponseBody
    public String saveOverview(@RequestBody Overview overview) {
        repository.deleteAll();
        Overview savedEntity = repository.save(overview);
        return savedEntity.getId();
    }
}
