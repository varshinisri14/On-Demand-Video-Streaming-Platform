package com.example.On.demand.video.streaming.platform.model.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "investor_interests")
public class InvestorInterest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "interest_id")
    private Integer interestId;

    @ManyToOne
    @JoinColumn(name = "investor_id")
    private User investor;

    @ManyToOne
    @JoinColumn(name = "entrepreneur_id")
    private EntrepreneurProfile entrepreneur;

    @Column(name = "message")
    private String message;

    @Column(name = "request_date")
    private LocalDateTime requestDate;

    @Column(name = "status")
    private String status;

    public InvestorInterest() {
    }

    public Integer getInterestId() {
        return interestId;
    }

    public void setInterestId(Integer interestId) {
        this.interestId = interestId;
    }

    public User getInvestor() {
        return investor;
    }

    public void setInvestor(User investor) {
        this.investor = investor;
    }

    public EntrepreneurProfile getEntrepreneur() {
        return entrepreneur;
    }

    public void setEntrepreneur(EntrepreneurProfile entrepreneur) {
        this.entrepreneur = entrepreneur;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(LocalDateTime requestDate) {
        this.requestDate = requestDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
