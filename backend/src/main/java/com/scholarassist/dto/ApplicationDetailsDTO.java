package com.scholarassist.dto;

import java.time.LocalDate;

public class ApplicationDetailsDTO {

    private Long id;
    private String scholarshipTitle;
    private Integer amount;
    private LocalDate deadline;
    private String status;

    // ✅ DEFAULT CONSTRUCTOR (IMPORTANT)
    public ApplicationDetailsDTO() {
    }

    // ✅ PARAMETERIZED CONSTRUCTOR (Optional)
    public ApplicationDetailsDTO(Long id,
                                 String scholarshipTitle,
                                 Integer amount,
                                 LocalDate deadline,
                                 String status) {
        this.id = id;
        this.scholarshipTitle = scholarshipTitle;
        this.amount = amount;
        this.deadline = deadline;
        this.status = status;
    }

    // ===== GETTERS & SETTERS =====

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getScholarshipTitle() {
        return scholarshipTitle;
    }

    public void setScholarshipTitle(String scholarshipTitle) {
        this.scholarshipTitle = scholarshipTitle;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}