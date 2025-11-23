# 🚀 Running HabitDiary

This project is configured for **zero-config** setup in both Local and Codespaces environments.

## 📋 Quick Start

### 1. Install Dependencies

**Terminal 1 - Backend:**
```bash
cd server
npm install
```

**Terminal 2 - Frontend:**
```bash
cd client
npm install
```

### 2. Start the Application

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```

### 3. Open the App

- **Local:** Open `http://localhost:5173`
- **Codespaces:** Click "Open in Browser" on the popup

**That's it! No manual configuration needed.** 
(The frontend automatically proxies API requests to the backend).

---

## 🔧 Configuration Details (For Reference)

- **Frontend Port:** 5173 (Public)
- **Backend Port:** 5000 (Private - accessed internally via proxy)
- **Database:** MongoDB Atlas (configured in `server/.env`)

If you need to customize environment variables, check `.env.example` files.
