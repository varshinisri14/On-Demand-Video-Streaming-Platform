package com.example.On.demand.video.streaming.platform.model.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "entrepreneur_profiles")
public class EntrepreneurProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer entrepreneurId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String startupName;
    private String industry;

    @Column(columnDefinition = "TEXT")
    private String startupDescription;

    private Double fundingGoal;
    private String website;
    private String profileImage;

    public EntrepreneurProfile() {
    }

    public Integer getEntrepreneurId() {
        return entrepreneurId;
    }

    public void setEntrepreneurId(Integer entrepreneurId) {
        this.entrepreneurId = entrepreneurId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getStartupName() {
        return startupName;
    }

    public void setStartupName(String startupName) {
        this.startupName = startupName;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getStartupDescription() {
        return startupDescription;
    }

    public void setStartupDescription(String startupDescription) {
        this.startupDescription = startupDescription;
    }

    public Double getFundingGoal() {
        return fundingGoal;
    }

    public void setFundingGoal(Double fundingGoal) {
        this.fundingGoal = fundingGoal;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }
}
