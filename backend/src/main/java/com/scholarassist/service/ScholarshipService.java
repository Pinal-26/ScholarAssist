package com.scholarassist.service;

import java.util.List;
import java.util.Optional;
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

    // ================= GET ALL =================
    public List<Scholarship> getAllScholarships() {
        return scholarshipRepo.findAll();
    }

    public Scholarship getScholarshipById(Long id) {
        return scholarshipRepo.findById(id).orElse(null);
    }

    public Scholarship saveScholarship(Scholarship scholarship) {
        return scholarshipRepo.save(scholarship);
    }

    public void deleteScholarship(Long id) {
        scholarshipRepo.deleteById(id);
    }

    // ================= ELIGIBLE SCHOLARSHIPS =================
    public List<Scholarship> getEligibleScholarships(Long userId) {

        Optional<Profile> optionalProfile = profileRepo.findByUserId(userId);

        if (optionalProfile.isEmpty()) {
            return List.of();
        }

        Profile profile = optionalProfile.get();

        List<Scholarship> allScholarships = scholarshipRepo.findAll();

        return allScholarships.stream()
                .filter(s -> isEligible(profile, s))
                .collect(Collectors.toList());
    }

    // ================= CORE ELIGIBILITY CHECK =================
    private boolean isEligible(Profile profile, Scholarship scholarship) {

        // ---------- GPA CHECK ----------
        if (profile.getGpa() != null && scholarship.getMinGpa() != null) {
            if (profile.getGpa() < scholarship.getMinGpa()) {
                return false;
            }
        }

        // ---------- 10TH PERCENTAGE CHECK ----------
        if (profile.getTenthPercentage() != null &&
            scholarship.getMinTenthPercentage() != null) {

            if (profile.getTenthPercentage() < scholarship.getMinTenthPercentage()) {
                return false;
            }
        }

        // ---------- 12TH PERCENTAGE CHECK ----------
        if (profile.getTwelfthPercentage() != null &&
            scholarship.getMinTwelfthPercentage() != null) {

            if (profile.getTwelfthPercentage() < scholarship.getMinTwelfthPercentage()) {
                return false;
            }
        }

        // ---------- INCOME CHECK ----------
        if (profile.getParentIncome() != null &&
            scholarship.getMaxParentIncome() != null) {

            if (profile.getParentIncome() > scholarship.getMaxParentIncome()) {
                return false;
            }
        }

        // ---------- CASTE CHECK ----------
        // ---------- CASTE CHECK ----------
if (scholarship.getEligibleCaste() != null &&
    !scholarship.getEligibleCaste().equalsIgnoreCase("ALL")) {

    if (profile.getCaste() == null ||
        !scholarship.getEligibleCaste().equalsIgnoreCase(profile.getCaste())) {
        return false;
    }
}

// ---------- LOCALITY CHECK ----------
if (scholarship.getEligibleLocality() != null &&
    !scholarship.getEligibleLocality().equalsIgnoreCase("ALL")) {

    if (profile.getLocality() == null ||
        !scholarship.getEligibleLocality().equalsIgnoreCase(profile.getLocality())) {
        return false;
    }
}

        return true;
    }
}