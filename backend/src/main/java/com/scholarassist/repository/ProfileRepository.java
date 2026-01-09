package com.scholarassist.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.scholarassist.entity.Profile;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Optional<Profile> findByUserId(Long userId);
}
