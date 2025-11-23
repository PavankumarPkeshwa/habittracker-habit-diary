# 🚀 Running HabitDiary in GitHub Codespaces

This guide will help you run the HabitDiary application in GitHub Codespaces.

## 📋 Setup Steps

### 1. Open in Codespaces

1. Go to your GitHub repository
2. Click the green **"Code"** button
3. Select **"Codespaces"** tab
4. Click **"Create codespace on main"**

### 2. Configure Environment Variables

#### Backend (.env)
Create `server/.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_url_here
CLIENT_URL=https://[your-codespace-name]-5173.app.github.dev
```

**To get your Codespace URL:**
- After starting the frontend, Codespaces will show a popup with the URL
- Or check the "PORTS" tab at the bottom of VS Code
- Copy the forwarded address for port 5173

#### Frontend (.env.local)
Create `client/.env.local` file:
```env
VITE_API_URL=https://[your-codespace-name]-5000.app.github.dev
```

**To get your backend URL:**
- Check the "PORTS" tab for port 5000
- Copy the forwarded address

### 3. Install Dependencies

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

### 4. Start the Application

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```

Wait for: `✅ MongoDB connected successfully!`

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```

### 5. Access the Application

1. When Vite starts, Codespaces will show a popup: **"Open in Browser"**
2. Click it to open your app
3. Or go to the **PORTS** tab and click the globe icon next to port 5173

## 🔧 Port Visibility

Make sure ports are set to **Public**:

1. Go to **PORTS** tab (bottom panel)
2. Right-click on port **5000** → **Port Visibility** → **Public**
3. Right-click on port **5173** → **Port Visibility** → **Public**

## ⚠️ Important Notes

- **Update URLs**: Every time you create a new Codespace, the URLs change
- **Environment Variables**: You'll need to update `.env` files with new Codespace URLs
- **MongoDB**: Use MongoDB Atlas (cloud) - in-memory database won't work well in Codespaces

## 🐛 Troubleshooting

### CORS Errors
- Make sure `CLIENT_URL` in `server/.env` matches your frontend Codespace URL
- Ensure ports are set to **Public**

### API Connection Errors
- Verify `VITE_API_URL` in `client/.env.local` matches your backend Codespace URL
- Check if backend server is running (Terminal 1)

### Database Connection Issues
- Verify your `MONGODB_URI` is correct
- Check MongoDB Atlas network access allows connections from anywhere (0.0.0.0/0)

## 📝 Example Configuration

If your Codespace is named `fuzzy-space-adventure-12345`:

**server/.env:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster0.mongodb.net/habittracker
CLIENT_URL=https://fuzzy-space-adventure-12345-5173.app.github.dev
```

**client/.env.local:**
```env
VITE_API_URL=https://fuzzy-space-adventure-12345-5000.app.github.dev
```

---

**Happy coding in the cloud! ☁️**
