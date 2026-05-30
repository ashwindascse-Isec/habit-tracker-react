# Student Habit Tracker Dashboard

## Project Overview
This project is a high-performance, single-page web application (SPA) designed to help students track daily productivity habits, analyze weekly routines, and maintain growth streaks. 

Built with **React** and bundled using **Vite**, the application utilizes custom state architecture to handle persistent data management, real-time statistical updates, and complex mathematical tracking entirely on the client side.

> **Live View Profile:** Designed with a sleek, responsive dark-mode UI containing animated metric indicators, week-by-week completion timelines, and category distribution panels.

---

## Technical Architecture & Design Decisions

The application bypasses bloated external state management libraries (like Redux or Zustand) in favor of clean React fundamentals, emphasizing encapsulation and render efficiency:

1. **Custom Hook State Brain (`useHabits.js`):** Centralizes core CRUD state logic. Components act as decoupled, pure visual consumers while the state engine handles tracking array mutations.
2. **Atomic Component Separation:** Built modularly with specialized single-responsibility UI layers (`AddHabitForm`, `HabitList`, `Analytics`, `WeekHeatmap`).
3. **Atomic State Synchronization:** Implements single-source-of-truth updates inside React state transitions to eliminate asynchronous state-batching lag and ensure streaks and completions never drift out of sync.
4. **Vectorized Calculation Caching:** Leverages React's `useMemo` hooks to intercept heavy computational tasks—such as category array reducing and leaderboard quicksorting—ensuring $O(1)$ presentation speeds even as history lists scale.
5. **Defensive Storage Pipeline:** Encapsulates the Web Storage API (`localStorage`) inside error-resistant `try/catch` pipelines to ensure elegant default fallbacks if disk caching is restricted by client browsers.

---

## Project Structure
```text
habit-tracker/
├── src/
│   ├── components/
│   │   ├── AddHabitForm.jsx   # Category binding and validation controls
│   │   ├── Analytics.jsx      # Leaderboards and performance distributions
│   │   ├── HabitItem.jsx      # Atomic card element with complete toggle state
│   │   ├── HabitList.jsx      # Grid mapping and array filtering shell
│   │   └── WeekHeatmap.jsx    # Visual progression timeline module
│   ├── hooks/
│   │   └── useHabits.js       # Central custom hook (Brain & LocalStorage API)
│   ├── App.jsx                # Layout root and component tree orchestration
│   └── main.jsx               # Vite rendering entry point
├── public/                    # Static UI asset wrappers
├── index.html                 # DOM mounting framework
├── package.json               # Node dependency map and launch configurations
└── README.md                  # Project documentation
```
## Core Application Features

- **Dynamic Interactive Dashboard:** Real-time circular metric tracking displaying completion percentages for the current day.
- **Persistent Local Cache:** Zero data loss on page refreshes via automatic state serialization to client browser memory.
- **Categorized Routine Management:** Intuitive classification maps (Study, Code, Health, Other) with distinct design themes.
- **Streak Leaderboard Engine:** Evaluates active multi-day consistency, sorting and adjusting streak heights instantly on completion toggles.
- **Time-Series Analytical Bars:** Dynamic horizontal heatmaps mapping percent-complete rates across trailing rolling-week date strings.

---

## Technologies Used
- **React 18 / 19 (Functional Components)**
- **Vite:** High-speed development bundling utilizing fast Hot Module Replacement (HMR).
- **JavaScript (ES6+):** Advanced array manipulation primitives (`.reduce()`, `.map()`, `.filter()`).
- **Web Storage API (`localStorage`):** Client-side state persistence.
- **CSS3 Core Variables:** Centralized theme tokens driving the application's clean dark-mode presentation.

---

## Installation & Local Execution

### 1. Change Directory into Project Root
```bash
cd habit-tracker
```
### 2. Install Development Dependencies
```bash
cd npm install
```
### 3. Initialize Vite Dev Server
```bash
cd npm run dev
```
Once initialized, follow the terminal link to view the app locally (typically at http://localhost:5173/).

## Performance Auditing & Optimization Realized

During development, computational checks were decoupled from standard component loops:
- **Quicksort Isolation:** Sorting algorithms used to rank streaks inside the leaderboard are now bound inside `useMemo` hooks. This limits array allocations strictly to frames where a habit's `streak` value changes.
- **Memory Optimization:** Prevented redundant recalculations of weekly completion histories during irrelevant UI interactions, reducing overall application re-renders and maintaining a 60fps render cycle.

---

## Key Learning Outcomes
- Designing and scaling domain-isolated **Custom React Hooks** (`useHabits`).
- Mitigating asynchronous batch-state conflicts inside complex state update functions.
- Caching analytical lists via React's optimization ecosystem (`useMemo`).
- Creating production-ready, highly modular component trees.