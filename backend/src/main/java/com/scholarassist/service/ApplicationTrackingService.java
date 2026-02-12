package com.scholarassist.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.scholarassist.dto.ApplicationDetailsDTO;
import com.scholarassist.entity.ApplicationTracking;
import com.scholarassist.entity.Scholarship;
import com.scholarassist.repository.ApplicationTrackingRepository;
import com.scholarassist.repository.ScholarshipRepository;

@Service
public class ApplicationTrackingService {

    @Autowired
    private ApplicationTrackingRepository repository;

    @Autowired
    private ScholarshipRepository scholarshipRepository;

    // ================= APPLY SCHOLARSHIP =================
    public String applyScholarship(ApplicationTracking app) {

        // Prevent duplicate
        if (repository.existsByUserIdAndScholarshipId(
                app.getUserId(), app.getScholarshipId())) {
            return "You have already applied to this scholarship.";
        }

        // Validate scholarship exists
        Scholarship scholarship =
                scholarshipRepository.findById(app.getScholarshipId())
                        .orElse(null);

        if (scholarship == null) {
            return "Scholarship not found.";
        }

        app.setAppliedDate(LocalDate.now());
        app.setStatus("APPLIED");

        repository.save(app);

        return "Application saved successfully.";
    }

    // ================= GET USER APPLICATIONS =================
    public List<ApplicationDetailsDTO> getUserApplications(Long userId) {

        List<ApplicationTracking> applications =
                repository.findByUserId(userId);

        List<ApplicationDetailsDTO> result = new ArrayList<>();

        for (ApplicationTracking app : applications) {

            Scholarship scholarship =
                    scholarshipRepository.findById(
                            app.getScholarshipId()).orElse(null);

            if (scholarship != null) {

                ApplicationDetailsDTO dto =
                        new ApplicationDetailsDTO(
                                app.getId(),
                                scholarship.getTitle(),
                                scholarship.getAmount(),
                                scholarship.getDeadline(),
                                app.getAppliedDate(),
                                app.getStatus()
                        );

                result.add(dto);
            }
        }

        return result;
    }

    // ================= UPDATE STATUS =================
    public String updateStatus(Long id, String status) {

        ApplicationTracking app =
                repository.findById(id).orElse(null);

        if (app == null) {
            return "Application not found.";
        }

        app.setStatus(status);
        repository.save(app);

        return "Status updated successfully.";
    }
}
