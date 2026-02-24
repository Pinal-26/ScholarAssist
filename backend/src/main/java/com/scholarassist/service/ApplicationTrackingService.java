package com.scholarassist.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.scholarassist.dto.ApplicationDetailsDTO;
import com.scholarassist.dto.ApplyRequest;
import com.scholarassist.entity.ApplicationTracking;
import com.scholarassist.entity.Scholarship;
import com.scholarassist.repository.ApplicationTrackingRepository;
import com.scholarassist.repository.ScholarshipRepository;

@Service
public class ApplicationTrackingService {

    @Autowired
    private ApplicationTrackingRepository applicationTrackingRepository;

    @Autowired
    private ScholarshipRepository scholarshipRepository;

    @Autowired
    private ScholarshipService scholarshipService;

// ================= APPLY SCHOLARSHIP =================
public Object applyScholarship(ApplyRequest request) {

    Optional<Scholarship> optionalScholarship =
            scholarshipRepository.findById(request.getScholarshipId());

    if (optionalScholarship.isEmpty()) {
        return "SCHOLARSHIP_NOT_FOUND";
    }
        // 🚫 Prevent duplicate application
        boolean alreadyApplied = applicationTrackingRepository
                .existsByUserIdAndScholarshipId(
                        request.getUserId(),
                        request.getScholarshipId()
                );

if (alreadyApplied) {
    return "ALREADY_APPLIED";
}
    Scholarship scholarship = optionalScholarship.get();

    // 🚫 Check expired
    if (scholarship.getDeadline() != null &&
        scholarship.getDeadline().isBefore(LocalDate.now())) {
        return "EXPIRED";
    }

    // 🚫 Check eligibility
    boolean eligible = scholarshipService
            .getEligibleScholarships(request.getUserId())
            .stream()
            .anyMatch(s -> s.getId().equals(scholarship.getId()));

    if (!eligible) {
        return "NOT_ELIGIBLE";
    }

    // ✅ Save normally
    ApplicationTracking application = new ApplicationTracking();
    application.setUserId(request.getUserId());
    application.setScholarshipId(request.getScholarshipId());
    application.setApplicationLink(request.getApplicationLink());
    application.setAppliedDate(LocalDate.now().toString());
    application.setStatus("PENDING");

    return applicationTrackingRepository.save(application);
}
    
        // ================= FORCE APPLY =================
public ApplicationTracking forceApplyScholarship(ApplyRequest request) {

    ApplicationTracking application = new ApplicationTracking();

    application.setUserId(request.getUserId());
    application.setScholarshipId(request.getScholarshipId());
    application.setApplicationLink(request.getApplicationLink());
    application.setAppliedDate(LocalDate.now().toString());
    application.setStatus("PENDING");

    return applicationTrackingRepository.save(application);
}
    // ================= GET USER APPLICATIONS =================

    public List<ApplicationDetailsDTO> getUserApplications(Long userId) {

        List<ApplicationTracking> applications =
                applicationTrackingRepository.findAll()
                        .stream()
                        .filter(a -> a.getUserId().equals(userId))
                        .collect(Collectors.toList());

        return applications.stream().map(app -> {

            Scholarship scholarship = scholarshipRepository
                    .findById(app.getScholarshipId())
                    .orElse(null);

            ApplicationDetailsDTO dto = new ApplicationDetailsDTO();

            dto.setId(app.getId());
            dto.setStatus(app.getStatus());

            if (scholarship != null) {
                dto.setScholarshipTitle(scholarship.getTitle());
                dto.setAmount(scholarship.getAmount());
                dto.setDeadline(scholarship.getDeadline());
                dto.setAppliedDate(app.getAppliedDate());
            }

            return dto;

        }).collect(Collectors.toList());
    }

    // ================= UPDATE STATUS =================

    public String updateStatus(Long id, String status) {

        Optional<ApplicationTracking> optional =
                applicationTrackingRepository.findById(id);

        if (optional.isEmpty()) {
            return "Application not found";
        }

        ApplicationTracking application = optional.get();

        application.setStatus(status.toUpperCase());

        applicationTrackingRepository.save(application);

        return "Status updated successfully";
    }
}