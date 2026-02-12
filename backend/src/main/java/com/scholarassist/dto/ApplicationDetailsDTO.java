package com.scholarassist.dto;

import java.time.LocalDate;

public class ApplicationDetailsDTO {

    private Long id;
    private String title;
    private Integer amount;
    private LocalDate deadline;
    private LocalDate appliedDate;
    private String status;

    public ApplicationDetailsDTO(Long id,
                                 String title,
                                 Integer amount,
                                 LocalDate deadline,
                                 LocalDate appliedDate,
                                 String status) {
        this.id = id;
        this.title = title;
        this.amount = amount;
        this.deadline = deadline;
        this.appliedDate = appliedDate;
        this.status = status;
    }

    // ===== GETTERS =====

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Integer getAmount() {
        return amount;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public LocalDate getAppliedDate() {
        return appliedDate;
    }

    public String getStatus() {
        return status;
    }
}
