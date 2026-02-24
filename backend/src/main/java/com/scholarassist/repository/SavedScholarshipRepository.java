package com.scholarassist.repository;

import com.scholarassist.entity.SavedScholarship;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;
import java.util.Optional;

public interface SavedScholarshipRepository extends JpaRepository<SavedScholarship, Long> {

    List<SavedScholarship> findByUserId(Long userId);

    Optional<SavedScholarship> findByUserIdAndScholarshipId(Long userId, Long scholarshipId);

    @Modifying
    @Transactional
    void deleteByUserIdAndScholarshipId(Long userId, Long scholarshipId);
}