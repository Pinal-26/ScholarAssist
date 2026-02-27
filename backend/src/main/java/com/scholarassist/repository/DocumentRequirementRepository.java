package com.scholarassist.repository;

import com.scholarassist.entity.DocumentRequirement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRequirementRepository extends JpaRepository<DocumentRequirement, Long> {

    List<DocumentRequirement> findByScholarshipId(Long scholarshipId);
}