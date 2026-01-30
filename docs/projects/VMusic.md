---
id: VMusic
title: VMusic
sidebar_label: VMusic
---


# <img src="/img/VMusic/icon.png" alt="VMusic Icon" width="50"/> VMusic

### Demo

<video width="50%" controls>
  <source src="/img/VMusic/demo.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

## VMusic: High-Performance Cross-Platform Media Solution

**VMusic** is a sophisticated, high-performance mobile application built with **React Native** and **Expo**, designed to provide users with a seamless, local-first music management experience. Engineered for both **iOS** and **Android**, VMusic bridges the gap between high-speed cloud media discovery and robust offline playback.

---

### Core Features & Capabilities

* **Intelligent Media Discovery**: Integrates with specialized APIs to search and identify high-quality audio streams globally.
* **Offline-First Architecture**: Features a robust download pipeline that converts and stores media locally, ensuring playback availability regardless of network status.
* **Advanced Metadata Management**: Automatically parses and hydrates track information, including artist names, high-resolution artwork, and album titles.
* **Dynamic Playback Queue**: Utilizes a customized reordering system with haptic feedback and smooth drag-and-drop gestures for real-time queue manipulation.
* **Persistence & Sync**: Employs **MMKV** for ultra-fast, synchronous storage, maintaining user preferences, playback history, and "Recently Added" shelves across app sessions.
* **Local Library Indexing**: Implements a background scanning service that monitors the local filesystem to keep the library in sync with physical files.

---

### Technical Architecture

VMusic is built using a modern, scalable tech stack prioritized for performance and reliability:

| Layer | Technology |
| --- | --- |
| **Framework** | **React Native** with **Expo SDK** |
| **State Management** | **Zustand** (custom store pattern) |
| **Storage Layer** | **MMKV** (Synchronous, high-speed storage) |
| **Networking** | **RapidAPI** integration with custom fetch-retry logic |
| **UI Components** | **shadcn/ui** (customized for mobile) & **Lucide** icons |
| **File System** | **Expo FileSystem** (Legacy/Standard) with relative-path mapping |

---

### Development Roadmap

VMusic is currently in active development, focusing on the following "Hardening" phases:

1. **Phase 4.7: Queue Viewer Hardening**: Optimizing large list rendering (500+ tracks) using `getItemLayout` and interaction management.
2. **Metadata Reactivity**: Ensuring real-time UI updates when track information or artwork is modified.
3. **Cross-Device Stability**: Enhancing network resilience for diverse hardware, including tablet optimizations and DNS retry logic.

---

### Compliance & Intended Use

VMusic is designed as a **technical showcase** of mobile engineering principles, including advanced gesture handling, local-first data persistence, and efficient API integration. It is intended for personal media management and developer educational purposes.