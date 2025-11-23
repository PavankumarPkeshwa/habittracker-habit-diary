const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    duration: {
        type: Number, // e.g., 30 or 45 days
        required: true,
    },
    habits: [{
        type: String, // List of habit names included in the challenge
    }],
    type: {
        type: String,
        enum: ['confidence', 'energy', 'custom'],
        default: 'custom',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Challenge', challengeSchema);
