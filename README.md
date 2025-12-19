# 🚀 COMPOSIT Official

Welcome to the **official repository of COMPOSIT** — the technical society platform built to manage events, content, users, Campus Ambassador (CA) operations, and administration through a unified, scalable web application.

This repository contains the **entire codebase**, including:
- 🌐 Frontend (Public Website)
- 🛠 Admin Portal
- 🎓 Campus Ambassador (CA) Portal
- 🔧 Backend APIs & Database Logic

## 🧩 Tech Stack

The project is built using modern, scalable technologies:

### Frontend
- **Next.js** – Server-side rendering & optimized routing
- **React.js** – Component-based UI development
- **TypeScript** – Type safety & better maintainability
- **Tailwind CSS** – Utility-first styling
- **Framer Motion** – Smooth animations & transitions
- **Spline** – Interactive 3D components

### Backend
- **Node.js** – Runtime environment
- **Next.js API Routes / Custom Backend** – Server logic
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB object modeling

## 📂 Project Structure

```bash
composit-official/
│
├── app/                    # Next.js app router
├── components/             # Reusable UI components
├── lib/                    # Utility functions & configs
├── models/                 # MongoDB models
├── pages/api/              # Backend API routes
├── admin/                  # Admin portal
├── ca-portal/              # Campus Ambassador portal
├── public/                 # Static assets
├── styles/                 # Global styles
├── .env.example            # Environment variables template
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## ⚙️ Prerequisites
- Make sure you have the following installed:
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or cloud – Atlas)
- Git


## 🛠 Installation & Setup

### 1️⃣ Fork the Repository

Click on the Fork button at the top-right of this repository.

### 2️⃣ Clone Your Fork

``` 
git clone https://github.com/<your-username>/composit-official.git
cd composit-official
```
### 3️⃣ Install Dependencies

```
npm install
# or
yarn install
```
### 4️⃣ Setup Environment Variables

Create a ```.env``` file using the example:
```
cp .env.example .env
```
Add required values:
```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### ▶️ Running the Project
Development Mode
```
npm run dev
# or
yarn dev
```
The app will run on:
```
http://localhost:3000
```

## 🧑‍💻 Portals Overview

- **Public Website** – Landing pages, event listings, announcements
- **Admin Portal** – Event management, user control, content updates
- **CA Portal** – CA registrations, referrals, dashboards

## 🌐 3D & Animations

- Spline is used for interactive 3D visuals
- Framer Motion powers page transitions and micro-interactions
These enhance user engagement while maintaining performance.

## ✅ Contribution Rules
- Follow existing code style
- Write clean, readable code
- Test before submitting PRs
- One feature or fix per PR

## 🐞 Reporting Issues
If you find a bug or have a feature request:
- Open an issue
- Provide clear steps to reproduce
- Attach screenshots if applicable

## 📜 License
This project is maintained by SME/COMPOSIT

Usage and distribution are subject to the organization’s policies.

## 📞 Contact Us

Have questions, suggestions, or want to collaborate with COMPOSIT?  
We’d love to hear from you!

📧 **Email:** composit.official@gmail.com  
🌐 **Website:** https://composit.in  

---
For technical issues or contributions:
- Open an issue in this repository
- Or reach out directly to the maintainers

> We aim to respond as quickly as possible. Your feedback helps us grow 🚀
