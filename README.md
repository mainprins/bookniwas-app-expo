# Bookniwas App 📚

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Expo](https://img.shields.io/badge/Expo-React%20Native-blue)](https://expo.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green)](https://nodejs.org/)

Bookniwas is a **full-stack library management application** built with **Expo (React Native)** for the frontend and **Express.js** for the backend. Users can browse books, borrow/return books, and manage their library account from a mobile app.

---

## Features

- **User Authentication**
  - Sign up and log in with JWT
  - Persist login sessions with AsyncStorage
- **Book Management**
  - View all books in the library
  - Track available books
  - Borrow and return books
- **Dashboard**
  - Total books, borrowed books, and available books
  - Graphical representation using pie charts
- **Notifications**
  - Toast messages for success and error feedback
- **Cross-Platform Mobile App**
  - Works on both iOS and Android via Expo Go

---

## Tech Stack

- **Frontend:** React Native, Expo, React Navigation, Axios, AsyncStorage
- **Backend:** Node.js, Express.js, MongoDB, JWT
- **Other Libraries:** React Native Vector Icons, React Native Pie Chart, React Native Toast Message

---

## Folder Structure

bookniwas/
├── backend/ # Express backend
├── frontend/ # Expo React Native frontend
├── README.md
└── ...


---

## Backend Setup

1. Navigate to the backend folder:

```bash
cd backend
npm install
```

Create a .env file

PORT=5000
MONGO_URI=<your_mongo_db_connection_string>
JWT_SECRET=<your_secret_key>

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npx expo start
```

Create a file containing environment variables.
