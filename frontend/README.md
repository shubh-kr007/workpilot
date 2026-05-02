# WorkPilot Frontend

React.js + Tailwind CSS SaaS dashboard application

## Installation

npm install

## Environment Setup

Create .env file with:

REACT_APP_API_URL=http://localhost:5000/api

## Running

Development mode:
npm start

Opens at: http://localhost:3000

Production build:
npm run build

## Project Structure

components/ - Reusable UI components
  - Button.js - Custom button component
  - Card.js - Card container
  - Input.js - Input field
  - Modal.js - Modal dialog
  - Sidebar.js - Navigation sidebar
  - Navbar.js - Top navigation bar
  - Badge.js - Badge/tag component
  - Table.js - Data table

context/ - State management
  - AuthContext.js - Authentication state
  - ThemeContext.js - Theme/dark mode state
  - NotificationContext.js - Notifications

pages/ - Page components
  - Login.js - Login page
  - Signup.js - User registration
  - Dashboard.js - Main dashboard
  - Projects.js - Project management
  - Tasks.js - Task management
  - Team.js - Team management
  - Reports.js - Analytics and reports
  - Profile.js - User profile settings

services/ - API communication
  - api.js - Axios client with interceptors

## Design System

Dark Mode Only - No light mode

Colors:
Primary Black - #000000
Primary Blue - #3B82F6
Success Green - #059669
Warning Amber - #D97706
Danger Red - #DC2626

Typography:
Font - Inter (Google Fonts)
Sizes - 12px, 14px, 16px, 18px, 20px, 24px, 30px, 36px

Spacing - 8px grid system
4px, 8px, 12px, 16px, 20px, 24px, 32px

## Pages Overview

Login Page
- Email and password input
- Demo account buttons for quick testing
- Link to signup page
- Admin code signup option shown

Signup Page
- Name, email, password fields
- Option to signup as Admin with code
- Admin code: admin2024
- Link to login page

Dashboard
- Stats cards (total, in progress, completed, overdue)
- Task distribution chart
- Recent tasks list
- Quick overview of everything

Projects Page
- List of all projects
- Create new project button
- Project cards with progress bars
- Team member count
- Delete project option

Tasks Page
- List of all tasks
- Filter by status (All, Pending, In Progress, Completed)
- Filter by priority (All, High, Medium, Low)
- Create new task button
- Update task status dropdown
- Delete task option

Team Page
- List of team members
- Add new member button
- Member roles displayed
- Remove member option

Reports Page
- Task completion trends (chart)
- Team productivity metrics
- Performance statistics

Profile Page
- User information
- Edit profile option
- Change password
- Account settings

## Authentication

JWT token-based authentication
Token stored in localStorage
Automatically sent with every API request
30 days expiration

## Responsive Design

Mobile first approach
Works perfectly on:
- Mobile (320px and above)
- Tablet (768px and above)
- Desktop (1024px and above)
- Large Desktop (1920px and above)

All features functional on all screen sizes

## Components Usage

Button component:
<Button variant="primary" size="md">Click Me</Button>

Card component:
<Card hoverable>
  <CardBody>Your content</CardBody>
</Card>

Input component:
<Input label="Email" type="email" placeholder="you@example.com" />

Modal component:
<Modal isOpen={true} onClose={() => {}} title="Dialog Title">
  Content inside modal
</Modal>

## Dependencies

react - UI library
react-router-dom - Page routing
axios - HTTP requests
tailwindcss - Styling
recharts - Charts and graphs
react-hot-toast - Toast notifications
react-icons - Icon library

## Troubleshooting

Cannot connect to backend:
- Check REACT_APP_API_URL in .env
- Verify backend is running on port 5000
- Check browser console for errors

Login issues:
- Clear browser localStorage
- Clear browser cache
- Try logging in again

Build errors:
- Delete node_modules folder
- Run npm install again
- Clear npm cache with npm cache clean --force

## License

MIT License

Made with love for WorkPilot