# WorkPilot - Team Task Manager

A modern SaaS application for managing projects, assigning tasks, and tracking progress.

## Live Demo

Frontend: https://workpilot-frontend.railway.app
Backend API: https://workpilot-backend.railway.app
GitHub: https://github.com/YOUR_USERNAME/workpilot

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
Full access to all features

Member Account
Email: member@workpilot.com
Password: member123
Limited access to assigned tasks only

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
- Cannot manage projects or team

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

## Deployment Steps

1. Push code to GitHub
2. Create Railway account at railway.app
3. Create new project in Railway
4. Connect GitHub repository
5. Deploy backend (select backend folder)
6. Deploy frontend (select frontend folder)
7. Add environment variables
8. Get live URLs from Railway

## Troubleshooting

MongoDB Connection Error:
- Add IP 0.0.0.0/0 to MongoDB Atlas Network Access
- Check MONGO_URI in backend .env file
- Verify password has no special characters

Frontend Cannot Connect to Backend:
- Check REACT_APP_API_URL in frontend .env
- Ensure backend is running on port 5000
- Check CORS configuration

Port Already in Use:
- Change PORT in backend .env file
- Kill process on port 5000

## Project Structure

workpilot/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   ├── .env
│   └── package.json
└── README.md

## Environment Variables

Backend .env:
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/workpilot?retryWrites=true&w=majority
JWT_SECRET=your_secret_key_here
NODE_ENV=development
ADMIN_CODE=admin2024

Frontend .env:
REACT_APP_API_URL=http://localhost:5000/api

## License

MIT License

## Support

For issues or questions:
1. Check GitHub issues
2. Create new issue with detailed description
3. Include error messages and screenshots

Made with love for efficient team task management