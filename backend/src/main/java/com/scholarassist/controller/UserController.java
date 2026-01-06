package com.scholarassist.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.scholarassist.entity.User;
import com.scholarassist.repository.UserRepository;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository repo;

    public UserController(UserRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public User addUser(@RequestBody User user) {
        return repo.save(user);
    }

    @GetMapping
    public List<User> getUsers() {
        return repo.findAll();
    }
}
