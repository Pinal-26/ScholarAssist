package com.scholarassist.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scholarassist.service.ScholarshipScraperService;

@RestController
@RequestMapping("/api/scrape")
public class ScraperController {

    private final ScholarshipScraperService service;

    public ScraperController(ScholarshipScraperService service) {
        this.service = service;
    }

    @GetMapping
    public List<Map<String, String>> scrape() throws IOException {
        return service.scrapeScholarships();
    }
}
