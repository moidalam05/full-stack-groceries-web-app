# 🛒 Groceries Management App (MERN Stack)

A full-stack groceries management application built with **MongoDB, Express.js, React, Node.js**.  
Features include authentication, product CRUD, secure APIs, image uploads, and email notifications.

---

## 🚀 Features
- 🔐 User authentication & authorization (JWT)
- 📦 Product CRUD operations
- 🖼️ Image upload with Cloudinary
- 📧 Email notifications (Nodemailer)
- 🛡️ Security middlewares (Helmet, XSS-Clean, Rate Limiting)
- 📝 Logging with Morgan & Winston
- 🌐 CORS enabled for frontend integration

---

## 📦 Tech Stack
**Frontend:** React, Tailwindcss, redux toolkit 
**Backend:** Node.js, Express.js  
**Database:** MongoDB (Mongoose)  
**File Storage:** Cloudinary  
**Email Service:** Nodemailer

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/groceries-app.git

# Navigate into the project
cd groceries-app

# Install dependencies
npm install

# Setup environment variables in .env file
cp .env.example .env

# Start the development server
npm run dev
