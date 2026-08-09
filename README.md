# FounderHub – On-Demand Video Streaming Platform

## Overview

FounderHub is an on-demand video streaming platform focused on entrepreneurship and startup-related content.

Entrepreneurs can share their startup experiences, ideas, business journeys, and knowledge through videos. Users can access premium content through subscriptions.

The platform also includes an investor segment where investors can discover startup ideas and express their interest in investing.

## Problem Statement

Entrepreneurs have valuable startup experiences and knowledge, but there is no dedicated platform in this project for sharing such content with users interested in entrepreneurship.

At the same time, aspiring entrepreneurs and investors may find it difficult to discover startup-related content and promising business ideas in one platform.

FounderHub aims to provide a centralized platform for entrepreneurship-focused video content and startup discovery.

## Objectives

- Provide a platform for entrepreneurs to share their experiences through videos.
- Allow users to discover and watch entrepreneurship-related content.
- Provide subscription-based access to premium content.
- Allow users to bookmark videos.
- Provide a platform for investors to discover startup ideas.
- Allow investors to express interest in potential startups.
- Allow entrepreneurs to share business plans with potential investors.

## Main Features

- User registration and login
- User roles and profiles
- Entrepreneur profiles
- Entrepreneurship video upload and management
- Video browsing and viewing
- Subscription management
- Premium video access
- Video bookmarking
- Investor section
- Startup idea discovery
- Investor interest submission
- Business plan sharing
- Session management

## User Roles

### User

- Register and login
- Browse available videos
- Watch videos
- Subscribe to premium content
- Bookmark videos

### Entrepreneur

- Create an entrepreneur profile
- Share startup-related videos
- Upload business plans
- Present startup ideas to potential investors

### Investor

- Explore startup ideas
- View entrepreneur profiles
- Express interest in startups
- Send investment-related messages

## System Architecture

The system follows a layered architecture:

```text
Frontend
    ↓
REST API
    ↓
Service Layer
    ↓
Repository Layer
    ↓
Database
```

## Technology Stack

### Frontend

- HTML
- CSS
- JavaScript

### Backend

- Java
- Spring Boot
- Maven

### Database

- MySQL

### Authentication

- JWT / Session Management

### Tools

- Git
- GitHub
- VS Code

## Database Modules

The main entities in the system are:

- Users
- Entrepreneur Profiles
- Videos
- Subscriptions
- Bookmarks
- Investor Interests
- Sessions
- Business Plans

## Project Structure

```text
Secure-Video-Streaming-Platform/
│
├── docs/
│   └── diagrams/
│       ├── Architecture.png
│       ├── ER_Diagram.png
│       └── Class_Module_Diagram.md
│
├── backend/
│
├── frontend/
│
└── README.md
```

## Future Scope

- Online payment integration
- Advanced video recommendations
- Investor-startup matching
- Video analytics
- Notifications
- Mobile application

## Project Status

Currently in the design and development phase.