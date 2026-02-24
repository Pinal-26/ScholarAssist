package com.scholarassist.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "saved_scholarships")
public class SavedScholarship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private Long scholarshipId;

    public SavedScholarship() {}

    public SavedScholarship(Long userId, Long scholarshipId) {
        this.userId = userId;
        this.scholarshipId = scholarshipId;
    }

    // getters & setters
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
    
}