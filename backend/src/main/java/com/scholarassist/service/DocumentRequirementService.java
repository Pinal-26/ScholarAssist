package com.scholarassist.service;

import com.scholarassist.entity.DocumentRequirement;
import com.scholarassist.repository.DocumentRequirementRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentRequirementService {

    private final DocumentRequirementRepository repository;

    public DocumentRequirementService(DocumentRequirementRepository repository) {
        this.repository = repository;
    }

    public List<DocumentRequirement> getRequirementsByScholarship(Long scholarshipId) {
        return repository.findByScholarshipId(scholarshipId);
    }

    public DocumentRequirement save(DocumentRequirement requirement) {
        return repository.save(requirement);
    }
}