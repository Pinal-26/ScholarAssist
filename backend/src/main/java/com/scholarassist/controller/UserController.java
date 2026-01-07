package com.scholarassist.controller;

import org.springframework.beans.factory.annotation.Autowired;
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
public UserResponse register(@RequestBody User user) {

    User saved = userService.registerUser(user);

    UserResponse res = new UserResponse();
    res.setId(saved.getId());
    res.setName(saved.getName());
    res.setEmail(saved.getEmail());

    return res;
}


    @PostMapping("/login")
    public User login(@RequestBody LoginRequest request) {
        return userService.login(request.getEmail(), request.getPassword());
    }
}
