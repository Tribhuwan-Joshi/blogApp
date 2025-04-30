# Blog App

This is a simple full-stack blog application built as part of an assessment for the **Full Stack Developer role at Omnify**.
Live - https://omnifyblogs.netlify.app/

## Features

- User authentication (login & register)
- Create, edit, and delete blogs
- View blog list and individual blog detail
- Protected routes for creating and managing blogs
- Responsive UI built with Tailwind CSS
- RESTful API using Express and MongoDB
- Token-based authentication with JWT

## Tech Stack

**Frontend:**

- React
- React Router
- Axios
- Tailwind CSS

**Backend:**

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- MongoDB instance running locally or remotely

### Backend

```bash
cd backend
npm install
npm run dev
```

#### .env file inside backend folder

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```
