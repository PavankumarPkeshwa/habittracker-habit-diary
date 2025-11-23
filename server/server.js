const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoMemoryServer } = require('mongodb-memory-server');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        process.env.CLIENT_URL
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.use(express.json());

// Database Connection
async function connectDB() {
    try {
        let mongoUri;

        if (process.env.MONGODB_URI) {
            // Use provided MongoDB URI
            mongoUri = process.env.MONGODB_URI;
        } else {
            // Use in-memory MongoDB
            console.log('No MONGODB_URI found, starting in-memory database...');
            const mongod = await MongoMemoryServer.create();
            mongoUri = mongod.getUri();
            console.log('In-memory MongoDB started at:', mongoUri);
        }

        await mongoose.connect(mongoUri);
        console.log('MongoDB connected successfully!');

        // Seed challenges
        const seedChallenges = require('./seeds/challenges');
        await seedChallenges();
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}

connectDB();

// Routes
const habitRoutes = require('./routes/habits');
const challengeRoutes = require('./routes/challenges');

app.use('/api/habits', habitRoutes);
app.use('/api/challenges', challengeRoutes);

app.get('/', (req, res) => {
    res.send('Habit Diary API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
