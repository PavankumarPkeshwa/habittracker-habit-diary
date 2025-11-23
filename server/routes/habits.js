const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');

// Get all habits
router.get('/', async (req, res) => {
    try {
        const habits = await Habit.find().sort({ createdAt: -1 });
        res.json(habits);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new habit
router.post('/', async (req, res) => {
    const habit = new Habit({
        name: req.body.name,
        icon: req.body.icon,
        description: req.body.description,
        frequency: req.body.frequency,
        category: req.body.category,
        habitType: req.body.habitType,
        screenTimeGoal: req.body.screenTimeGoal,
    });

    try {
        const newHabit = await habit.save();
        res.status(201).json(newHabit);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Toggle habit completion for today
router.post('/:id/toggle', async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        if (!habit) return res.status(404).json({ message: 'Habit not found' });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const index = habit.completedDates.findIndex(date => {
            const d = new Date(date);
            d.setHours(0, 0, 0, 0);
            return d.getTime() === today.getTime();
        });

        if (index === -1) {
            habit.completedDates.push(new Date());
            habit.streak += 1;
        } else {
            habit.completedDates.splice(index, 1);
            habit.streak = Math.max(0, habit.streak - 1);
        }

        const updatedHabit = await habit.save();
        res.json(updatedHabit);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Log screen time for a habit
router.post('/:id/screentime', async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        if (!habit) return res.status(404).json({ message: 'Habit not found' });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Check if there's already a log for today
        const existingLogIndex = habit.screenTimeLog.findIndex(log => {
            const logDate = new Date(log.date);
            logDate.setHours(0, 0, 0, 0);
            return logDate.getTime() === today.getTime();
        });

        if (existingLogIndex !== -1) {
            // Update existing log
            habit.screenTimeLog[existingLogIndex].minutes = req.body.minutes;
        } else {
            // Create new log
            habit.screenTimeLog.push({
                date: new Date(),
                minutes: req.body.minutes,
            });
        }

        const updatedHabit = await habit.save();
        res.json(updatedHabit);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a habit
router.put('/:id', async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        if (!habit) return res.status(404).json({ message: 'Habit not found' });

        // Update fields
        if (req.body.name) habit.name = req.body.name;
        if (req.body.description !== undefined) habit.description = req.body.description;
        if (req.body.icon) habit.icon = req.body.icon;
        if (req.body.category) habit.category = req.body.category;
        if (req.body.frequency) habit.frequency = req.body.frequency;
        if (req.body.screenTimeGoal !== undefined) habit.screenTimeGoal = req.body.screenTimeGoal;

        const updatedHabit = await habit.save();
        res.json(updatedHabit);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a habit
router.delete('/:id', async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        if (!habit) return res.status(404).json({ message: 'Habit not found' });

        await habit.deleteOne();
        res.json({ message: 'Habit deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
