package com.example.On.demand.video.streaming.platform.service;

import com.example.On.demand.video.streaming.platform.model.entity.InvestorInterest;
import com.example.On.demand.video.streaming.platform.repository.InvestorInterestRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class InvestorInterestService {

    private final InvestorInterestRepository repository;

    public InvestorInterestService(InvestorInterestRepository repository) {
        this.repository = repository;
    }

    public InvestorInterest createInterest(InvestorInterest interest) {

        if (interest.getRequestDate() == null) {
            interest.setRequestDate(LocalDateTime.now());
        }

        if (interest.getStatus() == null) {
            interest.setStatus("PENDING");
        }

        return repository.save(interest);
    }

    public List<InvestorInterest> getAllInterests() {
        return repository.findAll();
    }

    public InvestorInterest getInterestById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Interest not found"));
    }

    public List<InvestorInterest> getInterestsByInvestor(Integer userId) {
        return repository.findByInvestorUserId(userId);
    }

    public List<InvestorInterest> getInterestsByEntrepreneur(Integer entrepreneurId) {
        return repository.findByEntrepreneurEntrepreneurId(entrepreneurId);
    }

    public InvestorInterest updateInterest(
            Integer id,
            InvestorInterest updatedInterest) {

        InvestorInterest interest = getInterestById(id);

        interest.setMessage(updatedInterest.getMessage());
        interest.setStatus(updatedInterest.getStatus());

        return repository.save(interest);
    }

    public void deleteInterest(Integer id) {

        InvestorInterest interest = getInterestById(id);

        repository.delete(interest);
    }
}