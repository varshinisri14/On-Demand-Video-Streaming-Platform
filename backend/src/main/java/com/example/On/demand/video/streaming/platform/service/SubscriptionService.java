package com.example.On.demand.video.streaming.platform.service;

import com.example.On.demand.video.streaming.platform.model.entity.Subscription;
import com.example.On.demand.video.streaming.platform.repository.SubscriptionRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubscriptionService {

    private final SubscriptionRepository repository;

    public SubscriptionService(SubscriptionRepository repository) {
        this.repository = repository;
    }

    public Subscription createSubscription(Subscription subscription) {
        return repository.save(subscription);
    }

    public List<Subscription> getAllSubscriptions() {
        return repository.findAll();
    }

    public List<Subscription> getSubscriptionsByUser(Integer userId) {
        return repository.findByUserUserId(userId);
    }

    public Subscription getSubscriptionById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Subscription not found"));
    }

    public Subscription updateSubscription(
            Integer id,
            Subscription subscription) {

        getSubscriptionById(id);

        return repository.save(subscription);
    }

    public void deleteSubscription(Integer id) {
        getSubscriptionById(id);

        repository.deleteById(id);
    }
}