package com.scholarassist.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.scholarassist.entity.ApplicationTracking;
import com.scholarassist.entity.Scholarship;
import com.scholarassist.entity.User;
import com.scholarassist.repository.ScholarshipRepository;
import com.scholarassist.repository.UserRepository;
import com.scholarassist.repository.ApplicationTrackingRepository;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private ScholarshipRepository scholarshipRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ApplicationTrackingRepository applicationTrackingRepository;

@GetMapping("/stats")
public Map<String, Object> getStats() {

    long totalUsers = userRepository.count();
    long totalScholarships = scholarshipRepository.count();
    long totalApplied = applicationTrackingRepository.count();
    long totalApproved = applicationTrackingRepository.countByStatusIgnoreCase("APPROVED");

    Map<String, Object> stats = new HashMap<>();
    stats.put("totalUsers", totalUsers);
    stats.put("totalScholarships", totalScholarships);
    stats.put("totalApplied", totalApplied);
    stats.put("totalApproved", totalApproved);

    return stats;
}

    // ================== SCHOLARSHIPS ==================

    // Get All Scholarships
    @GetMapping("/scholarships")
    public List<Scholarship> getAllScholarships() {
        return scholarshipRepository.findAll();
    }

    // Delete Scholarship
    @DeleteMapping("/scholarships/{id}")
    public String deleteScholarship(@PathVariable Long id) {
        scholarshipRepository.deleteById(id);
        return "Scholarship deleted successfully";
    }

    // ================== STUDENTS ==================

    // Get All Students
    @GetMapping("/students")
    public List<User> getAllStudents() {
        return userRepository.findAll();
    }

    // Delete Suspicious User
    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return "User removed successfully";
    }

    @GetMapping("/applications/status/{status}")
public List<ApplicationTracking> getApplicationsByStatus(@PathVariable String status) {
    return applicationTrackingRepository.findByStatusIgnoreCase(status);
}

@GetMapping("/applications")
public List<ApplicationTracking> getAllApplications() {
    return applicationTrackingRepository.findAll();
}
    
}