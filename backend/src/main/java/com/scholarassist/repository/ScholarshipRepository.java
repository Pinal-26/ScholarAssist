package com.scholarassist.repository;

import com.scholarassist.entity.Scholarship;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScholarshipRepository extends JpaRepository<Scholarship, Long> {
}
