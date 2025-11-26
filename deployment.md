# Deployment Guide

This guide will help you deploy your Notes App to production. We recommend using **Render** as it supports both Node.js (backend) and Static Sites (frontend) easily.

## 1. Prerequisites

Before deploying, you need to set up your production database.

### MongoDB Atlas (Production Database)
1.  Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  Create a free account and a new cluster.
3.  Create a database user (username/password).
4.  Allow access from anywhere (IP `0.0.0.0/0`) in Network Access.
5.  Get your connection string:
    - Click "Connect" -> "Drivers".
    - It looks like: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority`
    - Replace `<username>` and `<password>` with your actual credentials.

## 2. Deploying to Render

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
5.  **Environment Variables** (Advanced):
    Add the following variables:
    - `MONGO_URI`: Your MongoDB Atlas connection string.
    - `JWT_SECRET`: A long random string (e.g., `mysecretkey123`).
    - `GEMINI_API_KEY`: Your Google Gemini API Key.
6.  Click "Create Web Service".
7.  **Copy the URL** of your deployed backend (e.g., `https://noteapp-server.onrender.com`).

### Step 2: Create a Static Site (Frontend)
1.  Click "New" -> "Static Site".
2.  Connect the same GitHub repository.
3.  **Settings**:
    - **Name**: `noteapp-client` (or similar)
    - **Root Directory**: `client`
    - **Build Command**: `npm run build`
    - **Publish Directory**: `dist`
4.  **Environment Variables**:
    Add the following variable:
    - `VITE_API_URL`: The URL of your backend from Step 1 (e.g., `https://noteapp-server.onrender.com/api`).
    - **Important**: Make sure to add `/api` at the end if your backend routes start with it.
5.  Click "Create Static Site".

## 3. Final Check
Once both services are live:
1.  Open your frontend URL.
2.  Try to Sign Up.
3.  Create a note and try the "Summarize" button.

## Troubleshooting
- **Connection Error**: Check if `MONGO_URI` is correct and Network Access in MongoDB Atlas allows `0.0.0.0/0`.
- **API Error**: Check if `VITE_API_URL` is set correctly in the frontend service.
- **500 Error**: Check the backend logs in Render dashboard.
