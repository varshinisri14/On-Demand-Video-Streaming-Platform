package com.example.On.demand.video.streaming.platform.controller;

import com.example.On.demand.video.streaming.platform.model.entity.Video;
import com.example.On.demand.video.streaming.platform.service.VideoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/videos")
public class VideoController {

    private final VideoService service;

    public VideoController(VideoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Video> createVideo(
            @RequestBody Video video) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.createVideo(video));
    }

    @GetMapping
    public ResponseEntity<List<Video>> getAllVideos() {

        return ResponseEntity.ok(
                service.getAllVideos()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Video> getVideoById(
            @PathVariable Integer id) {

        return ResponseEntity.ok(
                service.getVideoById(id)
        );
    }

    @GetMapping("/entrepreneur/{entrepreneurId}")
    public ResponseEntity<List<Video>> getVideosByEntrepreneur(
            @PathVariable Integer entrepreneurId) {

        return ResponseEntity.ok(
                service.getVideosByEntrepreneur(entrepreneurId)
        );
    }

    @GetMapping("/approved")
    public ResponseEntity<List<Video>> getApprovedVideos() {

        return ResponseEntity.ok(
                service.getApprovedVideos()
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Video> updateVideo(
            @PathVariable Integer id,
            @RequestBody Video video) {

        return ResponseEntity.ok(
                service.updateVideo(id, video)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteVideo(
            @PathVariable Integer id) {

        service.deleteVideo(id);

        return ResponseEntity.ok(
                "Video deleted successfully"
        );
    }
}