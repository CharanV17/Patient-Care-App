# Patient Care App

A full-stack application for managing patient prescriptions, medicines, and appointments.

## Tech Stack

- **Frontend:** React, TypeScript, Vite, TailwindCSS
- **Backend:** Node.js, Express, TypeScript, MongoDB, Mongoose
- **Authentication:** JWT (Access + Refresh Tokens)

## Prerequisites

- Node.js (v14+)
- MongoDB (running locally or a cloud URI)

## Installation & Running

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (or use the provided `.env.example`):
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/patient-care-app
   JWT_SECRET=your_secret_key
   JWT_REFRESH_SECRET=your_refresh_secret_key
   ```

4. Start the server:
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:5000`.

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will run on `http://localhost:5173`.

## Features

- **User Authentication:** Register and Login with JWT.
- **Dashboard:** Overview of active medicines, upcoming appointments, and prescriptions.
- **Prescriptions:** Upload and manage prescriptions (images/PDFs supported).
- **Medicines:** Track active medicines with dosage and frequency.
- **Appointments:** Schedule and manage doctor appointments.

## Folder Structure

- `backend/src`: Backend source code (controllers, models, routes, middleware).
- `frontend/src`: Frontend source code (components, pages, context, api).
