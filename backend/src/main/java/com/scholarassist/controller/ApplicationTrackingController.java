package com.scholarassist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.scholarassist.dto.ApplicationDetailsDTO;
import com.scholarassist.entity.ApplicationTracking;
import com.scholarassist.service.ApplicationTrackingService;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:5173")
public class ApplicationTrackingController {

    @Autowired
    private ApplicationTrackingService service;

    // Apply scholarship
    @PostMapping
    public String apply(@RequestBody ApplicationTracking app) {
        return service.applyScholarship(app);
    }

    // Get user applications
    @GetMapping("/user/{userId}")
    public List<ApplicationDetailsDTO> getUserApplications(@PathVariable Long userId) {
        return service.getUserApplications(userId);
    }

    // Update status
    @PutMapping("/{id}/status")
    public String updateStatus(@PathVariable Long id,
                               @RequestParam String status) {
        return service.updateStatus(id, status);
    }
}
