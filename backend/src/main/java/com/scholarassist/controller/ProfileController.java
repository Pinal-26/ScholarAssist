package com.scholarassist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scholarassist.entity.Profile;
import com.scholarassist.service.ProfileService;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:5173")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    // ✅ GET PROFILE BY USER ID
    @GetMapping("/{userId}")
    public Profile getProfile(@PathVariable Long userId) {
        return profileService.getByUserId(userId);
    }

    // ✅ SAVE / UPDATE PROFILE
    @PostMapping
    public Profile saveProfile(@RequestBody Profile profile) {
        return profileService.saveOrUpdate(profile);
    }
}
