package com.scholarassist.controller;

import com.scholarassist.entity.DocumentRequirement;
import com.scholarassist.service.DocumentRequirementService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/document-requirements")
public class DocumentRequirementController {

    private final DocumentRequirementService service;

    public DocumentRequirementController(DocumentRequirementService service) {
        this.service = service;
    }

    @GetMapping("/{scholarshipId}")
    public List<DocumentRequirement> getByScholarship(@PathVariable Long scholarshipId) {
        return service.getRequirementsByScholarship(scholarshipId);
    }

    @PostMapping
    public DocumentRequirement addRequirement(@RequestBody DocumentRequirement requirement) {
        return service.save(requirement);
    }
}