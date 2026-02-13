package com.scholarassist.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @GetMapping("/stats")
    public Map<String, Object> getStats() {

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalStudents", 0);
        stats.put("totalScholarships", 0);
        stats.put("totalApplications", 0);
        stats.put("totalSuccess", 0);

        return stats;
    }

    @GetMapping("/status")
    public String getStatus() {
        return "Backend Running";
    }
}
