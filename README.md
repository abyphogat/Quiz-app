# 🎯 React Quiz App

A clean, responsive **Quiz Application** built with React.  
The app fetches multiple-choice questions from the [Open Trivia DB API](https://opentdb.com/api_config.php) or falls back to a local JSON file.  
It tracks answers, calculates the score, and shows detailed results with an option to restart.

---

## 🚀 Features

- 📱 **Responsive design** (desktop & mobile friendly)
- ❓ Shows one question at a time with **4 options**
- 🎯 Tracks **correct & incorrect answers**
- 📊 Displays **progress** (e.g., *Question 3 of 10*)
- 🏆 Final **score summary** with correct vs. selected answers
- 🔄 **Restart Quiz** option
- 🎨 Styled with **Tailwind CSS** for modern UI
- ⚡ Uses **React Router** for navigation (`/quiz`, `/results`)
- 🔒 Handles API errors (falls back to `questions.json` if needed)

---

## 🛠️ Tech Stack

- **React 18** (functional components + hooks)
- **React Router v6**
- **Tailwind CSS** for styling
- **Open Trivia DB API** (optional)
- Local `questions.json` fallback

---

## 📂 Project Structure

