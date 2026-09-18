package com.example.On.demand.video.streaming.platform.controller;

import com.example.On.demand.video.streaming.platform.model.entity.EntrepreneurProfile;
import com.example.On.demand.video.streaming.platform.service.EntrepreneurProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/entrepreneurs")
public class EntrepreneurProfileController {

    private final EntrepreneurProfileService service;

    public EntrepreneurProfileController(
            EntrepreneurProfileService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<EntrepreneurProfile> createProfile(
            @RequestBody EntrepreneurProfile profile) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.createProfile(profile));
    }

    @GetMapping
    public ResponseEntity<List<EntrepreneurProfile>> getAllProfiles() {
        return ResponseEntity.ok(service.getAllProfiles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EntrepreneurProfile> getProfileById(
            @PathVariable Integer id) {

        return ResponseEntity.ok(service.getProfileById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EntrepreneurProfile> updateProfile(
            @PathVariable Integer id,
            @RequestBody EntrepreneurProfile profile) {

        return ResponseEntity.ok(
                service.updateProfile(id, profile)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProfile(
            @PathVariable Integer id) {

        service.deleteProfile(id);

        return ResponseEntity.ok("Entrepreneur profile deleted successfully");
    }
}