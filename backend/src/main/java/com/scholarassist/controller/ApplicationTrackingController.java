package com.scholarassist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.scholarassist.dto.ApplicationDetailsDTO;
import com.scholarassist.dto.ApplyRequest;
import com.scholarassist.entity.ApplicationTracking;
import com.scholarassist.entity.Notification;
import com.scholarassist.repository.ApplicationTrackingRepository;
import com.scholarassist.repository.NotificationRepository;
import com.scholarassist.service.ApplicationTrackingService;

@RestController
@RequestMapping("/api/applications")
public class ApplicationTrackingController {

    @Autowired
    private ApplicationTrackingService service;

    @Autowired
    private ApplicationTrackingRepository applicationTrackingRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    // ================= APPLY =================

    @PostMapping
    public Object apply(@RequestBody ApplyRequest request) {

        Object result = service.applyScholarship(request);

        if (result instanceof String) {
            // NOT_ELIGIBLE case
            return result;
        }

        // ✅ SUCCESS CASE → SEND NOTIFICATION
        notificationRepository.save(
            new Notification(
                request.getUserId(),
                "✅ Your application has been submitted successfully."
            )
        );

        return result;
    }

    // ================= FORCE APPLY =================

    @PostMapping("/force")
    public ApplicationTracking forceApply(@RequestBody ApplyRequest request) {

        ApplicationTracking saved = service.forceApplyScholarship(request);

        // ⚠ NOT ELIGIBLE BUT APPLIED
        notificationRepository.save(
            new Notification(
                request.getUserId(),
                "⚠ You applied for a scholarship even though you were not eligible."
            )
        );

        return saved;
    }

    // ================= USER APPLICATIONS =================

    @GetMapping("/user/{userId}")
    public List<ApplicationDetailsDTO> getUserApplications(@PathVariable Long userId) {
        return service.getUserApplications(userId);
    }

    // ================= UPDATE STATUS =================

    @PutMapping("/{id}/status")
    public String updateStatus(@PathVariable Long id,
                               @RequestParam String status) {

        String result = service.updateStatus(id, status);

        // 🔔 Optional: Notify user on status change
        ApplicationTracking app = applicationTrackingRepository.findById(id).orElse(null);

        if (app != null) {
            notificationRepository.save(
                new Notification(
                    app.getUserId(),
                    "📢 Your application status has been updated to: " + status
                )
            );
        }

        return result;
    }

    // ================= ADMIN FILTER BY STATUS =================

    @GetMapping("/admin")
    public List<ApplicationTracking> getByStatus(@RequestParam String status) {
        return applicationTrackingRepository.findByStatus(status);
    }
}