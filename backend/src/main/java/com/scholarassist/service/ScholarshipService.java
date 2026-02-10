package com.scholarassist.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.scholarassist.entity.Profile;
import com.scholarassist.entity.Scholarship;
import com.scholarassist.repository.ProfileRepository;
import com.scholarassist.repository.ScholarshipRepository;

@Service
public class ScholarshipService {

    private final ScholarshipRepository scholarshipRepo;
    private final ProfileRepository profileRepo;

    public ScholarshipService(ScholarshipRepository scholarshipRepo,
                              ProfileRepository profileRepo) {
        this.scholarshipRepo = scholarshipRepo;
        this.profileRepo = profileRepo;
    }

    public List<Scholarship> getAllScholarships() {
        return scholarshipRepo.findAll();
    }

    public Scholarship getScholarshipById(Long id) {
        return scholarshipRepo.findById(id).orElse(null);
    }

    public Scholarship saveScholarship(Scholarship s) {
        return scholarshipRepo.save(s);
    }

    // ✅ CORE LOGIC: Eligible Scholarships
    public List<Scholarship> getEligibleScholarships(Long userId) {
        Profile profile = profileRepo.findByUserId(userId).orElse(null);
        if (profile == null) return List.of();

        return scholarshipRepo.findAll().stream()
                .filter(s -> isEligible(profile, s))
                .collect(Collectors.toList());
    }

    private boolean isEligible(Profile p, Scholarship s) {
        // income check
        if (p.getParentIncome() != null && p.getParentIncome() > 300000)
            return false;

        // GPA check
        if (p.getGpa() != null && p.getGpa() < 6.0)
            return false;

        // caste/category check
        if (s.getCategory() != null &&
            !s.getCategory().equalsIgnoreCase("General") &&
            p.getCaste() != null &&
            !s.getCategory().equalsIgnoreCase(p.getCaste()))
            return false;

        return true;
    }
}
