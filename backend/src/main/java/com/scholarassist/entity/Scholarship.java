package com.scholarassist.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "scholarships")
public class Scholarship {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

private String title;

private String provider;

@Column(columnDefinition = "TEXT")
private String description;

private Integer amount;

private LocalDate deadline;

private String type;

private String category;

@Column(name = "apply_link")
private String applyLink;


// ================= ELIGIBILITY =================

@Column(name = "max_income")
private Double maxIncome;

@Column(name = "min_percentage")
private Double minPercentage;

@Column(name = "eligible_caste")
private String eligibleCaste;

@Column(name = "eligible_locality")
private String eligibleLocality;


// ================= COURSE INFO =================

private String course;

private String quota;

@Column(name = "hostel_amount")
private Integer hostelAmount;

@Column(name = "tuition_support")
private Integer tuitionSupport;

@Column(name = "medical_support")
private Integer medicalSupport;


// ================= NEW ELIGIBILITY =================

@Column(name = "min_cgpa")
private Double minCgpa;

@Column(name = "min_tenth_percentage")
private Double minTenthPercentage;

@Column(name = "min_twelfth_percentage")
private Double minTwelfthPercentage;

@Column(name = "field")
private String field;



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

public String getCourse() {
    return course;
}

public void setCourse(String course) {
    this.course = course;
}

public String getQuota() {
    return quota;
}

public void setQuota(String quota) {
    this.quota = quota;
}

public Integer getHostelAmount() {
    return hostelAmount;
}

public void setHostelAmount(Integer hostelAmount) {
    this.hostelAmount = hostelAmount;
}

public Integer getTuitionSupport() {
    return tuitionSupport;
}

public void setTuitionSupport(Integer tuitionSupport) {
    this.tuitionSupport = tuitionSupport;
}

public Integer getMedicalSupport() {
    return medicalSupport;
}

public void setMedicalSupport(Integer medicalSupport) {
    this.medicalSupport = medicalSupport;
}

public Double getMinCgpa() {
    return minCgpa;
}

public void setMinCgpa(Double minCgpa) {
    this.minCgpa = minCgpa;
}

public Double getMinTenthPercentage() {
    return minTenthPercentage;
}

public void setMinTenthPercentage(Double minTenthPercentage) {
    this.minTenthPercentage = minTenthPercentage;
}

public Double getMinTwelfthPercentage() {
    return minTwelfthPercentage;
}

public void setMinTwelfthPercentage(Double minTwelfthPercentage) {
    this.minTwelfthPercentage = minTwelfthPercentage;
}

public String getField() {
    return field;
}

public void setField(String field) {
    this.field = field;
}

}