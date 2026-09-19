package com.example.On.demand.video.streaming.platform.repository;

import com.example.On.demand.video.streaming.platform.model.entity.InvestorInterest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvestorInterestRepository
        extends JpaRepository<InvestorInterest, Integer> {

    List<InvestorInterest> findByInvestorUserId(Integer userId);

    List<InvestorInterest> findByEntrepreneurEntrepreneurId(Integer entrepreneurId);
}