package com.scholarassist.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scholarassist.dto.LoginRequest;
import com.scholarassist.dto.UserResponse;
import com.scholarassist.entity.User;
import com.scholarassist.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserService userService,
                          PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    // ================= REGISTER =================
   @PostMapping("/register")
public ResponseEntity<?> register(@RequestBody User user) {

    user.setPassword(passwordEncoder.encode(user.getPassword()));

    user.setRole("USER");

    User saved = userService.registerUser(user);

    return ResponseEntity.ok(saved);
}


    // ================= LOGIN =================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {

        User user = userService.login(req.getEmail(), req.getPassword());

        UserResponse res = new UserResponse();
        res.setId(user.getId());
        res.setName(user.getName());
        res.setEmail(user.getEmail());
res.setRole(user.getRole());   
        return ResponseEntity.ok(res);
    }
}
