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

    // ================= ALL SCHOLARSHIPS =================
    public List<Scholarship> getAllScholarships() {
        return scholarshipRepo.findAll();
    }

    public Scholarship getScholarshipById(Long id) {
        return scholarshipRepo.findById(id).orElse(null);
    }

    public Scholarship saveScholarship(Scholarship s) {
        return scholarshipRepo.save(s);
    }

    // ================= ELIGIBILITY LOGIC =================
    public List<Scholarship> getEligibleScholarships(Long userId) {

        Profile profile = profileRepo.findByUserId(userId).orElse(null);

        if (profile == null) {
            return List.of();
        }

        return scholarshipRepo.findAll()
                .stream()
                .filter(scholarship -> isEligible(profile, scholarship))
                .collect(Collectors.toList());
    }

    // ================= CORE CHECK METHOD =================
    private boolean isEligible(Profile profile, Scholarship scholarship) {

        // ---------- Income Check ----------
        if (profile.getParentIncome() != null &&
            scholarship.getMaxIncome() != null) {

            if (profile.getParentIncome() > scholarship.getMaxIncome()) {
                return false;
            }
        }

        // ---------- GPA Check ----------
        if (profile.getGpa() != null &&
            scholarship.getMinGpa() != null) {

            if (profile.getGpa() < scholarship.getMinGpa()) {
                return false;
            }
        }

       // CATEGORY CHECK
if (scholarship.getCategory() != null) {
    if (scholarship.getCategory().equalsIgnoreCase("SC") ||
        scholarship.getCategory().equalsIgnoreCase("ST") ||
        scholarship.getCategory().equalsIgnoreCase("OBC") ||
        scholarship.getCategory().equalsIgnoreCase("General")) {

        if (profile.getCaste() == null ||
            !scholarship.getCategory().equalsIgnoreCase(profile.getCaste())) {
            return false;
        }
    }
}


        // If all checks pass
        System.out.println("Profile caste: " + profile.getCaste());
System.out.println("Scholarship category: " + scholarship.getCategory());

        return true;
    }
}
