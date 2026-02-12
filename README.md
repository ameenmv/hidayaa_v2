# 🕌 Islamic Media Platform (Next-Gen PWA)

![Nuxt 3](https://img.shields.io/badge/Nuxt-3.x-00DC82?style=flat&logo=nuxt.js&logoColor=white)
![Vue 3](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=flat&logo=vue.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

> **The Ultimate Islamic Super-App.** A high-performance, immersive platform combining **Quran TV (Video)**, **Gapless Audio**, and **Smart Reading** in a single Progressive Web App (PWA).

## 🌟 Vision

Our goal is to engineer an "Industrial-Level" Islamic platform that supersedes existing solutions. We are building a **Super-App** where speed, accessibility, and feature depth are unmatched, leveraging **Nuxt 3** for superior SEO and **Video.js** for cinematic playback.

---

## ✨ Key Features

### 📺 Module 1: Quran TV (Visual Experience)
*Powered by mp3quran Video API*
- **Cinematic Recitations:** High-definition video recitations for top Qaris.
- **Immersive Mode:** "Lights off" feature for focused viewing.
- **Picture-in-Picture (PiP):** Watch recitations while browsing other sections of the app.

### 🎧 Module 2: The Audio Engine
- **Gapless Playback:** Zero silence between Ayahs.
- **Global Radio Hub:** Access to 170+ live Islamic radio stations filtered by country.
- **Background Play:** Seamless audio via Service Workers even when the screen is locked.

### 📖 Module 3: The Smart Mushaf
- **Hybrid Rendering:** Crystal clear Uthmanic text sourced from [Quran.com API](https://quran.api-docs.io/).
- **Sync Mode:** Real-time highlighting of verses as they are played (Karaoke style).
- **OLED Dark Mode:** True black theming for battery saving and eye comfort.

---

## 🛠️ Tech Stack

This project is built for **performance** and **scalability**:

- **Core Framework:** [Nuxt 3](https://nuxt.com/) (SSR + Hydration)
- **Language:** JavaScript (ES6+)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + Headless UI
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **Media Player:** Video.js / Howler.js
- **Icons:** Unplugin Icons (Iconify)
- **Target:** PWA (Installable on iOS, Android, Desktop)

### 🔌 APIs Used
1.  **Video & Audio:** `mp3quran.net/api/v3` (The backbone for media).
2.  **Text & Metadata:** `api.quran.com` (For accurate text rendering).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.x or later)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone [https://github.com/your-username/islamic-super-app.git](https://github.com/your-username/islamic-super-app.git)

# Navigate to directory
cd islamic-super-app

# Install dependencies
npm install