package com.scholarassist.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.scholarassist.dto.RegisterRequest;
import com.scholarassist.entity.User;
import com.scholarassist.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository repository;
    private final EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository repository,
                       EmailService emailService) {
        this.repository = repository;
        this.emailService = emailService;
    }

    // ================= REGISTER =================
    public String registerUser(RegisterRequest request) {

        Optional<User> existingUser =
                repository.findByEmail(request.getEmail());

        // If user already exists
        if (existingUser.isPresent()) {

            User user = existingUser.get();

            // If already verified
            if (user.isEmailVerified()) {
                return "Email already registered";
            }

            // If not verified → resend OTP
            String otp = generateOtp();

            user.setOtp(otp);
            user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));

            repository.save(user);
            emailService.sendOtpEmail(user.getEmail(), otp);

            return "New OTP sent to email";
        }

        // Create new user
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("USER");

        String otp = generateOtp();

        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));
        user.setEmailVerified(false);

        repository.save(user);
        emailService.sendOtpEmail(user.getEmail(), otp);

        return "OTP sent to email";
    }

    // ================= LOGIN =================
    public User login(String email, String rawPassword) {

        User user = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        if (!user.isEmailVerified()) {
            throw new RuntimeException("Please verify your email first");
        }

        return user;
    }

    // ================= VERIFY OTP =================
    public String verifyOtp(String email, String otp) {

        User user = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.isEmailVerified()) {
            return "Email already verified";
        }

        if (user.getOtp() == null ||
            user.getOtpExpiry().isBefore(LocalDateTime.now())) {
            return "OTP expired";
        }

        if (!user.getOtp().equals(otp)) {
            return "Invalid OTP";
        }

        user.setEmailVerified(true);
        user.setOtp(null);
        user.setOtpExpiry(null);

        repository.save(user);

        return "Email verified successfully";
    }

    // ================= GET ALL USERS =================
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
                .roles(user.getRole())
                .build();
    }

    // ================= OTP GENERATOR =================
    private String generateOtp() {
        return String.valueOf(100000 + new Random().nextInt(900000));
    }
}