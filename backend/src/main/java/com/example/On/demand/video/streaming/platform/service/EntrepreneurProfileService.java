package com.example.On.demand.video.streaming.platform.service;

import com.example.On.demand.video.streaming.platform.model.entity.EntrepreneurProfile;
import com.example.On.demand.video.streaming.platform.repository.EntrepreneurProfileRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EntrepreneurProfileService {

    private final EntrepreneurProfileRepository repository;

    public EntrepreneurProfileService(EntrepreneurProfileRepository repository) {
        this.repository = repository;
    }

    public EntrepreneurProfile createProfile(EntrepreneurProfile profile) {
        return repository.save(profile);
    }

    public List<EntrepreneurProfile> getAllProfiles() {
        return repository.findAll();
    }

    public EntrepreneurProfile getProfileById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entrepreneur profile not found"));
    }

    public EntrepreneurProfile updateProfile(
            Integer id,
            EntrepreneurProfile updatedProfile) {

        EntrepreneurProfile profile = getProfileById(id);

        profile.setStartupName(updatedProfile.getStartupName());
        profile.setIndustry(updatedProfile.getIndustry());
        profile.setStartupDescription(updatedProfile.getStartupDescription());
        profile.setFundingGoal(updatedProfile.getFundingGoal());
        profile.setWebsite(updatedProfile.getWebsite());
        profile.setProfileImage(updatedProfile.getProfileImage());

        return repository.save(profile);
    }

    public void deleteProfile(Integer id) {
        EntrepreneurProfile profile = getProfileById(id);
        repository.delete(profile);
    }
}