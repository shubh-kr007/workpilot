# WorkPilot - Team Task Manager

A modern SaaS application for managing projects, assigning tasks, and tracking progress.

## Live Demo

Frontend: https://workpilot-frontend.railway.app
Backend API: https://workpilot-backend.railway.app
GitHub: https://github.com/shubh-kr007/workpilot

## Features

- Modern Dark UI Design
- Secure Authentication with JWT
- Project Management
- Task Management and Tracking
- Team Management
- Dashboard with Charts
- Role-Based Access Control

## Tech Stack

Frontend: React 18, Tailwind CSS, React Router, Axios, Recharts
Backend: Node.js, Express, MongoDB, JWT Authentication
Deployment: Railway, MongoDB Atlas

## Getting Started

To run backend:
cd backend
npm install
npm run dev

To run frontend:
cd frontend
npm install
npm start

Backend URL: http://localhost:5000
Frontend URL: http://localhost:3000

## Test Accounts

Admin Account
Email: admin@workpilot.com
Password: admin123

Member Account
Email: member@workpilot.com
Password: member123

## User Roles

Admin can:
- Create and delete projects
- Add and remove team members
- Create, assign, and delete tasks
- View all projects and tasks

Member can:
- View assigned tasks
- Update task status
- View assigned projects

## API Endpoints

Authentication:
POST /api/auth/signup
POST /api/auth/login
GET /api/auth/me

Projects:
GET /api/projects
POST /api/projects
DELETE /api/projects/:id
POST /api/projects/:id/members
DELETE /api/projects/:id/members/:memberId

Tasks:
GET /api/tasks
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id
GET /api/tasks/dashboard/stats

## License

MIT License
