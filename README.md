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

## Important
Do not commit `.env` files or secrets. The checkout uses demo payment status and does not process real money.
