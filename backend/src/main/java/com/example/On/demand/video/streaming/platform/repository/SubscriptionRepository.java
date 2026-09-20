package com.example.On.demand.video.streaming.platform.repository;

import com.example.On.demand.video.streaming.platform.model.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubscriptionRepository extends JpaRepository<Subscription, Integer> {

    List<Subscription> findByUserUserId(Integer userId);
}