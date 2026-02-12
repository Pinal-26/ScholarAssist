package com.scholarassist.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.scholarassist.entity.ApplicationTracking;

public interface ApplicationTrackingRepository extends JpaRepository<ApplicationTracking, Long> {

    List<ApplicationTracking> findByUserId(Long userId);

    boolean existsByUserIdAndScholarshipId(Long userId, Long scholarshipId);

    @Query("SELECT new map(" +
       "s.category as scholarship, " +
       "s.amount as amount, " +
       "s.deadline as deadline, " +
       "a.appliedDate as appliedDate, " +
       "a.status as status) " +
       "FROM ApplicationTracking a JOIN a.scholarship s " +
       "WHERE a.user.id = :userId")
List<Map<String, Object>> getUserApplications(@Param("userId") Long userId);

}
