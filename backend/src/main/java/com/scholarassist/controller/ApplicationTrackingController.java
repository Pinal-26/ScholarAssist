package com.scholarassist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.scholarassist.dto.ApplicationDetailsDTO;
import com.scholarassist.dto.ApplyRequest;
import com.scholarassist.entity.ApplicationTracking;
import com.scholarassist.repository.ApplicationTrackingRepository;
import com.scholarassist.service.ApplicationTrackingService;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:5173")
public class ApplicationTrackingController {

    @Autowired
    private ApplicationTrackingService service;

    @Autowired
    private ApplicationTrackingRepository applicationTrackingRepository;

    // ================= APPLY =================

    @PostMapping
    public ApplicationTracking apply(@RequestBody ApplyRequest request) {
        return service.applyScholarship(request);
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
        return service.updateStatus(id, status);
    }

    // ================= ADMIN FILTER BY STATUS =================

    @GetMapping("/admin")
    public List<ApplicationTracking> getByStatus(@RequestParam String status) {
        return applicationTrackingRepository.findByStatus(status);
    }
}