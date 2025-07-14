# SARA - Search Analysis Recommed Application

A powerful and modern web-based **Movie Recommendation System** built using **Next.js** for the frontend and **AI & Machine Learning** for intelligent recommendations. It classifies user preferences and provides curated movie collections based on viewing history, genres, ratings, and other relevant features.

---

## Features

- 🎥 Personalized movie collection recommendations
- 🧠 Machine Learning classification model for recommendation logic
- ⚡ Fast & SEO-friendly frontend using Next.js
- 📊 Dynamic UI for exploring recommended collections
- 🌐 API integration between ML backend and Next.js frontend

---

## 🛠 Tech Stack

| Layer           | Tech                             |
|----------------|----------------------------------|
| Frontend       | Next.js, React, Tailwind CSS     |
| Backend        | Python       |
| ML Model       | Scikit-learn / Pandas / Pickle   |
| Hosting        | Vercel |
| Database        | PostgreSQL (Supabase) |

---

## ML Model Overview

The ML model is trained to **classify user preferences** into specific genres or collections using features like:

- Query based AI recommendations
- Genre preferences
- Watch history
- Movie metadata (genre, popularity, runtime, etc.)

The model uses **classification algorithms** (e.g., Random Forest, Logistic Regression) and is serialized using **Pickle**. It is served via a **Flask** or **FastAPI** backend.

---

## UI Previews

| Page           | Description                       |
| -------------- | --------------------------------- |
| `/`            | Hero landing page                 |
| `/search`            | Query search page                 |
| `/recommend`   | Movie collections from ML backend |
| `/browse/trending`   | Trending movie collections |
| `/collections/genres/[genre]`   | Specific genre movie collections |
| `/browse/trending`   | Trending movie collections |
| `/movie/[name]/[id]` | Movie detail page                 |


