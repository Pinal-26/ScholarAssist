package com.scholarassist.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "application_tracking", uniqueConstraints = @UniqueConstraint(columnNames = {"userId", "scholarshipId"}))
public class ApplicationTracking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private Long scholarshipId;

    private String applicationLink;
    
    @Column(name = "applied_date")
    private String appliedDate;

    @Column(nullable = false)
    private String status = "PENDING";

    // ================= GETTERS & SETTERS =================

    public String getAppliedDate() {
    return appliedDate;
    }

    public void setAppliedDate(String appliedDate) {
        this.appliedDate = appliedDate;
    }
    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getScholarshipId() {
        return scholarshipId;
    }

    public void setScholarshipId(Long scholarshipId) {
        this.scholarshipId = scholarshipId;
    }

    public String getApplicationLink() {
        return applicationLink;
    }

    public void setApplicationLink(String applicationLink) {
        this.applicationLink = applicationLink;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}