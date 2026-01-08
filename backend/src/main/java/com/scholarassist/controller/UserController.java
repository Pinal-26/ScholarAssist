package com.scholarassist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

   @PostMapping("/register")
public ResponseEntity<?> register(@RequestBody User user) {

    System.out.println("REGISTER API HIT");  // 👈 ADD THIS

    User saved = userService.registerUser(user);
    return ResponseEntity.ok(saved);
}




    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest req) {

    User user = userService.login(req.getEmail(), req.getPassword());

    UserResponse res = new UserResponse();
    res.setId(user.getId());
    res.setName(user.getName());
    res.setEmail(user.getEmail());

    return ResponseEntity.ok(res);
}

}
