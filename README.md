# Nexlevr E-Commerce — Level 02 Task 01

Full-stack e-commerce application built with:
- React + Vite
- Node.js + Express
- MongoDB + Mongoose
- JWT + bcryptjs
- Responsive e-commerce UI
- Cart and wishlist
- User/admin roles
- Orders and demo checkout
- Admin dashboard
- Deployment-ready structure

## Run locally

### Backend
1. `cd server`
2. `npm install`
3. Copy `.env.example` to `.env`
4. Set `MONGO_URI` and `JWT_SECRET`
5. `npm run dev`

Backend: http://localhost:5000

### Frontend
1. `cd client`
2. `npm install`
3. Copy `.env.example` to `.env`
4. `npm run dev`

Frontend: http://localhost:5173

## CI/CD Pipeline

This project uses GitHub Actions to automate continuous integration
and continuous deployment.

### Pipeline Flow

Code Push
    ↓
GitHub Actions
    ↓
Checkout
    ↓
Node.js Setup
    ↓
Install Dependencies
    ↓
Backend Validation
    ↓
Frontend Build
    ↓
Deployment
    ↓
Live Application

### Continuous Integration

The CI pipeline automatically runs whenever changes are pushed
to the main branch or a pull request targets main.

### The pipeline:
- Checks out the source code
- Sets up Node.js
- Installs frontend dependencies
- Builds the React frontend
- Installs backend dependencies
- Validates the Node.js backend

### Benefits
- Automated validation
- Consistent builds
- Reduced manual deployment work
- Early detection of build errors
- Repeatable deployment process
