const Challenge = require('../models/Challenge');

const challenges = [
    {
        title: '30-Day Self Confidence Booster',
        description: 'Build unshakeable confidence through daily affirmations, journaling, and positive habits.',
        duration: 30,
        type: 'confidence',
        habits: [
            'Morning affirmations (5 mins)',
            'Gratitude journaling',
            'Compliment yourself daily',
            'Try something new',
            'Practice power poses'
        ]
    },
    {
        title: '45-Day Energy Boosting Morning Routine',
        description: 'Transform your mornings and supercharge your energy levels for the entire day.',
        duration: 45,
        type: 'energy',
        habits: [
            'Wake up at 6 AM',
            'Drink water (500ml)',
            '10-minute stretching',
            'Healthy breakfast',
            'No phone for first hour',
            '5-minute meditation'
        ]
    },
    {
        title: '30-Day Digital Detox',
        description: 'Reduce screen time and reclaim your focus and mental clarity.',
        duration: 30,
        type: 'custom',
        habits: [
            'No social media before 10 AM',
            'Phone usage under 2 hours',
            'Read physical book (20 mins)',
            'No screens 1 hour before bed',
            'Digital-free meals'
        ]
    },
    {
        title: '21-Day Fitness Kickstart',
        description: 'Build a sustainable fitness routine and boost your physical health.',
        duration: 21,
        type: 'custom',
        habits: [
            '30-minute workout',
            '10,000 steps daily',
            'Drink 8 glasses of water',
            'Protein-rich meal',
            'Stretch before bed'
        ]
    }
];

async function seedChallenges() {
    try {
        await Challenge.deleteMany({});
        await Challenge.insertMany(challenges);
        console.log('✅ Challenges seeded successfully!');
    } catch (error) {
        console.error('Error seeding challenges:', error);
    }
}

module.exports = seedChallenges;
