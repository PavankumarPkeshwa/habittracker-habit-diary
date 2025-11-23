import React, { useState } from 'react';
import axios from 'axios';
import { Trophy, Users, Calendar, Plus, ArrowRight, Zap, Heart, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import API_URL from '../config';

const CHALLENGE_ICONS = {
    confidence: Heart,
    energy: Zap,
    custom: Trophy,
};

const ChallengeCard = ({ challenge, onJoin }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isJoining, setIsJoining] = useState(false);
    const IconComponent = CHALLENGE_ICONS[challenge.type] || Trophy;

    const handleJoinChallenge = async () => {
        setIsJoining(true);
        try {
            // Create habits for this challenge
            for (const habitName of challenge.habits) {
                await axios.post(`${API_URL}/api/habits`, {
                    name: habitName,
                    description: `Part of ${challenge.title}`,
                    icon: 'CheckCircle',
                    frequency: 'daily',
                    category: challenge.type === 'confidence' ? 'mindfulness' : challenge.type === 'energy' ? 'health' : 'custom',
                    habitType: 'checkbox',
                });
            }
            onJoin && onJoin();
            alert(`Successfully joined ${challenge.title}! Check your planner to see the new habits.`);
        } catch (error) {
            console.error('Error joining challenge:', error);
            alert('Failed to join challenge. Please try again.');
        } finally {
            setIsJoining(false);
        }
    };

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all"
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${challenge.type === 'confidence' ? 'bg-purple-100 text-purple-600' :
                    challenge.type === 'energy' ? 'bg-orange-100 text-orange-600' :
                        'bg-blue-100 text-blue-600'
                    }`}>
                    <IconComponent size={24} />
                </div>
                <span className="text-sm font-medium text-gray-400 flex items-center gap-1">
                    <Calendar size={14} />
                    {challenge.duration} Days
                </span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">{challenge.title}</h3>
            <p className="text-gray-500 text-sm mb-4 line-clamp-2">{challenge.description}</p>

            {/* Habit List */}
            <div className="mb-4">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-xs font-semibold text-gray-600 mb-2 hover:text-indigo-600 transition-colors"
                >
                    Includes {challenge.habits.length} habits {isExpanded ? '▼' : '▶'}
                </button>
                <div className="space-y-1">
                    {(isExpanded ? challenge.habits : challenge.habits.slice(0, 3)).map((habit, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle size={14} className="text-indigo-400" />
                            {habit}
                        </div>
                    ))}
                    {!isExpanded && challenge.habits.length > 3 && (
                        <p className="text-xs text-gray-400 ml-5">+{challenge.habits.length - 3} more</p>
                    )}
                </div>
            </div>

            <button
                onClick={handleJoinChallenge}
                disabled={isJoining}
                className={`w-full py-2 px-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 group ${isJoining
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
            >
                {isJoining ? 'Joining...' : 'Join Challenge'}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </motion.div>
    );
};

export default ChallengeCard;
