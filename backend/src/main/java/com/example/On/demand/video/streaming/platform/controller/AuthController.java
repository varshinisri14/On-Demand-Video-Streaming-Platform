package com.example.On.demand.video.streaming.platform.controller;

import com.example.On.demand.video.streaming.platform.dto.UserResponse;
import com.example.On.demand.video.streaming.platform.model.entity.User;
import com.example.On.demand.video.streaming.platform.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody User user) {

        User registeredUser = userService.registerUser(user);

        UserResponse userResponse = new UserResponse(registeredUser);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", userResponse);
        response.put("message", "User registered successfully");

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}