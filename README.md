# EduZap v2 Backend 🔥

[![Node.js](https://img.shields.io/badge/Node.js-18.15.0-green?logo=node.js\&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18.2-black?logo=express\&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0.6-brightgreen?logo=mongodb\&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-JSONWebToken-blue?logo=jsonwebtokens)](https://jwt.io/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

Backend API for **EduZap v2**, powering authentication, tasks, and notes management.

---

## 🚀 Features

* **Authentication** 🔒

  * Register and login
  * Password hashing with bcrypt
  * JWT authentication for secure routes

* **Tasks Management** 📝

  * Create, read, update, delete tasks
  * Track completed and pending tasks
  * User-specific tasks

* **Notes Management** 🗒️

  * Add, view, update, delete notes
  * User-specific notes

---

## 🛠 Tech Stack

| Technology                                                                                       | Description           |
| ------------------------------------------------------------------------------------------------ | --------------------- |
| ![Node.js](https://img.shields.io/badge/Node.js-18.15.0-green?logo=node.js\&logoColor=white)     | Backend runtime       |
| ![Express](https://img.shields.io/badge/Express-4.18.2-black?logo=express\&logoColor=white)      | API framework         |
| ![MongoDB](https://img.shields.io/badge/MongoDB-6.0.6-brightgreen?logo=mongodb\&logoColor=white) | Database              |
| JWT                                                                                              | Authentication tokens |
| bcrypt                                                                                           | Password hashing      |

---

## ⚡ Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/MuhammadAhmadCode/eduzap-v2-backend.git
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:

   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:

   ```bash
   npm run dev
   ```

Server will run on `http://localhost:3000` by default.

---

## 🔗 API Routes

### Auth 🔒

* `POST /auth/register` → Register a new user
* `POST /auth/login` → Login
* `GET /auth/logout` → Logout

### Notes 🗒️

* `POST /notes` → Create a note
* `GET /notes` → Get all notes for user
* `PATCH /notes/:id` → Update a note by ID
* `DELETE /notes/:id` → Delete a note by ID

### Tasks ✅

* `POST /tasks` → Create a task
* `GET /tasks` → Get all tasks for user
* `PATCH /tasks/:id` → Update a task by ID
* `PATCH /tasks/:id/complete` → Toggle task completion
* `DELETE /tasks/:id` → Delete a task by ID

---

## 📝 License

MIT © M. Ahmad
