package com.scholarassist.dto;

import java.time.LocalDate;

public class ExternalScholarshipDTO {

    private String title;
    private Double amount;
    private LocalDate deadline;
    private String provider;
    private String type;
    private String website;
    private String description;
    private Eligibility eligibility;

    public static class Eligibility {
        private Double maxIncome;
        private String category;
        private String gender;
        private Double minPercentage;
        private String state;

        // getters & setters
        public Double getMaxIncome() { return maxIncome; }
        public void setMaxIncome(Double maxIncome) { this.maxIncome = maxIncome; }

        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }

        public String getGender() { return gender; }
        public void setGender(String gender) { this.gender = gender; }

        public Double getMinPercentage() { return minPercentage; }
        public void setMinPercentage(Double minPercentage) { this.minPercentage = minPercentage; }

        public String getState() { return state; }
        public void setState(String state) { this.state = state; }
    }

    // getters & setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public LocalDate getDeadline() { return deadline; }
    public void setDeadline(LocalDate deadline) { this.deadline = deadline; }

    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Eligibility getEligibility() { return eligibility; }
    public void setEligibility(Eligibility eligibility) { this.eligibility = eligibility; }
}