# 🎯 HabitDiary - Your Personal Habit Tracker

A beautiful, feature-rich habit tracking application built with React, Node.js, Express, and MongoDB. Track your daily habits, join challenges, monitor screen time, and visualize your progress with an intuitive interface.

![HabitDiary](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

### 📅 Daily Habit Tracking
- Create and manage custom habits with beautiful category-based cards
- Track completion with visual checkmarks and streak counters
- Filter habits by category (Health, Productivity, Mindfulness, Social, Screen Time, Custom)
- Edit and delete habits with intuitive modals

### 🏆 Pre-Built Challenges
- Join curated challenges like "30-Day Self Confidence Booster" and "21-Day Fitness Kickstart"
- Automatically creates associated habits when joining a challenge
- Track challenge progress alongside your personal habits

### ⏱️ Screen Time Tracking
- Monitor daily screen time for apps like Instagram, YouTube, or general phone usage
- Set daily goals and get visual alerts when exceeding limits
- Log screen time with a simple interface

### 📊 Progress Visualization
- View detailed statistics and progress charts
- Calendar view to see your habit completion history
- Streak tracking to maintain motivation

### 🎨 Beautiful UI/UX
- Gradient backgrounds with animated blobs
- Category-specific background images for habit cards
- Smooth animations with Framer Motion
- Responsive design that works on all devices
- Dark overlays for better text readability

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v20.15.1 or higher recommended)
- **npm** or **yarn**
- **MongoDB** (optional - uses in-memory database by default)

### Installation

1. **Clone the repository**
   ```bash
   cd habittracker
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Configuration

#### Server Configuration

1. Navigate to the `server` directory
2. Create or edit the `.env` file:
   ```env
   # Optional: MongoDB Atlas connection string
   # If left empty, the app will use an in-memory MongoDB database
   MONGODB_URI=
   
   # Server port (default: 5000)
   PORT=5000
   ```

**Note:** If you don't provide a `MONGODB_URI`, the application will automatically use `mongodb-memory-server` for local development. This means your data will be stored in memory and will be lost when the server restarts.

#### Client Configuration

The client is pre-configured to connect to `http://localhost:5000`. No additional configuration needed.

### Running the Application

#### Option 1: Run Both Servers Separately

**Terminal 1 - Start the backend server:**
```bash
cd server
npm run dev
```
The server will start on `http://localhost:5000`

**Terminal 2 - Start the frontend client:**
```bash
cd client
npm run dev
```
The client will start on `http://localhost:5173` (or another port if 5173 is busy)

#### Option 2: Production Build

**Build the client:**
```bash
cd client
npm run build
```

**Start the server:**
```bash
cd server
npm start
```

## 📁 Project Structure

```
habittracker/
├── client/                 # React frontend
│   ├── public/            # Static assets (category images)
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── CreateHabit.jsx
│   │   │   ├── EditHabit.jsx
│   │   │   ├── HabitCard.jsx
│   │   │   ├── DailyPlanner.jsx
│   │   │   ├── ChallengeCard.jsx
│   │   │   ├── ProgressChart.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Challenges.jsx
│   │   │   ├── Stats.jsx
│   │   │   └── CalendarView.jsx
│   │   ├── App.jsx        # Main app component
│   │   └── index.css      # Global styles
│   ├── package.json
│   └── vite.config.js
│
├── server/                # Node.js/Express backend
│   ├── models/           # Mongoose models
│   │   ├── Habit.js
│   │   └── Challenge.js
│   ├── routes/           # API routes
│   │   ├── habits.js
│   │   └── challenges.js
│   ├── seeds/            # Database seed data
│   │   └── challenges.js
│   ├── server.js         # Main server file
│   ├── package.json
│   └── .env             # Environment variables
│
└── README.md            # This file
```

## 🛠️ Tech Stack

### Frontend
- **React** 18.3.1 - UI library
- **Vite** 5.4.10 - Build tool
- **Tailwind CSS** 4.0.0 - Styling
- **Framer Motion** 11.11.17 - Animations
- **Axios** 1.7.7 - HTTP client
- **React Router DOM** 7.0.1 - Routing
- **Lucide React** 0.460.0 - Icons
- **Recharts** 2.14.1 - Charts

### Backend
- **Node.js** - Runtime
- **Express** 4.21.1 - Web framework
- **MongoDB** - Database
- **Mongoose** 8.8.2 - ODM
- **MongoDB Memory Server** 10.1.2 - In-memory database for development
- **CORS** 2.8.5 - Cross-origin resource sharing
- **dotenv** 16.4.5 - Environment variables

## 📝 API Endpoints

### Habits
- `GET /api/habits` - Get all habits
- `POST /api/habits` - Create a new habit
- `PUT /api/habits/:id` - Update a habit
- `DELETE /api/habits/:id` - Delete a habit
- `POST /api/habits/:id/toggle` - Toggle habit completion for today
- `POST /api/habits/:id/screentime` - Log screen time for a habit

### Challenges
- `GET /api/challenges` - Get all challenges

## 🎨 Features in Detail

### Habit Categories
Each habit belongs to one of these categories:
- **Health & Fitness** - Exercise, nutrition, wellness
- **Productivity** - Work, learning, organization
- **Mindfulness** - Meditation, journaling, self-care
- **Social** - Relationships, communication, networking
- **Screen Time** - Digital wellness tracking
- **Custom** - Any other habit type

### Habit Types
1. **Regular Habits** - Simple checkbox tracking
2. **Screen Time Habits** - Time-based tracking with daily goals

### Smart UI Behavior
- When viewing "All Habits", the create button appears at the top
- When viewing a specific category, the create button appears at the bottom
- Category is automatically pre-selected based on current filter
- Category selection is hidden when creating from a specific category view

## 🐛 Troubleshooting

### Port Already in Use
If you get a port conflict error:
- Change the port in `server/.env` (for backend)
- Vite will automatically suggest an alternative port (for frontend)

### MongoDB Connection Issues
If using MongoDB Atlas and getting connection errors:
- Verify your connection string in `server/.env`
- Check your IP whitelist in MongoDB Atlas
- Ensure your network allows MongoDB connections

### Dependencies Installation Fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Built with ❤️ for better habit tracking

---

**Happy Habit Tracking! 🎯**
