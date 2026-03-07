package com.scholarassist.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.scholarassist.entity.Scholarship;
import com.scholarassist.repository.ScholarshipRepository;

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

            System.out.println("TOTAL SCHOLARSHIPS FOUND: " + cards.size());

            List<Scholarship> list = new ArrayList<>();

            for (Element card : cards) {

                Scholarship scholarship = new Scholarship();

                scholarship.setTitle(card.select("h3").text());
                scholarship.setProvider(card.select(".provider").text());
                scholarship.setType(card.select(".type").text());
                scholarship.setDescription(card.select(".description").text());
                scholarship.setApplyLink(card.select(".apply-link").attr("href"));

                scholarship.setAmount(parseInteger(card.select(".amount").text()));

                // Deadline parsing SAFE
                try {
                    String deadlineText = card.select(".deadline").text();
                    if (!deadlineText.isEmpty()) {
                        scholarship.setDeadline(LocalDate.parse(deadlineText));
                    }
                } catch (Exception e) {
                    scholarship.setDeadline(null);
                }

                Element eligibility = card.selectFirst(".eligibility");

                if (eligibility != null) {

                    scholarship.setMaxIncome(
                            parseDouble(eligibility.select(".max-income").text()));

                    scholarship.setEligibleCaste(
                            eligibility.select(".category").text());

                    scholarship.setMinPercentage(
                            parseDouble(eligibility.select(".min-percentage").text()));

                    scholarship.setEligibleLocality(
                            eligibility.select(".state").text());
                }

                list.add(scholarship);

                System.out.println("Imported: " + scholarship.getTitle());
            }

            scholarshipRepository.saveAll(list);

            return "Imported " + list.size() + " scholarships";

        } catch (Exception e) {
            e.printStackTrace();
            return "Import failed: " + e.getMessage();
        }
    }

    private Integer parseInteger(String value) {
        try {
            return Integer.parseInt(value.replaceAll("[^0-9]", ""));
        } catch (Exception e) {
            return null;
        }
    }

    private Double parseDouble(String value) {
        try {
            return Double.parseDouble(value.replaceAll("[^0-9.]", ""));
        } catch (Exception e) {
            return null;
        }
    }
}