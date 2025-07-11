# ⭐ Store Rating App

A full-stack web application where users can register, log in, view a list of stores, and submit ratings for them.

## 🧱 Tech Stack

- **Frontend:** React, Axios, React Router
- **Backend:** Node.js, Express
- **Database:** MySQL
- **Authentication:** JWT
- **ORM/Query:** MySQL driver (can be Prisma if configured)
- **Deployment:** (Optional) Vercel (Frontend), Render/Railway (Backend), PlanetScale/NeonDB (Database)

---


---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/YOUR_USERNAME/store-rating-app.git
cd store-rating-app

cd store-rating-backend
npm install


PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=store_rating_db
JWT_SECRET=your_jwt_secret


Start the server:

bash
npm start

Setup Frontend
bash

cd ../store-rating-frontend
npm install
npm run dev