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

@Service
public class ApplicationTrackingService {

    @Autowired
    private ApplicationTrackingRepository repository;

    // ================= APPLY SCHOLARSHIP =================
    public String applyScholarship(ApplicationTracking app) {

        Long userId = app.getUser().getId();
        Long scholarshipId = app.getScholarship().getId();

        // Prevent duplicate
        if (repository.existsByUserIdAndScholarshipId(userId, scholarshipId)) {
            return "You have already applied to this scholarship.";
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

            Scholarship scholarship = app.getScholarship();

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
