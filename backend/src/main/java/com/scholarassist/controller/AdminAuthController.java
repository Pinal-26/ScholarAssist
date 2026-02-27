package com.scholarassist.controller;

import java.util.Collections;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scholarassist.dto.LoginRequest;
import com.scholarassist.dto.UserResponse;
import com.scholarassist.entity.User;
import com.scholarassist.service.UserService;

@RestController
@RequestMapping("/api/admin")
public class AdminAuthController {

    private final UserService userService;

    public AdminAuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> adminLogin(@RequestBody LoginRequest req) throws Exception {

    try {
        User user = userService.login(req.getEmail(), req.getPassword());

        // 🚫 Only ADMIN allowed
        if (!"ADMIN".equalsIgnoreCase(user.getRole())) {
            return ResponseEntity.status(400)
                    .body(Collections.singletonMap("message", "No admin found"));
        }

        // ❌ No email verification check here

        UserResponse res = new UserResponse();
        res.setId(user.getId());
        res.setName(user.getName());
        res.setEmail(user.getEmail());
        res.setRole(user.getRole());
        res.setEmailVerified(user.isEmailVerified()); // optional

        return ResponseEntity.ok(res);

    } catch (RuntimeException e) {
        return ResponseEntity.status(400)
                .body(Collections.singletonMap("message", "No admin found"));
    }
}
}