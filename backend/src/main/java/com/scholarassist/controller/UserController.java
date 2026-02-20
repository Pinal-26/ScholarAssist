package com.scholarassist.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

        String response = userService.registerUser(request);

        return ResponseEntity.ok(response);
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
        return ResponseEntity.badRequest().body(
            java.util.Collections.singletonMap("message", e.getMessage())
        );
    }
}

    // ================= VERIFY OTP =================
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestParam String email,
                                       @RequestParam String otp) {

        String response = userService.verifyOtp(email, otp);

        return ResponseEntity.ok(response);
    }

    // ================= GET ALL USERS =================
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}