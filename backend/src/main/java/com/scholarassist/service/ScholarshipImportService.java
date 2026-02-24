package com.scholarassist.service;

import com.scholarassist.entity.Scholarship;
import com.scholarassist.repository.ScholarshipRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ScholarshipImportService {

    private static final String HTML_URL =
            "https://pinal-26.github.io/Scholarship-Data-Provider/scholarships.html";

    @Autowired
    private ScholarshipRepository scholarshipRepository;

    public String importScholarships() {

        try {

            Document doc = Jsoup.connect(HTML_URL)
                    .userAgent("Mozilla/5.0")
                    .timeout(10000)
                    .get();

            Elements cards = doc.select(".scholarship-card");

            if (cards.isEmpty()) {
                return "No scholarship cards found!";
            }

            List<Scholarship> toSave = new ArrayList<>();
            int newCount = 0;
            int updatedCount = 0;

            for (Element card : cards) {

                String title = card.select("h3").text().trim();
                if (title.isBlank()) continue;

                Optional<Scholarship> existing =
                        scholarshipRepository.findByTitle(title);

                Scholarship scholarship;
                if (existing.isPresent()) {
                        scholarship = existing.get();
                        updatedCount++;
                } else {
                        scholarship = new Scholarship();
                        newCount++;
                }
                // ===== BASIC FIELDS =====
                scholarship.setTitle(title);
                scholarship.setAmount(
                        parseInteger(card.select(".amount").text())
                );

                String deadlineText = card.select(".deadline").text().trim();
                if (!deadlineText.isBlank()) {
                    scholarship.setDeadline(LocalDate.parse(deadlineText));
                } else {
                    scholarship.setDeadline(null);
                }

                scholarship.setProvider(card.select(".provider").text().trim());
                scholarship.setType(card.select(".type").text().trim());
                scholarship.setDescription(card.select(".description").text().trim());
                scholarship.setApplyLink(
                        card.select(".apply-link").attr("href").trim()
                );

                // ===== ELIGIBILITY =====
                Element eligibility = card.selectFirst(".eligibility");

                if (eligibility != null) {

                    scholarship.setMaxIncome(
                            parseDouble(eligibility.select(".max-income").text())
                    );

                    scholarship.setEligibleCaste(
                            eligibility.select(".category").text().trim()
                    );

                    scholarship.setMinPercentage(
                            parseDouble(eligibility.select(".min-percentage").text())
                    );

                    scholarship.setEligibleLocality(
                            eligibility.select(".state").text().trim()
                    );
                }
                // Skip expired scholarships
                if (scholarship.getDeadline() != null &&
                scholarship.getDeadline().isBefore(LocalDate.now())) {
                continue;
                }
                toSave.add(scholarship);
            }

            scholarshipRepository.saveAll(toSave);

        return "New: " + newCount + ", Updated: " + updatedCount;

        } catch (Exception e) {
            e.printStackTrace();
            return "Import failed: " + e.getMessage();
        }
    }

    // ===== Integer Parser (for amount) =====
    private Integer parseInteger(String value) {
        try {
            if (value == null || value.isBlank()) return null;
            return Integer.parseInt(value.replaceAll("[^0-9]", ""));
        } catch (Exception e) {
            return null;
        }
    }

    // ===== Double Parser (for income & percentage) =====
    private Double parseDouble(String value) {
        try {
            if (value == null || value.isBlank()) return null;
            return Double.parseDouble(value.replaceAll("[^0-9.]", ""));
        } catch (Exception e) {
            return null;
        }
    }
}