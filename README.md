# 🛠️ FastCart Admin Backend — Node.js + Express + TypeScript

This is the backend API for the **FastCart Admin** dashboard built with **Node.js**, **Express**, and **TypeScript**. It includes secure authentication, validation, modular routing, file uploads, and a clean project structure.

---

## 🚀 Tech Stack

- ⚙️ **Node.js + Express**
- ⌨️ **TypeScript**
- 🔐 **JWT Authentication**
- 🧾 **MongoDB** with Mongoose
- 📦 **Multer** for file uploads
- ✅ **Zod / Express-Validator** for input validation
- 🌐 CORS, Helmet, Morgan middlewares
- 🛡️ Error handling & logging

---
---
## 📁 Folder Structure
```bash
server/
├── config/ # DB connection, environment config
├── controllers/ # Route logic
├── middleware/ # Auth, error, logger middleware
├── modals/ # Mongoose models (Admin, Product, etc.)
├── routes/ # API route definitions
├── uploads/ # Uploaded images/files
├── utils/ # Token generators, password hashers
├── validators/ # Request body validation (Zod or Express-validator)
├── index.ts # Entry point
├── .env # Environment variables
├── package.json
├── tsconfig.json


---

## 🧑‍💻 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/fastcart.git
cd server
npm install
npm run dev
