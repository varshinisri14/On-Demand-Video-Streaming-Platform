package com.example.On.demand.video.streaming.platform.repository;

import com.example.On.demand.video.streaming.platform.model.entity.Video;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VideoRepository extends JpaRepository<Video, Integer> {

    List<Video> findByEntrepreneurEntrepreneurId(Integer entrepreneurId);

}