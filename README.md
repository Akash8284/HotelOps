<p align="center">
  <img src="C:\Users\Admin\Desktop\HotelOps\screenshots\logo.jpg" width="120"/>
</p>

<h1 align="center">HotelOps 🏨</h1>

<h3 align="center">
Smart Cloud-Based Hotel Operations Management Platform
</h3>

<h3 align="center">
Smart Cloud-Based Hotel Operations Management Platform
</h3>

<p align="center">

<img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react"/>
<img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js"/>
<img src="https://img.shields.io/badge/Database-PostgreSQL-blue?style=for-the-badge&logo=postgresql"/>
<img src="https://img.shields.io/badge/ORM-Prisma-black?style=for-the-badge&logo=prisma"/>
<img src="https://img.shields.io/badge/Cloud-AWS-orange?style=for-the-badge&logo=amazonaws"/>

</p>

---

# 📖 Overview

HotelOps is a modern cloud-ready Hotel Operations Management Platform designed to streamline daily hotel workflows through intelligent task management and role-based access control.

The platform enables hotel administrators to create, monitor, and manage operational tasks in real time, while workers can efficiently accept, track, and complete assigned tasks through a dedicated dashboard experience.

HotelOps simulates a real-world hospitality operations environment by implementing complete workflow lifecycles including task creation, assignment, progress tracking, completion monitoring, worker activity history, and duration analytics.

The system focuses on delivering an enterprise-style operational management experience with a modern glassmorphism UI, responsive design, secure backend APIs, and scalable database architecture suitable for hospitality and service-management environments.

---

# ✨ Features

- 🔐 JWT Authentication & Role-Based Access
- 👨‍💼 Separate Admin Dashboard
- 👷 Dedicated Worker Dashboard
- 📋 Task Creation & Assignment Workflow
- ✅ Task Acceptance & Completion Tracking
- ⏱️ Task Duration Analytics
- 📜 Worker Task History
- 🛡️ Protected Routes
- ☁️ Cloud-Ready Architecture
- 🎨 Modern Glassmorphism UI

---

# 🚀 Tech Stack

## Frontend

<p align="left">
  <img src="https://skillicons.dev/icons?i=react" height="55" alt="React"/>
  <img src="https://skillicons.dev/icons?i=tailwind" height="55" alt="Tailwind"/>
  <img src="https://skillicons.dev/icons?i=vite" height="55" alt="Vite"/>
  <img src="https://skillicons.dev/icons?i=js" height="55" alt="JavaScript"/>
  <img src="https://skillicons.dev/icons?i=html" height="55" alt="HTML"/>
  <img src="https://skillicons.dev/icons?i=css" height="55" alt="CSS"/>
</p>

---

## Backend

<p align="left">
  <img src="https://skillicons.dev/icons?i=nodejs" height="55" alt="NodeJS"/>
  <img src="https://skillicons.dev/icons?i=express" height="55" alt="Express"/>
  <img src="https://skillicons.dev/icons?i=prisma" height="55" alt="Prisma"/>
</p>

---

## Database

<p align="left">
  <img src="https://skillicons.dev/icons?i=postgres" height="55" alt="PostgreSQL"/>
</p>

---

## Cloud & DevOps

<p align="left">
  <img src="https://skillicons.dev/icons?i=aws" height="55" alt="AWS"/>
  <img src="https://skillicons.dev/icons?i=git" height="55" alt="Git"/>
  <img src="https://skillicons.dev/icons?i=github" height="55" alt="GitHub"/>
  <img src="https://skillicons.dev/icons?i=vercel" height="55" alt="Vercel"/>
</p>

---

# 🏗️ System Architecture

```text
Frontend (React + Tailwind)
        ↓
REST APIs (Express.js)
        ↓
Prisma ORM
        ↓
PostgreSQL Database
        ↓
AWS S3 (Planned)
```

---

# 📂 Project Structure

```text
HotelOps/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── prisma/
│   ├── src/
│   └── package.json
│
├── screenshots/
│
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/HotelOps.git
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
DATABASE_URL=your_postgresql_database_url
JWT_SECRET=your_secret_key
```

Run Prisma migration:

```bash
npx prisma generate
npx prisma migrate dev
```

Start backend:

```bash
npm run dev
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000
```

Start frontend:

```bash
npm run dev
```

---

# 🔑 Demo Credentials

## 👨‍💼 Admin

```text
Email: admin@gmail.com
Password: 123456
```

---

## 👷 Worker

```text
Email: worker@gmail.com
Password: 123456
```

---

# 📸 Screenshots

## 🔐 Login Page
<img width="1908" height="898" alt="Login" src="https://github.com/user-attachments/assets/cb3aaffb-1e81-4e22-a2b1-7bba4709cd43" />


---

## 👨‍💼 Admin Dashboard
<img width="1915" height="908" alt="Admin_Dashboard" src="https://github.com/user-attachments/assets/b2ec4846-81df-457d-96d9-758acd4a0fc2" />


---

## 👨‍💼 Task Creation
<img width="1900" height="904" alt="Task_Creation" src="https://github.com/user-attachments/assets/78317923-8a3a-4834-978d-fde03f27e8f9" />


---

## 👷 Worker Dashboard
<img width="1911" height="898" alt="Worker_Dashboard" src="https://github.com/user-attachments/assets/9efae342-4b96-44ee-980e-1e5c1c037bae" />


---

# 🔥 Key Highlights

- Full-stack role-based workflow platform
- Real-world hotel operations simulation
- JWT authentication system
- RESTful API architecture
- Cloud-ready deployment structure
- Responsive modern UI
- Scalable backend architecture

---

# 📈 Future Enhancements

- 🤖 Smart Worker Auto-Assignment
- 📊 Analytics Dashboard
- 📩 Real-Time Notifications
- 📷 AWS S3 Proof Image Uploads
- 🐳 Docker Deployment
- ⚡ CI/CD Pipelines
- 📈 Worker Performance Tracking
- 📧 Email Notifications

---

# ☁️ Deployment

| Service | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | Neon PostgreSQL |
| Storage | AWS S3 (Planned) |

---

# 👨‍💻 Author

## Akash Nikam

---

# ⭐ If you like this project, give it a star on GitHub!
