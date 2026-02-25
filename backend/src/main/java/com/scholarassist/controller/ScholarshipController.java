package com.scholarassist.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.scholarassist.entity.Scholarship;
import com.scholarassist.service.ScholarshipService;

@RestController
@RequestMapping("/api/scholarships")
public class ScholarshipController {

    private final ScholarshipService service;

    public ScholarshipController(ScholarshipService service) {
        this.service = service;
    }

    // ================= GET ALL =================
    @GetMapping
    public List<Scholarship> getAll() {
        return service.getAllScholarships();
    }

    // ================= GET BY ID =================
    @GetMapping("/{id}")
    public Scholarship getById(@PathVariable Long id) {
        return service.getScholarshipById(id);
    }

    // ================= CREATE =================
    @PostMapping
    public Scholarship create(@RequestBody Scholarship scholarship) {
        return service.saveScholarship(scholarship);
    }

    // ================= UPDATE =================
   @PutMapping("/{id}")
public Scholarship updateScholarship(
        @PathVariable Long id,
        @RequestBody Scholarship updated) {

    Scholarship scholarship = service.getScholarshipById(id);

    scholarship.setTitle(updated.getTitle());
    scholarship.setCategory(updated.getCategory());
    scholarship.setAmount(updated.getAmount());
    scholarship.setDeadline(updated.getDeadline());
    scholarship.setDescription(updated.getDescription());
    scholarship.setApplyLink(updated.getApplyLink());
    scholarship.setProvider(updated.getProvider());
    scholarship.setType(updated.getType());

    scholarship.setMaxIncome(updated.getMaxIncome());
    scholarship.setMinPercentage(updated.getMinPercentage());
    scholarship.setEligibleCaste(updated.getEligibleCaste());
    scholarship.setEligibleLocality(updated.getEligibleLocality());

    return service.saveScholarship(scholarship);
}

    // ================= DELETE =================
    @DeleteMapping("/{id}")
    public void deleteScholarship(@PathVariable Long id) {
        service.deleteScholarship(id);
    }

    // ================= ELIGIBLE =================
    @GetMapping("/eligible/{userId}")
    public List<Scholarship> getEligible(@PathVariable Long userId) {
        return service.getEligibleScholarships(userId);
    }
}