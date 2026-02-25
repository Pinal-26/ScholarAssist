package com.scholarassist.controller;

import com.scholarassist.entity.SavedScholarship;
import com.scholarassist.repository.SavedScholarshipRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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