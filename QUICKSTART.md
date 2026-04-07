# 🚀 E-Commerce Project Quick Start Guide

Welcome to the newly refactored MERN Stack E-Commerce Product Catalog! Follow this quick guide to get your frontend, backend, and database running correctly.

### 📋 Prerequisites
Make sure you have the following installed on your machine:
- **[Node.js](https://nodejs.org/en/)** (v18 or higher recommended)
- **[MongoDB](https://www.mongodb.com/try/download/community)** (Running locally on default port `27017` or MongoDB Compass installed)

---

## 🛠️ Step 1: Initializing the Backend (Node/Express/MongoDB)

Your backend provides all the protected APIs and connects to your local MongoDB database.

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install the necessary dependencies (Express, Mongoose, JWT, etc.):
   ```bash
   npm install
   ```
3. Ensure your `.env` file exists in the `backend/` directory. It should look like this (already created for you):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/ecommerce
   JWT_SECRET=ecommerce_secret_key_2026
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
   *You should see a message saying "MongoDB Connected" and "Server started on port 5000". Keep this terminal open.*

---

## 💻 Step 2: Initializing the Frontend (React/Vite)

The frontend is a modern React SPA using Vite, Axios, and React Router.

1. Open a **second terminal** and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Check the console output! Usually, it will say `➜ Local: http://localhost:5173/`. Open that link in your browser to view the application!

---

## 🧪 Step 3: Application Testing & Admin Setup

By default, new users registered in your app are assigned the `"user"` role. The system requires an `"admin"` role to add or delete products. Here is how to test all functionalities:

### 1. General User Testing
- Click **Register** on the top right. Create an account with any email.
- You'll be redirected to **Login**.
- Notice your name appears in the top navigation bar indicating the JWT was saved locally. You can browse and use the cart properly.

### 2. Giving yourself Admin Rights
There is no "create admin" route for security purposes. You must set it in your Database manually for the very first user:
1. Open up **MongoDB Compass** or your MongoDB shell.
2. Connect to local: `mongodb://127.0.0.1:27017`
3. Expand your `ecommerce` database and click on the `users` collection.
4. Locate the user you just registered.
5. Edit the document and change the `"role": "user"` field to `"role": "admin"`.
6. Click **Update/Save**.

### 3. Testing Admin Dashboard
1. Go back to your React app and **log out**, then **log back in** with that user. 
2. A new **Admin Dashboard** button will appear in your navbar!
3. Click it to navigate to the dashboard. You can now use the Add Product form on the left.
4. Once you Add a Product, switch to the Home page to see it appear. You can hit *View Details* and click *Add to Cart*.
5. In your Cart, click *Checkout*. Check your Admin Dashboard "Orders" tab to see it logged successfully!
