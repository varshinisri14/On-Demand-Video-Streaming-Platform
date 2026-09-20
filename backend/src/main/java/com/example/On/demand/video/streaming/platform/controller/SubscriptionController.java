package com.example.On.demand.video.streaming.platform.controller;

import com.example.On.demand.video.streaming.platform.model.entity.Subscription;
import com.example.On.demand.video.streaming.platform.service.SubscriptionService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {

    private final SubscriptionService service;

    public SubscriptionController(SubscriptionService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Subscription> createSubscription(
            @RequestBody Subscription subscription) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.createSubscription(subscription));
    }

    @GetMapping
    public ResponseEntity<List<Subscription>> getAllSubscriptions() {

        return ResponseEntity.ok(
                service.getAllSubscriptions()
        );
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Subscription>> getSubscriptionsByUser(
            @PathVariable Integer userId) {

        return ResponseEntity.ok(
                service.getSubscriptionsByUser(userId)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Subscription> getSubscriptionById(
            @PathVariable Integer id) {

        return ResponseEntity.ok(
                service.getSubscriptionById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Subscription> updateSubscription(
            @PathVariable Integer id,
            @RequestBody Subscription subscription) {

        return ResponseEntity.ok(
                service.updateSubscription(id, subscription)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSubscription(
            @PathVariable Integer id) {

        service.deleteSubscription(id);

        return ResponseEntity.ok(
                "Subscription deleted successfully"
        );
    }
}