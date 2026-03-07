package com.scholarassist.service;

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
    // ================= CORE ELIGIBILITY CHECK =================
private boolean isEligible(Profile profile, Scholarship scholarship) {

    // income check
    if (profile.getParentIncome() != null &&
        scholarship.getMaxIncome() != null) {

        if (profile.getParentIncome() > scholarship.getMaxIncome()) {
            return false;
        }
    }

    // field / course check
    if (scholarship.getField() != null) {

        String scholarshipField = scholarship.getField().toLowerCase();

        String studentCourse = profile.getCourse() != null
                ? profile.getCourse().toLowerCase()
                : "";

        if (!scholarshipField.equals("all") &&
            !studentCourse.contains(scholarshipField)) {
            return false;
        }
    }

    return true;
}
}