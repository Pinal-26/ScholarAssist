package com.scholarassist.scheduler;

import com.scholarassist.service.ScholarshipImportService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScholarshipImportScheduler {

    private final ScholarshipImportService importService;

    public ScholarshipImportScheduler(ScholarshipImportService importService) {
        this.importService = importService;
    }

    // ⏰ Runs every day at 8 AM
    @Scheduled(cron = "0 0 8 * * ?")
    public void autoImportScholarships() {

        System.out.println("Running scheduled scholarship import...");

        String result = importService.importScholarships();

        System.out.println("Import Result: " + result);
    }
}