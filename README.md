# AI Notes App

A premium, modern note-taking application featuring AI-powered summarization, built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

-   **AI Summarization**: Instantly summarize long notes using Google's Gemini AI.
-   **Modern UI/UX**: A sleek, dark-themed interface with glassmorphism effects and smooth animations.
-   **Secure Authentication**: User registration and login with JWT authentication.
-   **Responsive Design**: Fully responsive layout that looks great on all devices.

## Tech Stack

-   **Frontend**: React, Vite, CSS (Glassmorphism)
-   **Backend**: Node.js, Express, MongoDB
-   **AI**: Google Gemini API

## Getting Started

### Prerequisites

-   Node.js installed
-   MongoDB installed and running locally
-   A Google Gemini API Key

### Installation

1.  **Clone the repository**

2.  **Setup Backend**
    ```bash
    cd server
    npm install
    cp .env.example .env
    ```
    *Edit `.env` and add your `GEMINI_API_KEY`.*

3.  **Setup Frontend**
    ```bash
    cd client
    npm install
    ```

### Running the App

1.  **Start the Backend**
    ```bash
    cd server
    npm run dev
    ```

2.  **Start the Frontend**
    ```bash
    cd client
    npm run dev
    ```

3.  Open [http://localhost:5173](http://localhost:5173) in your browser.


