import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CalendarView = () => {
    const [habits, setHabits] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHabits();
    }, []);

    const fetchHabits = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/habits');
            setHabits(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching habits:', err);
            setLoading(false);
        }
    };

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        return { daysInMonth, startingDayOfWeek };
    };

    const isDateCompleted = (date, habit) => {
        return habit.completedDates.some(completedDate => {
            const d = new Date(completedDate);
            return d.getDate() === date.getDate() &&
                d.getMonth() === date.getMonth() &&
                d.getFullYear() === date.getFullYear();
        });
    };

    const getCompletionCountForDate = (date) => {
        return habits.filter(habit => isDateCompleted(date, habit)).length;
    };

    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
    const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    const previousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(<div key={`empty-${i}`} className="aspect-square"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const completionCount = getCompletionCountForDate(date);
        const isToday = new Date().toDateString() === date.toDateString();

        days.push(
            <motion.div
                key={day}
                whileHover={{ scale: 1.05 }}
                className={`aspect-square p-2 rounded-lg border transition-all ${isToday
                        ? 'border-indigo-500 bg-indigo-50'
                        : completionCount > 0
                            ? 'border-green-200 bg-green-50'
                            : 'border-gray-100 bg-white'
                    }`}
            >
                <div className="text-sm font-medium text-gray-700">{day}</div>
                {completionCount > 0 && (
                    <div className="mt-1">
                        <div className="flex flex-wrap gap-0.5">
                            {Array.from({ length: Math.min(completionCount, 6) }).map((_, i) => (
                                <div key={i} className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                            ))}
                        </div>
                        {completionCount > 6 && (
                            <div className="text-xs text-green-600 font-medium mt-0.5">+{completionCount - 6}</div>
                        )}
                    </div>
                )}
            </motion.div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                    <CalendarIcon size={32} />
                    Calendar View
                </h1>
                <p className="text-gray-500 mt-1">Track your progress over time.</p>
            </div>

            {loading ? (
                <div className="text-center py-10 text-gray-400">Loading calendar...</div>
            ) : (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    {/* Month Navigation */}
                    <div className="flex items-center justify-between mb-6">
                        <button
                            onClick={previousMonth}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <h2 className="text-xl font-bold text-gray-900">{monthName}</h2>
                        <button
                            onClick={nextMonth}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    {/* Day Headers */}
                    <div className="grid grid-cols-7 gap-2 mb-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="text-center text-sm font-semibold text-gray-500">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-2">
                        {days}
                    </div>

                    {/* Legend */}
                    <div className="mt-6 flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded border-2 border-indigo-500 bg-indigo-50"></div>
                            <span className="text-gray-600">Today</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded border border-green-200 bg-green-50"></div>
                            <span className="text-gray-600">Completed habits</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarView;
