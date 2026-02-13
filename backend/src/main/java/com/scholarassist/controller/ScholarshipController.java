package com.scholarassist.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scholarassist.entity.Scholarship;
import com.scholarassist.service.ScholarshipService;

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

    // ✅ Get eligible scholarships for user
@GetMapping("/eligible/{userId}")
public List<Scholarship> getEligible(@PathVariable Long userId) {
    return service.getEligibleScholarships(userId);
}
// ✅ Delete scholarship (Admin)
@DeleteMapping("/{id}")
public void deleteScholarship(@PathVariable Long id) {
    service.deleteScholarship(id);
}

}
