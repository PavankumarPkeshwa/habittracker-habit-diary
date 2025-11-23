const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        default: 'CheckCircle',
    },
    description: String,
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'custom'],
        default: 'daily',
    },
    category: {
        type: String,
        enum: ['health', 'productivity', 'mindfulness', 'social', 'screentime', 'custom'],
        default: 'custom',
    },
    habitType: {
        type: String,
        enum: ['checkbox', 'timer'], // checkbox for regular habits, timer for screen time
        default: 'checkbox',
    },
    streak: {
        type: Number,
        default: 0,
    },
    completedDates: [Date],
    // For screen time tracking
    screenTimeLog: [{
        date: Date,
        minutes: Number, // time spent in minutes
    }],
    screenTimeGoal: {
        type: Number, // goal in minutes per day
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Habit', habitSchema);
