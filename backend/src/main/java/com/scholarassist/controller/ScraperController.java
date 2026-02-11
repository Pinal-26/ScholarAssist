package com.scholarassist.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scholarassist.entity.Scholarship;
import com.scholarassist.service.ScholarshipScraperService;

@RestController
@RequestMapping("/api/scrape")
@CrossOrigin(origins = "http://localhost:5173")
public class ScraperController {

    private final ScholarshipScraperService service;

    public ScraperController(ScholarshipScraperService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Scholarship>> scrape() {
        try {
            List<Scholarship> data = service.scrapeScholarships();
            return ResponseEntity.ok(data); // always return list
        } catch (Exception e) {
            return ResponseEntity.ok(List.of()); // return empty list on error
        }
    }
}
