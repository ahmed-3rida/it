# 🌐 Social Forum V2 - Advanced Web Platform

A professional, feature-rich Social Media Forum built with cutting-edge front-end technologies. This platform provides a seamless user experience for community interaction, content sharing, and real-time engagement, all within a stunning dark-themed modern interface.

---

## 🚀 Project Overview

The **Social Forum** is a lightweight yet powerful community platform designed to demonstrate the power of **Vanilla JavaScript** and **Modular CSS Architecture**. It features a robust dynamic content system, multi-language support, and a complete administrative ecosystem without the need for complex back-end frameworks, utilizing `localStorage` for high-performance data persistence.

### ✨ Key Features
- **Dynamic Feed**: Integrated posts and polls sorted chronologically.
- **Advanced Auth**: Complete login and registration system with persistent sessions.
- **Interactive Polls**: Create, vote, and see real-time results directly in the feed.
- **Modular Dashboard**: Dedicated panels for users and administrators.
- **Global Settings**: Real-time language switching (AR/EN) and privacy controls.
- **Premium UI/UX**: Glassmorphism effects, smooth micro-animations, and responsive layouts.

---

## 🏗️ Project Architecture

The project follows a **Modular Design Pattern**, where each feature is isolated in its own directory with its own logic and styles, while sharing a common core for consistency.

```text
V2/
├── 📂 admin_dashboard/   # Administrative control panel
├── 📂 ads/               # Ad management system
├── 📂 categories/        # Content categorization
├── 📂 chat/              # Private messaging system
├── 📂 create_post/       # Content creation engine
├── 📂 create_thread/     # Community discussion builder
├── 📂 edit_profile/      # Profile customization
├── 📂 home/              # Main interactive feed
├── 📂 login_register/    # User authentication
├── 📂 notifications/     # Real-time alert system
├── 📂 polls/             # Interactive polling system
├── 📂 privacy_settings/  # User security & privacy
├── 📂 profile/           # Public user profiles
├── 📂 search/            # Global search & discovery
├── 📂 trending/          # Hot topics & analytics
├── 📂 user_dashboard/    # Personal user analytics
├── 📄 shared.js          # Core platform logic & helpers
└── 📄 shared.css         # Global design system & tokens
```

---

## 👥 Team Distribution & Responsibilities

This project is the result of a collaborative effort by a dedicated team of 6 developers. Each member is responsible for specific modules, ensuring end-to-end functionality and design integrity.

### 👑 Team Leader
**Ahmed Salman Hameed**
- **Core Platform Logic**: Main infrastructure and helper functions (`shared.js`).
- **Authentication**: User security and access control system (`login_register`).
- **Main Feed**: Core user experience and chronical feed logic (`home`).
- **Monetization**: Ad integration and management system (`ads`).

---

### 🛠️ Development Team

#### **Kareem Ayman Bakr**
*Navigation & Alerts*
- **Community Hub**: Structure and layout of forum categories (`categories`).
- **Alert System**: Global notification system for user events (`notifications`).

#### **Abdelrahman Mohamed Khairy**
*Discovery & Privacy*
- **Analytics**: Real-time trending topics and hot content logic (`trending`).
- **Navigation**: Global search engine and user discovery system (`search`).
- **Security**: Granular privacy controls and account settings (`privacy_settings`).

#### **Youssef Safwat Arnest**
*Operations & Identity*
- **Admin Panel**: Global platform management and metrics (`admin_dashboard`).
- **Governance**: Content moderation and reporting tools (`moderation`).
- **User Identity**: Public profile rendering and profile editing (`profile`, `edit_profile`).

#### **Youssef Mohamed Mohamed**
*Content Generation & Analytics*
- **Feed Content**: Advanced post creation with media support (`create_post`).
- **Discussions**: Thread management and hierarchical comment logic (`create_thread`).
- **User Insights**: Personal dashboard for tracking user activity (`user_dashboard`).

#### **Mostafa Taher Helmy**
*Interactive Engagement & Style*
- **Core Design**: Global design system, tokens, and animations (`shared.css`).
- **Polls Engine**: Voting logic, result calculation, and poll creation (`polls`).
- **Real-time Chat**: Private messaging interface and message handling (`chat`).

---

---

## 📚 Study Guide (Team Assignment Table)

This table maps each team member to the specific files they are responsible for studying and defending.

| Team Member | Module / Responsibility | Files to Study |
| :--- | :--- | :--- |
| **Ahmed Salman Hameed** | Core Logic, Auth, Feed & Ads | `shared.js`, `login_register/*`, `home/*`, `ads/*` |
| **Kareem Ayman Bakr** | Community & Alerts | `categories/*`, `notifications/*` |
| **Abdelrahman M. Khairy** | Discovery & Privacy | `trending/*`, `search/*`, `privacy_settings/*` |
| **Youssef Safwat Arnest** | Administration & Identity | `admin_dashboard/*`, `moderation/*`, `profile/*`, `edit_profile/*` |
| **Youssef Mohamed M.** | Content & User Analytics | `create_post/*`, `create_thread/*`, `user_dashboard/*` |
| **Mostafa Taher Helmy** | Core Design & Interaction | `shared.css`, `polls/*`, `chat/*` |

---

## 🛠️ Technologies Used
- **HTML5**: Semantic structure and modern web standards.
- **CSS3**: Advanced layouts (Flexbox/Grid), Variables, and Glassmorphism.
- **JavaScript (ES6+)**: Modular logic, DOM Manipulation, and Event-driven architecture.
- **Local Persistence**: `localStorage` API for client-side database management.

---

## 📸 Screenshots
*(Add your stunning screenshots here)*

---

## 📜 How to Run
1. Clone the repository: `git clone https://github.com/ahmed-3rida/it.git`
2. Open `home/index.html` in any modern web browser.
3. Enjoy the experience!

---

**Developed for HNU University - Semester 4 Project**
