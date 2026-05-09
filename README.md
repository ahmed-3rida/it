<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=32&pause=1000&color=6366F1&center=true&vCenter=true&width=600&lines=UniSkills+Social;Advanced+Web+Platform" alt="Typing SVG" />

<br/>

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<p align="center">
  <b>A professional, feature-rich community platform built with Vanilla JavaScript and Modular CSS Architecture.</b><br/>
  Designed and developed by a team of 6 engineers — <i>HNU University, Semester 4 Project</i>.
</p>

[🚀 Live Demo](#) · [📖 Documentation](#-architecture) · [🐛 Report Bug](../../issues) · [💡 Request Feature](../../issues)

---

</div>

## 📸 Preview

> _Screenshots or a GIF of the running app go here._

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Advanced Auth** | Complete login & registration system with persistent sessions |
| 📰 **Dynamic Feed** | Posts and polls sorted chronologically in real-time |
| 📊 **Interactive Polls** | Create, vote, and view live results directly in the feed |
| 🗂 **Modular Dashboard** | Dedicated panels for users and administrators |
| 🌐 **Multi-Language** | Real-time language switching (Arabic / English) |
| 🎨 **Premium UI/UX** | Glassmorphism effects, micro-animations & responsive layouts |
| 💬 **Private Messaging** | Real-time chat interface between users |
| 🔍 **Global Search** | Search and discover users, posts, and categories |
| 📈 **Trending Analytics** | Hot topics and real-time content analytics |
| 🛡 **Admin Control Panel** | Full platform management, moderation, and metrics |

---

## 🏗 Architecture

The project follows a **Modular Design Pattern** — each feature is isolated in its own directory with its own logic and styles, while sharing a common core for consistency.

```
V2/
├── 📂 admin_dashboard/     # Administrative control panel
├── 📂 ads/                 # Ad management system
├── 📂 categories/          # Content categorization
├── 📂 chat/                # Private messaging system
├── 📂 create_post/         # Content creation engine
├── 📂 create_thread/       # Community discussion builder
├── 📂 edit_profile/        # Profile customization
├── 📂 home/                # Main interactive feed
├── 📂 login_register/      # User authentication
├── 📂 notifications/       # Real-time alert system
├── 📂 polls/               # Interactive polling system
├── 📂 privacy_settings/    # User security & privacy
├── 📂 profile/             # Public user profiles
├── 📂 search/              # Global search & discovery
├── 📂 trending/            # Hot topics & analytics
├── 📂 user_dashboard/      # Personal user analytics
├── 📄 shared.js            # Core platform logic & helpers
└── 📄 shared.css           # Global design system & tokens
```

---

## 🛠 Tech Stack

- **HTML5** — Semantic structure and modern web standards
- **CSS3** — Flexbox/Grid layouts, CSS Variables, Glassmorphism
- **JavaScript ES6+** — Modular logic, DOM Manipulation, Event-driven architecture
- **localStorage API** — Client-side data persistence (no backend required)

---

## 🚀 Getting Started

### Prerequisites

All you need is a modern browser — no installation required.

### Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/ahmed-3rida/it.git

# 2. Navigate into the project
cd it/V2

# 3. Open the app
# Simply open home/index.html in your browser
```

> **Tip:** Use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) VS Code extension for a better local development experience.

---

## 👥 Team

This project is the result of a collaborative effort by a dedicated team of **6 developers**.

<table>
  <tr>
    <td align="center">
      <b>👑 Ahmed Salman Hameed</b><br/>
      <i>Team Leader</i><br/>
      <sub>Core Logic · Authentication · Home Feed · Ads</sub><br/>
      <sub><code>shared.js</code> · <code>login_register/</code> · <code>home/</code> · <code>ads/</code></sub>
    </td>
    <td align="center">
      <b>Kareem Ayman Bakr</b><br/>
      <i>Navigation & Alerts</i><br/>
      <sub>Categories · Notifications</sub><br/>
      <sub><code>categories/</code> · <code>notifications/</code></sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <b>Abdelrahman Mohamed Khairy</b><br/>
      <i>Discovery & Privacy</i><br/>
      <sub>Trending · Search · Privacy Settings</sub><br/>
      <sub><code>trending/</code> · <code>search/</code> · <code>privacy_settings/</code></sub>
    </td>
    <td align="center">
      <b>Youssef Safwat Arnest</b><br/>
      <i>Operations & Identity</i><br/>
      <sub>Admin Panel · Moderation · Profile</sub><br/>
      <sub><code>admin_dashboard/</code> · <code>moderation/</code> · <code>profile/</code> · <code>edit_profile/</code></sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <b>Youssef Mohamed Mohamed</b><br/>
      <i>Content & Analytics</i><br/>
      <sub>Posts · Threads · User Dashboard</sub><br/>
      <sub><code>create_post/</code> · <code>create_thread/</code> · <code>user_dashboard/</code></sub>
    </td>
    <td align="center">
      <b>Mostafa Taher Helmy</b><br/>
      <i>Design & Interaction</i><br/>
      <sub>Core Design · Polls Engine · Chat</sub><br/>
      <sub><code>shared.css</code> · <code>polls/</code> · <code>chat/</code></sub>
    </td>
  </tr>
</table>

---

## 📚 Study Guide

> Each team member is responsible for specific modules for the project defense.

| Team Member | Responsibility | Files |
|:---|:---|:---|
| Ahmed Salman Hameed | Core Logic, Auth, Feed & Ads | `shared.js`, `login_register/*`, `home/*`, `ads/*` |
| Kareem Ayman Bakr | Community & Alerts | `categories/*`, `notifications/*` |
| Abdelrahman M. Khairy | Discovery & Privacy | `trending/*`, `search/*`, `privacy_settings/*` |
| Youssef Safwat Arnest | Administration & Identity | `admin_dashboard/*`, `moderation/*`, `profile/*`, `edit_profile/*` |
| Youssef Mohamed M. | Content & User Analytics | `create_post/*`, `create_thread/*`, `user_dashboard/*` |
| Mostafa Taher Helmy | Core Design & Interaction | `shared.css`, `polls/*`, `chat/*` |

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">

**Developed for HNU University — Semester 4 Project** 🎓

<sub>Made with ❤️ by the UniSkills Social Team</sub>

</div>