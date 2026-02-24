package com.scholarassist.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/admin/performance")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminPerformanceController {

    @GetMapping("/response-time")
    public Map<String, List<Long>> getResponseTimeData() {

        // Fake demo data (we can later make real tracking)
        List<Long> responseTimes = Arrays.asList(
                120L, 95L, 140L, 110L, 80L, 150L, 100L
        );

        Map<String, List<Long>> data = new HashMap<>();
        data.put("responseTimes", responseTimes);

        return data;
    }
}