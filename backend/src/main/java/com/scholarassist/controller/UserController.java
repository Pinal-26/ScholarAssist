package com.scholarassist.controller;

import java.util.Collections;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.scholarassist.dto.LoginRequest;
import com.scholarassist.dto.RegisterRequest;
import com.scholarassist.dto.UserResponse;
import com.scholarassist.entity.User;
import com.scholarassist.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ================= REGISTER =================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(userService.registerUser(request));
    }

    // ================= LOGIN =================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        try {
            User user = userService.login(req.getEmail(), req.getPassword());

            UserResponse res = new UserResponse();
            res.setId(user.getId());
            res.setName(user.getName());
            res.setEmail(user.getEmail());
            res.setRole(user.getRole());
            res.setEmailVerified(user.isEmailVerified());

            return ResponseEntity.ok(res);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(Collections.singletonMap("message", e.getMessage()));
        }
    }

    // ================= FIREBASE LOGIN =================
    @PostMapping("/firebase-login")
    public ResponseEntity<?> firebaseLogin(@RequestBody Map<String, String> request) {
        try {
            String token = request.get("token");

            FirebaseToken decodedToken =
                    FirebaseAuth.getInstance().verifyIdToken(token);

            String email = decodedToken.getEmail();
            String name = decodedToken.getName();

            User user = userService.findByEmail(email);

            if (user == null) {
                user = new User();
                user.setEmail(email);
                user.setName(name);
                user.setRole("USER");
                user.setEmailVerified(true);
                userService.save(user);
            }

            UserResponse res = new UserResponse();
            res.setId(user.getId());
            res.setName(user.getName());
            res.setEmail(user.getEmail());
            res.setRole(user.getRole());
            res.setEmailVerified(true);

            return ResponseEntity.ok(res);

        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Collections.singletonMap("message", "Invalid Firebase token"));
        }
    }

    // ================= VERIFY OTP =================
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(
            @RequestParam String email,
            @RequestParam String otp) {

        try {
            String result = userService.verifyOtp(email, otp);

            if (result.equals("Email verified successfully") ||
                result.equals("Email already verified")) {
                return ResponseEntity.ok(result);
            }

            if (result.equals("Invalid OTP") ||
                result.equals("OTP expired")) {
                return ResponseEntity.status(403).body(result);
            }

            return ResponseEntity.badRequest().body(result);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ================= FORGOT PASSWORD =================
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        return ResponseEntity.ok(userService.forgotPassword(email));
    }

    // ================= RESET PASSWORD =================
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(
            @RequestParam String email,
            @RequestParam String otp,
            @RequestParam String newPassword) {

        return ResponseEntity.ok(
                userService.resetPassword(email, otp, newPassword)
        );
    }

    @PostMapping("/admin-login")
public ResponseEntity<?> adminLogin(@RequestBody LoginRequest req) {

    try {
        User user = userService.login(req.getEmail(), req.getPassword());

        if (!"ADMIN".equalsIgnoreCase(user.getRole())) {
            return ResponseEntity.status(403)
                    .body(Collections.singletonMap("message", "Access denied. Not an admin."));
        }

        if (!user.isEmailVerified()) {
            return ResponseEntity.status(403)
                    .body(Collections.singletonMap("message", "Please verify email first."));
        }

        UserResponse res = new UserResponse();
        res.setId(user.getId());
        res.setName(user.getName());
        res.setEmail(user.getEmail());
        res.setRole(user.getRole());
        res.setEmailVerified(user.isEmailVerified());

        return ResponseEntity.ok(res);

    } catch (RuntimeException e) {
        return ResponseEntity.status(400)
                .body(Collections.singletonMap("message", e.getMessage()));
    }
}

    // ================= GET ALL USERS (ADMIN) =================
@GetMapping("/all")
public ResponseEntity<?> getAllUsers() {

    try {
        return ResponseEntity.ok(userService.getAllUsers());
    } catch (Exception e) {
        return ResponseEntity.badRequest()
                .body(Collections.singletonMap("message", e.getMessage()));
    }
}
}