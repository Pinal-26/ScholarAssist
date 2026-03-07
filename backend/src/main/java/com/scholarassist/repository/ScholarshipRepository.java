package com.scholarassist.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.scholarassist.entity.Scholarship;

public interface ScholarshipRepository extends JpaRepository<Scholarship, Long> {

Optional<Scholarship> findByTitle(String title);
boolean existsByTitle(String title);

}