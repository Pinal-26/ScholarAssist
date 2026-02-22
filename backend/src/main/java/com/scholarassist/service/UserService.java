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

        if (existingUser.isPresent()) {

            User user = existingUser.get();

            if (user.isEmailVerified()) {
                return "Email already registered";
            }

            String otp = generateOtp();
            user.setOtp(otp);
            user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));

            repository.save(user);
            emailService.sendOtpEmail(user.getEmail(), otp);

            return "New OTP sent to email";
        }

     User user = new User();
    user.setName(request.getName());
    user.setEmail(request.getEmail());
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    user.setRole("USER");

    // ✅ Save college & course
    user.setCollege(request.getCollege());
    user.setCourse(request.getCourse());

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

    // Generate new OTP
    String otp = generateOtp();

    user.setOtp(otp);
    user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));

    repository.save(user);

    // Send OTP again
    emailService.sendOtpEmail(user.getEmail(), otp);

    return user;
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

    // ================= FIND BY EMAIL (needed for firebase) =================
    public User findByEmail(String email) {
        return repository.findByEmail(email).orElse(null);
    }

    public User save(User user) {
        return repository.save(user);
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
                .roles(user.getRole())
                .build();
    }

    private String generateOtp() {
        return String.valueOf(100000 + new Random().nextInt(900000));
    }
    public String forgotPassword(String email) {

    User user = repository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    String otp = generateOtp();

    user.setOtp(otp);
    user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));

    repository.save(user);

    emailService.sendOtpEmail(user.getEmail(), otp);

    return "Password reset OTP sent to email";
}
public String resetPassword(String email, String otp, String newPassword) {

    User user = repository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    if (user.getOtp() == null ||
        user.getOtpExpiry().isBefore(LocalDateTime.now())) {
        return "OTP expired";
    }

    if (!user.getOtp().equals(otp)) {
        return "Invalid OTP";
    }

    user.setPassword(passwordEncoder.encode(newPassword));
    user.setOtp(null);
    user.setOtpExpiry(null);

    repository.save(user);

    return "Password reset successful";
}
}