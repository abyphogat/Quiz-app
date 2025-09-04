# React Quiz App 🎯

An **interactive quiz application** built using **React + Vite** with **TailwindCSS** styling.  
This app provides a clean and responsive interface where users can answer multiple-choice questions, track their progress, and view results at the end.

---

## 📖 Project Overview
The Quiz App is designed to provide an engaging and responsive quiz experience.  
It loads 5–10 multiple-choice questions either from the [Open Trivia DB API](https://opentdb.com/) or from a local JSON file (as a fallback).  

Users answer one question at a time, track their progress with a progress bar and timer, and finally see their score along with a detailed summary of correct and incorrect answers.

---

## 🎨 Features

### 🔹 Quiz Page
- Loads **5–10 random questions**.
- Shows **one question at a time** with **4 options**.
- **Next** button enabled only after selecting an answer.
- **Progress bar + question counter** (e.g., “Question 3 of 10”).
- Optional **timer per question**.

### 🔹 Score Tracking
- Correct and incorrect answers are tracked.
- Final score displayed (e.g., “You scored 7/10”).

### 🔹 Results Page
- Detailed summary: user’s answer vs. correct answer.
- Highlight correct/incorrect selections.
- **Restart Quiz** button to reset and play again.

### 🔹 UI/UX
- Fully **responsive** (desktop + mobile).
- Modern fonts and clean design.
- Smooth **animations** for question transitions.
- Accessible: supports **keyboard navigation** and ARIA labels.

---

## ⚙️ Tech Stack
- **React 18** (with Hooks: `useState`, `useEffect`)
- **React Router** (for Quiz and Results pages)
- **Vite** (fast development and build tool)
- **TailwindCSS** (styling)
- **JavaScript (ES6+)**
- **Open Trivia DB API** (dynamic question fetching)
- **Local JSON fallback** (`questions.json`)

---

## 🧩 Future Enhancements
- Add **difficulty levels** (easy/medium/hard).
- Save **high scores** in `localStorage`.
- Add **dark/light theme toggle**.
- Support for **category-based quizzes** (sports, science, history).
- Leaderboard feature for competitive play.

---

## ✅ Requirements
Before running this project, make sure you have installed:
- [Node.js](https://nodejs.org/) (version 16 or later)
- npm (comes with Node.js)

Check versions:
```bash
node -v
npm -v
