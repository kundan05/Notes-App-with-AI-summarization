# Deployment Guide

This guide will help you deploy your Notes App to production using **Vercel** (recommended) or Render.

## 1. Prerequisites (For any platform)

### MongoDB Atlas (Production Database)
1.  Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  Create a free account and a new cluster.
3.  Create a database user (username/password).
4.  Allow access from anywhere (IP `0.0.0.0/0`) in Network Access.
5.  Get your connection string:
    - Click "Connect" -> "Drivers".
    - It looks like: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority`
    - Replace `<username>` and `<password>` with your actual credentials.

---

## 2. Deploying to Vercel (Recommended)

You will deploy the **Backend** and **Frontend** as two separate projects on Vercel.

### Step 1: Deploy Backend (Server)
1.  Log in to [Vercel](https://vercel.com/).
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your GitHub repository.
4.  **Configure Project**:
    - **Project Name**: `noteapp-server` (or similar).
    - **Root Directory**: Click "Edit" and select `server`.
    - **Framework Preset**: Select "Other".
    - **Environment Variables**:
        - `MONGODB_URI`: Your MongoDB connection string.
        - `JWT_SECRET`: A random secret key.
        - `GEMINI_API_KEY`: Your Google Gemini API Key.
5.  Click **Deploy**.
6.  Once deployed, copy the **URL** (e.g., `https://noteapp-server.vercel.app`).

### Step 2: Deploy Frontend (Client)
1.  Go back to Vercel Dashboard.
2.  Click **"Add New..."** -> **"Project"**.
3.  Import the **same** GitHub repository again.
4.  **Configure Project**:
    - **Project Name**: `noteapp-client` (or similar).
    - **Root Directory**: Click "Edit" and select `client`.
    - **Framework Preset**: Vercel should auto-detect "Vite".
    - **Environment Variables**:
        - `VITE_API_URL`: The URL of your backend from Step 1 (e.g., `https://noteapp-server.vercel.app/api`).
          - **Important**: Add `/api` at the end if that's how your routes are defined.
5.  Click **Deploy**.

---

## 3. Deploying to Render (Alternative)

### Step 1: Create a New Web Service (Backend)
1.  Log in to [Render](https://render.com/).
2.  Click "New" -> "Web Service".
3.  Connect your GitHub repository.
4.  **Settings**:
    - **Name**: `noteapp-server` (or similar)
    - **Root Directory**: `server`
    - **Environment**: `Node`
    - **Build Command**: `npm install`
    - **Start Command**: `node index.js`
5.  **Environment Variables**:
    - `MONGODB_URI`: Your MongoDB Atlas connection string.
    - `JWT_SECRET`: A long random string.
    - `GEMINI_API_KEY`: Your Google Gemini API Key.
6.  Click "Create Web Service".
7.  **Copy the URL** of your deployed backend.

### Step 2: Create a Static Site (Frontend)
1.  Click "New" -> "Static Site".
2.  Connect the same GitHub repository.
3.  **Settings**:
    - **Name**: `noteapp-client` (or similar)
    - **Root Directory**: `client`
    - **Build Command**: `npm run build`
    - **Publish Directory**: `dist`
4.  **Environment Variables**:
    - `VITE_API_URL`: The URL of your backend from Step 1.
5.  Click "Create Static Site".
