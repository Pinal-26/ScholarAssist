package com.scholarassist.controller;

import com.scholarassist.entity.Scholarship;
import com.scholarassist.service.ScholarshipService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scholarships")
@CrossOrigin(origins = "http://localhost:5173")
public class ScholarshipController {

    private final ScholarshipService service;

    public ScholarshipController(ScholarshipService service) {
        this.service = service;
    }

    // ✅ Get all scholarships
    @GetMapping
    public List<Scholarship> getAll() {
        return service.getAllScholarships();
    }

    // ✅ Get scholarship details by ID
    @GetMapping("/{id}")
    public Scholarship getById(@PathVariable Long id) {
        return service.getScholarshipById(id);
    }

    // ✅ Add scholarship (admin / testing)
    @PostMapping
    public Scholarship create(@RequestBody Scholarship scholarship) {
        return service.saveScholarship(scholarship);
    }
}
