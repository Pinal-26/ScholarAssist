package com.scholarassist.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    // ================== STATS ==================
    @GetMapping("/stats")
    public Map<String, Object> getStats() {

        Map<String, Object> stats = new HashMap<>();

        stats.put("totalUsers", userRepository.countByRole("USER"));
        stats.put("totalScholarships", scholarshipRepository.count());
        stats.put("totalApplied", applicationTrackingRepository.count());
        stats.put("totalApproved",
                applicationTrackingRepository.countByStatus("APPROVED"));

        return stats;
    }

    @GetMapping("/status")
    public String getStatus() {
        return "Backend Running";
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

    
}