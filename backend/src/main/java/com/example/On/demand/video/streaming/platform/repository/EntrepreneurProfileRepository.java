package com.example.On.demand.video.streaming.platform.repository;

import com.example.On.demand.video.streaming.platform.model.entity.EntrepreneurProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EntrepreneurProfileRepository
        extends JpaRepository<EntrepreneurProfile, Integer> {

    Optional<EntrepreneurProfile> findByUserUserId(Integer userId);
}
