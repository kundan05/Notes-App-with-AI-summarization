# 📝 Notes App With AI Summarization

A premium, modern note-taking application featuring **AI-powered summarization**, built with the MERN stack (MongoDB, Express, React, Node.js). Experience a sleek, dark-themed interface with glassmorphism effects and smooth animations.
<img width="1174" height="628" alt="Screenshot from 2025-11-27 13-53-40" src="https://github.com/user-attachments/assets/8f97cc73-d601-46b9-ba08-ee692328d234" />
<img width="1765" height="937" alt="Screenshot from 2025-11-27 13-53-14" src="https://github.com/user-attachments/assets/65116a16-a4c4-419d-bf86-9b696257cb0f" />


🚀 **Live Demo:** [https://notes-app-with-ai-summarization.onrender.com](https://notes-app-with-ai-summarization.onrender.com)

---

## ✨ Features

-   **🤖 AI Summarization**: Instantly summarize long notes using Google's Gemini AI.
-   **🔐 Secure Authentication**: Robust user registration and login system using JWT and Bcrypt.
-   **📝 Rich Note Management**: Create, read, update, and delete notes with ease.
-   **🎨 Modern UI/UX**: A visually stunning interface featuring dark mode, glassmorphism, and responsive design.
-   **📱 Fully Responsive**: Optimized for seamless experience across desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

### Frontend
-   **React**: UI Library
-   **Vite**: Build tool for fast development
-   **React Router**: Navigation
-   **Axios**: HTTP Client
-   **CSS3**: Custom styling with Glassmorphism and Animations

### Backend
-   **Node.js**: Runtime environment
-   **Express.js**: Web framework
-   **MongoDB**: NoSQL Database
-   **Mongoose**: ODM for MongoDB
-   **JWT (JSON Web Tokens)**: Authentication
-   **BcryptJS**: Password hashing
-   **Google Generative AI**: AI Summarization (Gemini Model)

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

-   **Node.js** (v14 or higher)
-   **npm** or **yarn**
-   **MongoDB** (Local or Atlas connection string)
-   **Google Gemini API Key** (Get it from [Google AI Studio](https://aistudio.google.com/))

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/notes-app-with-ai-summarization.git
    cd notes-app-with-ai-summarization
    ```

2.  **Backend Setup**
    Navigate to the server directory and install dependencies:
    ```bash
    cd server
    npm install
    ```

    Create a `.env` file in the `server` directory and add the following variables:
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    GEMINI_API_KEY=your_google_gemini_api_key
    ```

    Start the backend server:
    ```bash
    npm run dev
    ```

3.  **Frontend Setup**
    Open a new terminal, navigate to the client directory, and install dependencies:
    ```bash
    cd ../client
    npm install
    ```

    Start the frontend development server:
    ```bash
    npm run dev
    ```

4.  **Access the App**
    Open your browser and visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---
