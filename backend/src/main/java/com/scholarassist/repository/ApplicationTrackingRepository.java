package com.scholarassist.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.scholarassist.entity.ApplicationTracking;

public interface ApplicationTrackingRepository
        extends JpaRepository<ApplicationTracking, Long> {

    long countByStatusIgnoreCase(String status);
List<ApplicationTracking> findByStatus(String status);
List<ApplicationTracking> findByStatusIgnoreCase(String status);

}