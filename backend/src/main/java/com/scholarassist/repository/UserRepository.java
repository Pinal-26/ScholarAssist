package com.scholarassist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.scholarassist.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
