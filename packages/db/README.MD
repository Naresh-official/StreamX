# 📦 Prisma Schema Overview for StreamX

This section outlines the purpose of each Prisma model used in the **StreamX** backend. These models form the backbone of the application's data layer, covering users, content, engagement, analytics, subscriptions, and more.

---

## 👤 User

Represents an individual who uses the platform, whether as a viewer or a content uploader.  
Each user has unique credentials (email and username), a password hash for secure authentication, and an optional profile picture.  
A user can upload multiple videos and maintain active sessions across devices.

---

## 🔐 Session

Manages user sessions.  
Each session is tied to a user and contains an expiration timestamp, supporting secure session-based authentication.

---

## 🎥 Video

The core content model of StreamX.  
Stores video metadata such as title, description, thumbnail, video URL, duration, visibility (public/private/unlisted), tags, and categories.  
Each video is uploaded by a user and tracks view count.

---

## 🏷️ Tag

Tags are keywords linked to videos to allow flexible categorization and enhanced discoverability.  
Videos and tags share a many-to-many relationship.

---

## 👍 Like

Stores information about which users liked which videos.  
Used to measure engagement and boost popularity signals.

---

## 💬 Comment

Allows users to leave comments on videos.  
Each comment is linked to a user and a video, and includes a timestamp.

---

## 🕒 WatchHistory

Tracks user interactions with videos — including which video was watched, when, and how much progress was made.  
Useful for resuming playback and building recommendation history.

---

## 📚 Category

Categories are high-level groupings (e.g., "Comedy", "Horror") used to organize videos.  
They can be leveraged in recommendation systems and UI filters.

---

## 🧠 UserCategoryPreference

Captures a user’s interest in various categories.  
Each preference includes a `weight` representing the user's affinity for that category, used in personalized recommendations.

---

## 📊 ViewEvent

Logs video view events, optionally including the viewer’s user ID.  
Used in analytics and determining trending or popular content.

---

## 🔍 SearchQuery

Logs user search input to track popular queries and trends.  
This can be used to optimize search relevance and keyword suggestions.

---

## 💼 Subscription

Manages user subscriptions including the selected plan, start and end dates, and whether the subscription is currently active.  
Used to control access to premium features or content.

---

## 💳 Payment

Represents transactions made by users.  
Includes details like the payment amount, currency, date, and status (e.g., pending, completed, failed).

---

## ☁️ UploadSession

Tracks the video upload process from start to finish.  
Stores uploader ID, video title, and status (uploading, processing, ready, or failed).  
Useful for retrying failed uploads and monitoring progress.

---

## 🧾 Enums

### Visibility
Controls who can view a video:
- `PUBLIC`: Everyone can view.
- `PRIVATE`: Only the uploader can view.
- `UNLISTED`: Only accessible via a direct link.

### SubscriptionPlan
Defines the subscription tier for users:
- `FREE`: Basic access.
- `PREMIUM`: Full access to features/content.

### PaymentStatus
Represents the payment lifecycle:
- `PENDING`: Payment started but not completed.
- `COMPLETED`: Payment was successful.
- `FAILED`: Payment failed.

### UploadStatus
Tracks the current state of a video upload:
- `UPLOADING`: Upload in progress.
- `PROCESSING`: Backend is processing/encoding.
- `READY`: Video is live and viewable.
- `FAILED`: Upload or processing failed.

---
