package com.scholarassist.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scholarassist.entity.SavedScholarship;
import com.scholarassist.repository.SavedScholarshipRepository;

@RestController
@RequestMapping("/api/saved")
public class SavedScholarshipController {

    private final SavedScholarshipRepository repository;

    public SavedScholarshipController(SavedScholarshipRepository repository) {
        this.repository = repository;
    }

    // SAVE
   @PostMapping
public SavedScholarship save(@RequestBody SavedScholarship saved) {

    System.out.println("Saving scholarship: " + saved.getScholarshipId());

    return repository.findByUserIdAndScholarshipId(
            saved.getUserId(),
            saved.getScholarshipId()
    ).orElseGet(() -> repository.save(saved));
}
    // GET BY USER
    @GetMapping("/{userId}")
    public List<SavedScholarship> getByUser(@PathVariable Long userId) {
        return repository.findByUserId(userId);
    }

    // REMOVE
    @DeleteMapping("/{userId}/{scholarshipId}")
    public void delete(@PathVariable Long userId,
                       @PathVariable Long scholarshipId) {

        repository.deleteByUserIdAndScholarshipId(userId, scholarshipId);
    }
}