package com.example.On.demand.video.streaming.platform.service;

import com.example.On.demand.video.streaming.platform.model.entity.Video;
import com.example.On.demand.video.streaming.platform.repository.VideoRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class VideoService {

    private final VideoRepository repository;

    public VideoService(VideoRepository repository) {
        this.repository = repository;
    }

    public Video createVideo(Video video) {

        if (video.getUploadDate() == null) {
            video.setUploadDate(LocalDateTime.now());
        }

        return repository.save(video);
    }

    public List<Video> getAllVideos() {
        return repository.findAll();
    }

    public Video getVideoById(Integer id) {

        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Video not found"));
    }

    public List<Video> getVideosByEntrepreneur(Integer entrepreneurId) {

        return repository.findByEntrepreneurEntrepreneurId(entrepreneurId);
    }

    public Video updateVideo(Integer id, Video updatedVideo) {

        Video video = getVideoById(id);

        video.setTitle(updatedVideo.getTitle());
        video.setDescription(updatedVideo.getDescription());
        video.setCategory(updatedVideo.getCategory());
        video.setThumbnail(updatedVideo.getThumbnail());
        video.setVideoPath(updatedVideo.getVideoPath());

        return repository.save(video);
    }

    public void deleteVideo(Integer id) {

        Video video = getVideoById(id);

        repository.delete(video);
    }
}