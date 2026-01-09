package com.scholarassist.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.scholarassist.entity.Profile;
import com.scholarassist.repository.ProfileRepository;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository repo;

    public Profile saveOrUpdate(Profile incoming) {

        Profile profile = repo
                .findByUserId(incoming.getUserId())
                .orElse(new Profile());

        profile.setUserId(incoming.getUserId());
        profile.setFirstName(incoming.getFirstName());
        profile.setLastName(incoming.getLastName());
        profile.setPhone(incoming.getPhone());
        profile.setStreet(incoming.getStreet());
        profile.setCity(incoming.getCity());
        profile.setState(incoming.getState());
        profile.setPincode(incoming.getPincode());
        profile.setInstitution(incoming.getInstitution());
        profile.setCourse(incoming.getCourse());
        profile.setGpa(incoming.getGpa());
        profile.setGraduationYear(incoming.getGraduationYear());
        profile.setTenthPercentage(incoming.getTenthPercentage());
        profile.setTwelfthPercentage(incoming.getTwelfthPercentage());
        profile.setParentIncome(incoming.getParentIncome());
        profile.setCaste(incoming.getCaste());
        profile.setLocality(incoming.getLocality());

        return repo.save(profile);
    }

    public Profile getByUserId(Long userId) {
        return repo.findByUserId(userId).orElse(null);
    }
}
