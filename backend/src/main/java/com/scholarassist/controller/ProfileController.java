package com.scholarassist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scholarassist.entity.Notification;
import com.scholarassist.entity.Profile;
import com.scholarassist.repository.NotificationRepository;
import com.scholarassist.service.ProfileService;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:5173")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @Autowired
    private NotificationRepository notificationRepository;
    
    @PostMapping
    public Profile saveProfile(@RequestBody Profile profile) {
        return profileService.saveProfile(profile);
    }

 @GetMapping("/{userId}")
public ResponseEntity<?> getProfile(@PathVariable Long userId) {

    Profile profile = profileService.getProfileByUserId(userId);

    if (profile == null) {
        return ResponseEntity.ok().body(null);
    }
if(profile.getParentIncome() == null ||
   profile.getCaste() == null ||
   profile.getCourse() == null) {

    notificationRepository.save(
        new Notification(
            userId,
            "⚠ Your profile is incomplete. Complete it to get accurate recommendations."
        )
    );
}
    return ResponseEntity.ok(profile);
}

}
