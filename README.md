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

This project uses GitHub Actions to automate continuous integration for the Nexlevr Level 02 e-commerce application.

### Pipeline Flow

Code Push / Pull Request
        ↓
GitHub Actions
        ↓
Checkout Repository
        ↓
Node.js 20 Setup
        ↓
Install Dependencies
        ↓
Backend Validation
        ↓
Frontend Build
        ↓
CI Complete

### Continuous Integration

The CI pipeline automatically runs whenever changes are pushed to the `main` branch or a pull request targets `main`.

The pipeline:

- Checks out the source code
- Sets up Node.js 20
- Installs frontend dependencies using `npm ci`
- Builds the React/Vite frontend
- Installs backend dependencies using `npm ci`
- Validates the Node.js backend using `node --check server.js`

### Pipeline Jobs

#### Frontend Build

The frontend job installs dependencies and runs the production build to verify that the React/Vite application builds successfully.

#### Backend Validation

The backend job installs dependencies and validates the Express server syntax before changes are accepted.

### Benefits

- Automated validation
- Consistent builds
- Early detection of build errors
- Automated dependency installation
- Repeatable CI process
- Reduced manual verification
