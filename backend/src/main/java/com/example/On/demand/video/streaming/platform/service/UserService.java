package com.example.On.demand.video.streaming.platform.service;

import com.example.On.demand.video.streaming.platform.model.entity.User;
import com.example.On.demand.video.streaming.platform.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(User user) {
        user.setStatus("ACTIVE");
        user.setCreatedAt(LocalDateTime.now());

        return userRepository.save(user);
    }
}