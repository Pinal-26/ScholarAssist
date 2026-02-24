package com.scholarassist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.scholarassist.entity.Scholarship;
import java.util.Optional;
public interface ScholarshipRepository extends JpaRepository<Scholarship, Long> {
Optional<Scholarship> findByTitle(String title);}
