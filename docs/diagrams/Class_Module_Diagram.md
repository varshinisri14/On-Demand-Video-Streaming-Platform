# FounderHub Class / Module Diagram

```mermaid
classDiagram

class User {
    +userId
    +fullName
    +email
    +password
    +phone
    +role
}

class EntrepreneurProfile {
    +entrepreneurId
    +startupName
    +industry
    +startupDescription
    +fundingGoal
}

class Video {
    +videoId
    +title
    +description
    +category
    +videoPath
    +approvalStatus
}

class Subscription {
    +subscriptionId
    +planName
    +amount
    +startDate
    +endDate
    +status
}

class Bookmark {
    +bookmarkId
    +bookmarkedAt
}

class InvestorInterest {
    +interestId
    +message
    +requestDate
    +status
}

class BusinessPlan {
    +planId
    +filePath
    +uploadedAt
}

class Session {
    +sessionId
    +deviceId
    +loginTime
    +logoutTime
    +sessionStatus
}

User "1" --> "0..1" EntrepreneurProfile
EntrepreneurProfile "1" --> "*" Video
User "1" --> "*" Subscription
User "1" --> "*" Bookmark
Bookmark "*" --> "1" Video
User "1" --> "*" InvestorInterest
EntrepreneurProfile "1" --> "*" InvestorInterest
EntrepreneurProfile "1" --> "*" BusinessPlan
User "1" --> "*" Session
```s