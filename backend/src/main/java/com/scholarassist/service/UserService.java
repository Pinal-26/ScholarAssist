package com.scholarassist.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.scholarassist.entity.User;
import com.scholarassist.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    // ================= REGISTER =================
    public User registerUser(User user) {
        return repository.save(user);
    }

    // ================= LOGIN =================
    public User login(String email, String rawPassword) {

        Optional<User> optionalUser = repository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = optionalUser.get();

        // ❗ IMPORTANT:
        // Since we removed PasswordEncoder from here,
        // Login verification should be handled by Spring Security.
        // So do NOT manually check password here.

        return user;
    }
public List<User> getAllUsers() {
    return repository.findAll();
}

    // ================= SPRING SECURITY =================
    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        User user = repository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found"));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .roles("USER")
                .build();
    }
}
