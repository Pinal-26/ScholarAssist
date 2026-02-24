package com.scholarassist.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "scholarships")
public class Scholarship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ===== BASIC INFO =====
@Column(unique = true)
private String title;
    private String provider;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Integer amount;

    private LocalDate deadline;

    private String type;          // Government / Private / etc.

    private String category;      // General / OBC / SC / ST

    private String applyLink;     // Website link


    // ===== ELIGIBILITY =====
    private Double maxIncome;              // Max parent income

    private Double minPercentage;          // Minimum required %

    private String eligibleCaste;          // General / OBC / SC / ST / ALL

    private String eligibleLocality;       // Gujarat / All India


    // ================= GETTERS & SETTERS =================

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getApplyLink() {
        return applyLink;
    }

    public void setApplyLink(String applyLink) {
        this.applyLink = applyLink;
    }

    public Double getMaxIncome() {
        return maxIncome;
    }

    public void setMaxIncome(Double maxIncome) {
        this.maxIncome = maxIncome;
    }

    public Double getMinPercentage() {
        return minPercentage;
    }

    public void setMinPercentage(Double minPercentage) {
        this.minPercentage = minPercentage;
    }

    public String getEligibleCaste() {
        return eligibleCaste;
    }

    public void setEligibleCaste(String eligibleCaste) {
        this.eligibleCaste = eligibleCaste;
    }

    public String getEligibleLocality() {
        return eligibleLocality;
    }

    public void setEligibleLocality(String eligibleLocality) {
        this.eligibleLocality = eligibleLocality;
    }
}