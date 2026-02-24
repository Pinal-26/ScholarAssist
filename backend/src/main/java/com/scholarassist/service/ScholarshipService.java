package com.scholarassist.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.scholarassist.entity.Notification;
import com.scholarassist.entity.Profile;
import com.scholarassist.entity.Scholarship;
import com.scholarassist.entity.User;
import com.scholarassist.repository.NotificationRepository;
import com.scholarassist.repository.ProfileRepository;
import com.scholarassist.repository.ScholarshipRepository;
import com.scholarassist.repository.UserRepository;

@Service
public class ScholarshipService {

    private final ScholarshipRepository scholarshipRepo;
    private final ProfileRepository profileRepo;
private final UserRepository userRepo;
private final NotificationRepository notificationRepo;
   public ScholarshipService(ScholarshipRepository scholarshipRepo,
                           ProfileRepository profileRepo,
                           UserRepository userRepo,
                           NotificationRepository notificationRepo) {
    this.scholarshipRepo = scholarshipRepo;
    this.profileRepo = profileRepo;
    this.userRepo = userRepo;
    this.notificationRepo = notificationRepo;
}

    // ================= GET ALL =================
    public List<Scholarship> getAllScholarships() {
        return scholarshipRepo.findAll();
    }

    public Scholarship getScholarshipById(Long id) {
        return scholarshipRepo.findById(id).orElse(null);
    }

    public Scholarship saveScholarship(Scholarship scholarship) {

    Scholarship saved = scholarshipRepo.save(scholarship);

    // 🔔 Notify all users about new scholarship
    List<User> users = userRepo.findAll();

    for (User user : users) {
        notificationRepo.save(
            new Notification(
                user.getId(),
                "🔥 New scholarship added: " + saved.getTitle()
            )
        );
    }

    return saved;
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
    // Skip expired scholarships
    if (scholarship.getDeadline() != null &&
        scholarship.getDeadline().isBefore(LocalDate.now())) {
        return false;
    }
        // ---------- INCOME CHECK ----------
        if (profile.getParentIncome() != null &&
            scholarship.getMaxIncome() != null) {

            if (profile.getParentIncome() > scholarship.getMaxIncome()) {
                return false;
            }
        }

        // ---------- PERCENTAGE CHECK ----------
        if (profile.getTwelfthPercentage() != null &&
            scholarship.getMinPercentage() != null) {

            if (profile.getTwelfthPercentage() < scholarship.getMinPercentage()) {
                return false;
            }
        }

        // ---------- CASTE CHECK ----------
        if (scholarship.getEligibleCaste() != null) {

    String scholarshipCaste = scholarship.getEligibleCaste().trim().toLowerCase();
    String studentCaste = profile.getCaste() != null
            ? profile.getCaste().trim().toLowerCase()
            : "";

    if (!scholarshipCaste.equals("all") &&
        !scholarshipCaste.equals(studentCaste)) {
        return false;
    }
}

        // ---------- LOCALITY CHECK ----------
      if (scholarship.getEligibleLocality() != null) {

    String scholarshipState = scholarship.getEligibleLocality().trim().toLowerCase();
    String studentState = profile.getLocality() != null
            ? profile.getLocality().trim().toLowerCase()
            : "";

    // Allow ALL / All India
    if (!scholarshipState.equals("all india") &&
        !scholarshipState.equals("all") &&
        !scholarshipState.equals(studentState)) {
        return false;
    }
}

        return true;
    }
}