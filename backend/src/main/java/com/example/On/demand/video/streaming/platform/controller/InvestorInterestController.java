package com.example.On.demand.video.streaming.platform.controller;

import com.example.On.demand.video.streaming.platform.model.entity.InvestorInterest;
import com.example.On.demand.video.streaming.platform.service.InvestorInterestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/investor-interests")
public class InvestorInterestController {

    private final InvestorInterestService service;

    public InvestorInterestController(InvestorInterestService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<InvestorInterest> createInterest(
            @RequestBody InvestorInterest interest) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.createInterest(interest));
    }

    @GetMapping
    public ResponseEntity<List<InvestorInterest>> getAllInterests() {

        return ResponseEntity.ok(
                service.getAllInterests()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<InvestorInterest> getInterestById(
            @PathVariable Integer id) {

        return ResponseEntity.ok(
                service.getInterestById(id)
        );
    }

    @GetMapping("/investor/{userId}")
    public ResponseEntity<List<InvestorInterest>> getByInvestor(
            @PathVariable Integer userId) {

        return ResponseEntity.ok(
                service.getInterestsByInvestor(userId)
        );
    }

    @GetMapping("/entrepreneur/{entrepreneurId}")
    public ResponseEntity<List<InvestorInterest>> getByEntrepreneur(
            @PathVariable Integer entrepreneurId) {

        return ResponseEntity.ok(
                service.getInterestsByEntrepreneur(entrepreneurId)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<InvestorInterest> updateInterest(
            @PathVariable Integer id,
            @RequestBody InvestorInterest interest) {

        return ResponseEntity.ok(
                service.updateInterest(id, interest)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteInterest(
            @PathVariable Integer id) {

        service.deleteInterest(id);

        return ResponseEntity.ok(
                "Investor interest deleted successfully"
        );
    }
}