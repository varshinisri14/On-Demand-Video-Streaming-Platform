package com.example.On.demand.video.streaming.platform.repository;

import com.example.On.demand.video.streaming.platform.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

}