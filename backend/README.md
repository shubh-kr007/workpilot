# WorkPilot Backend

Express.js + MongoDB REST API for team task management

## Installation

npm install

## Environment Setup

Create .env file with:

PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/workpilot?retryWrites=true&w=majority
JWT_SECRET=your_secret_key_here
NODE_ENV=development
ADMIN_CODE=admin2024

## Running

Development mode:
npm run dev

Production mode:
npm start

## Project Structure

config/ - Database connection setup
controllers/ - Business logic for auth, projects, tasks
middleware/ - Authentication and role verification
models/ - MongoDB schemas (User, Project, Task)
routes/ - API endpoint definitions
utils/ - Helper functions like token generation

## User Model

name - String
email - String (unique)
password - String (hashed)
role - Admin or Member
createdAt - Date

## Project Model

name - String
description - String
admin - User ID (project creator)
members - Array of User IDs
createdAt - Date

## Task Model

title - String
description - String
project - Project ID
assignedTo - User ID
status - Pending, In Progress, or Completed
priority - Low, Medium, or High
deadline - Date
createdBy - User ID
createdAt - Date

## API Endpoints

Authentication:
POST /api/auth/signup - Register new user
POST /api/auth/login - Login user
GET /api/auth/me - Get current user info

Projects:
GET /api/projects - Get all projects
POST /api/projects - Create new project
DELETE /api/projects/:id - Delete project
POST /api/projects/:id/members - Add member to project
DELETE /api/projects/:id/members/:memberId - Remove member

Tasks:
GET /api/tasks - Get all tasks
POST /api/tasks - Create new task
PUT /api/tasks/:id - Update task
DELETE /api/tasks/:id - Delete task
GET /api/tasks/dashboard/stats - Get dashboard statistics

## Security Features

Password hashing with bcryptjs
JWT token authentication
Role-based access control middleware
Input validation on all endpoints
CORS enabled for frontend

## Dependencies

express - Web framework
mongoose - MongoDB object modeling
bcryptjs - Password hashing
jsonwebtoken - JWT token generation
dotenv - Environment variables
cors - Cross-origin resource sharing

## License

MIT License

Made with love for WorkPilot