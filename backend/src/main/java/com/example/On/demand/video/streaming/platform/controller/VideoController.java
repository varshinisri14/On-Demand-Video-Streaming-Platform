package com.example.On.demand.video.streaming.platform.controller;

import com.example.On.demand.video.streaming.platform.model.entity.Video;
import com.example.On.demand.video.streaming.platform.service.VideoService;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpRange;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.nio.file.Paths;
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

    @GetMapping("/available")
    public ResponseEntity<List<Video>> getAvailableVideos() {

        return ResponseEntity.ok(
                service.getAllVideos()
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

    @GetMapping("/stream/{id}")
    public ResponseEntity<ResourceRegion> streamVideo(
            @PathVariable Integer id,
            @RequestHeader HttpHeaders headers) {

        Video video = service.getVideoById(id);

        try {

            Path filePath = Paths
                    .get("videos")
                    .resolve(video.getVideoPath())
                    .normalize();

            Resource resource = new UrlResource(
                    filePath.toUri()
            );

            if (!resource.exists()) {
                return ResponseEntity
                        .notFound()
                        .build();
            }

            long contentLength = resource.contentLength();

            List<HttpRange> ranges = headers.getRange();

            ResourceRegion region;

            if (ranges.isEmpty()) {

                region = new ResourceRegion(
                        resource,
                        0,
                        contentLength
                );

            } else {

                HttpRange range = ranges.get(0);

                region = range.toResourceRegion(
                        resource
                );
            }

            return ResponseEntity
                    .status(
                            ranges.isEmpty()
                                    ? HttpStatus.OK
                                    : HttpStatus.PARTIAL_CONTENT
                    )
                    .header(
                            HttpHeaders.ACCEPT_RANGES,
                            "bytes"
                    )
                    .contentType(
                            MediaType.parseMediaType("video/mp4")
                    )
                    .body(region);

        } catch (Exception e) {

            return ResponseEntity
                    .internalServerError()
                    .build();
        }
    }
}