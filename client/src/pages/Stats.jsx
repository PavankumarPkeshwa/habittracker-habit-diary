import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProgressChart from '../components/ProgressChart';
import API_URL from '../config';
import { Award, TrendingUp, Calendar } from 'lucide-react';

const Stats = () => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHabits();
    }, []);

    const fetchHabits = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/habits`);
            setHabits(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching habits:', err);
            setLoading(false);
        }
    };

    const totalCompletions = habits.reduce((acc, curr) => acc + curr.completedDates.length, 0);
    const bestStreak = Math.max(...habits.map(h => h.streak), 0);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Your Progress</h1>
                <p className="text-gray-500 mt-1">See how far you've come.</p>
            </div>

            {loading ? (
                <div className="text-center py-10 text-gray-400">Loading stats...</div>
            ) : (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                                <Award size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total Completions</p>
                                <p className="text-2xl font-bold text-gray-900">{totalCompletions}</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                            <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Best Streak</p>
                                <p className="text-2xl font-bold text-gray-900">{bestStreak} Days</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                            <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                                <Calendar size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Active Habits</p>
                                <p className="text-2xl font-bold text-gray-900">{habits.length}</p>
                            </div>
                        </div>
                    </div>

                    <ProgressChart habits={habits} />
                </div>
            )}
        </div>
    );
};

export default Stats;
