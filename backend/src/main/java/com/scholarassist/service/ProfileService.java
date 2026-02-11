package com.scholarassist.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.scholarassist.entity.Profile;
import com.scholarassist.repository.ProfileRepository;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    public Profile saveProfile(Profile profile) {

        Optional<Profile> existing =
                profileRepository.findByUserId(profile.getUserId());

        if (existing.isPresent()) {
            Profile oldProfile = existing.get();
            profile.setId(oldProfile.getId()); // IMPORTANT for update
        }

        return profileRepository.save(profile);
    }

    public Profile getProfileByUserId(Long userId) {
        return profileRepository.findByUserId(userId).orElse(null);
    }
}
