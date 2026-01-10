package com.scholarassist.service;

import com.scholarassist.entity.Scholarship;
import com.scholarassist.repository.ScholarshipRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScholarshipService {

    private final ScholarshipRepository repository;

    public ScholarshipService(ScholarshipRepository repository) {
        this.repository = repository;
    }

    public List<Scholarship> getAllScholarships() {
        return repository.findAll();
    }

    public Scholarship getScholarshipById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Scholarship not found"));
    }

    public Scholarship saveScholarship(Scholarship scholarship) {
        return repository.save(scholarship);
    }
}
