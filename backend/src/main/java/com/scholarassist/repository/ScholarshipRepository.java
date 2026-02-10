package com.scholarassist.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.scholarassist.entity.Scholarship;

public interface ScholarshipRepository extends JpaRepository<Scholarship, Long> {
}
