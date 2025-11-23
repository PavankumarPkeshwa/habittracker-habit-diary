const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge');

// Get all challenges
router.get('/', async (req, res) => {
    try {
        const challenges = await Challenge.find();
        res.json(challenges);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new challenge
router.post('/', async (req, res) => {
    const challenge = new Challenge({
        title: req.body.title,
        description: req.body.description,
        duration: req.body.duration,
        habits: req.body.habits,
        type: req.body.type,
    });

    try {
        const newChallenge = await challenge.save();
        res.status(201).json(newChallenge);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
