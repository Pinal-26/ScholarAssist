package com.scholarassist.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.*;

import com.scholarassist.repository.UserRepository;
import com.scholarassist.repository.ScholarshipRepository;
import com.scholarassist.repository.ApplicationTrackingRepository;

@RestController
@RequestMapping("/api/admin/analytics")
public class AdminAnalyticsController {

    private final UserRepository userRepository;
    private final ScholarshipRepository scholarshipRepository;
    private final ApplicationTrackingRepository applicationTrackingRepository;

    public AdminAnalyticsController(UserRepository userRepository,
                                    ScholarshipRepository scholarshipRepository,
                                    ApplicationTrackingRepository applicationTrackingRepository) {
        this.userRepository = userRepository;
        this.scholarshipRepository = scholarshipRepository;
        this.applicationTrackingRepository = applicationTrackingRepository;
    }

    @GetMapping("/usability")
    public Map<String, Long> getWebsiteUsabilityData() {

        Map<String, Long> data = new HashMap<>();

        data.put("totalUsers", userRepository.count());
        data.put("totalScholarships", scholarshipRepository.count());
        data.put("totalApplications", applicationTrackingRepository.count());

        return data;
    }
}