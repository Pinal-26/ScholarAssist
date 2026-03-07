package com.scholarassist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scholarassist.entity.Scholarship;
import com.scholarassist.service.ScholarshipImportService;
import com.scholarassist.service.ScholarshipService;

@RestController
@RequestMapping("/api/scholarships")
public class ScholarshipController {

    private final ScholarshipService service;

    @Autowired
    private ScholarshipImportService importService;

    public ScholarshipController(ScholarshipService service) {
        this.service = service;
    }

    @GetMapping
    public List<Scholarship> getAll() {
        return service.getAllScholarships();
    }

    @GetMapping("/{id}")
    public Scholarship getById(@PathVariable Long id) {
        return service.getScholarshipById(id);
    }

    @PostMapping
    public Scholarship create(@RequestBody Scholarship scholarship) {
        return service.saveScholarship(scholarship);
    }

    @DeleteMapping("/{id}")
    public void deleteScholarship(@PathVariable Long id) {
        service.deleteScholarship(id);
    }

    @GetMapping("/eligible/{userId}")
    public List<Scholarship> getEligible(@PathVariable Long userId) {
        return service.getEligibleScholarships(userId);
    }

    // 🔥 IMPORT HTML SCHOLARSHIPS
    @GetMapping("/import")
    public String importScholarships() {
        return importService.importScholarships();
    }
}