import React, { useState } from 'react';
import { CheckCircle, Circle, Flame, Clock, AlertCircle, Trash2, Edit2 } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORY_STYLES = {
    health: {
        bgImage: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=300',
        gradient: 'from-green-900/60 to-emerald-900/40',
        textColor: 'text-white',
        iconBg: 'bg-white/25 backdrop-blur-sm',
        iconColor: 'text-white',
    },
    productivity: {
        bgImage: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800&h=300',
        gradient: 'from-blue-900/60 to-indigo-900/40',
        textColor: 'text-white',
        iconBg: 'bg-white/25 backdrop-blur-sm',
        iconColor: 'text-white',
    },
    mindfulness: {
        bgImage: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800&h=300',
        gradient: 'from-purple-900/60 to-pink-900/40',
        textColor: 'text-white',
        iconBg: 'bg-white/25 backdrop-blur-sm',
        iconColor: 'text-white',
    },
    social: {
        bgImage: 'https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=800&h=300',
        gradient: 'from-pink-900/60 to-rose-900/40',
        textColor: 'text-white',
        iconBg: 'bg-white/25 backdrop-blur-sm',
        iconColor: 'text-white',
    },
    screentime: {
        bgImage: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800&h=300',
        gradient: 'from-orange-900/60 to-red-900/40',
        textColor: 'text-white',
        iconBg: 'bg-white/25 backdrop-blur-sm',
        iconColor: 'text-white',
    },
    custom: {
        bgImage: 'https://images.pexels.com/photos/3243/pen-calendar-to-do-checklist.jpg?auto=compress&cs=tinysrgb&w=800&h=300',
        gradient: 'from-slate-900/60 to-gray-900/40',
        textColor: 'text-white',
        iconBg: 'bg-white/25 backdrop-blur-sm',
        iconColor: 'text-white',
    },
};

const HabitCard = ({ habit, onToggle, onScreenTimeLog, onDelete, onEdit }) => {
    const [screenTimeMinutes, setScreenTimeMinutes] = useState('');
    const [showTimeInput, setShowTimeInput] = useState(false);

    const isCompletedToday = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return habit.completedDates.some(date => {
            const d = new Date(date);
            d.setHours(0, 0, 0, 0);
            return d.getTime() === today.getTime();
        });
    };

    const getTodayScreenTime = () => {
        if (!habit.screenTimeLog || habit.screenTimeLog.length === 0) return 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayLog = habit.screenTimeLog.find(log => {
            const logDate = new Date(log.date);
            logDate.setHours(0, 0, 0, 0);
            return logDate.getTime() === today.getTime();
        });
        return todayLog ? todayLog.minutes : 0;
    };

    const handleScreenTimeSubmit = async () => {
        if (!screenTimeMinutes || screenTimeMinutes <= 0) return;
        await onScreenTimeLog(habit._id, parseInt(screenTimeMinutes));
        setScreenTimeMinutes('');
        setShowTimeInput(false);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        if (window.confirm(`Are you sure you want to delete "${habit.name}"?`)) {
            onDelete(habit._id);
        }
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        onEdit(habit);
    };

    const completed = isCompletedToday();
    const todayScreenTime = getTodayScreenTime();
    const isOverGoal = habit.habitType === 'timer' && todayScreenTime > habit.screenTimeGoal;

    const categoryStyle = CATEGORY_STYLES[habit.category] || CATEGORY_STYLES.custom;

    // Screen Time Habit Card
    if (habit.habitType === 'timer') {
        return (
            <motion.div
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-xl shadow-sm border transition-all duration-200 relative overflow-hidden group
          ${isOverGoal ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100'}
        `}
            >
                {/* Action Buttons */}
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <button
                        onClick={handleEdit}
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        <Edit2 size={16} />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>

                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${isOverGoal ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                            <Clock size={24} />
                        </div>
                        <div>
                            <h3 className={`font-semibold text-lg ${isOverGoal ? 'text-red-900' : 'text-gray-800'}`}>{habit.name}</h3>
                            <p className="text-sm text-gray-500">{habit.description || 'Track your screen time'}</p>
                        </div>
                    </div>
                    {isOverGoal && <AlertCircle className="text-red-500" size={20} />}
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{todayScreenTime}</p>
                            <p className="text-xs text-gray-500">minutes today</p>
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-semibold text-gray-600">{habit.screenTimeGoal}</p>
                            <p className="text-xs text-gray-500">goal</p>
                        </div>
                    </div>

                    {!showTimeInput ? (
                        <button
                            onClick={() => setShowTimeInput(true)}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                        >
                            Log Time
                        </button>
                    ) : (
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                value={screenTimeMinutes}
                                onChange={(e) => setScreenTimeMinutes(e.target.value)}
                                placeholder="mins"
                                className="w-20 p-2 rounded-lg border border-gray-200 text-sm"
                                autoFocus
                            />
                            <button
                                onClick={handleScreenTimeSubmit}
                                className="bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setShowTimeInput(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <Circle size={20} />
                            </button>
                        </div>
                    )}
                </div>

                <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className={`h-2 rounded-full transition-all ${isOverGoal ? 'bg-red-500' : 'bg-green-500'}`}
                            style={{ width: `${Math.min((todayScreenTime / habit.screenTimeGoal) * 100, 100)}%` }}
                        />
                    </div>
                </div>
            </motion.div>
        );
    }

    // Regular Habit Card with Background Image
    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`relative overflow-hidden rounded-2xl shadow-lg border-2 transition-all duration-200 cursor-pointer group h-28
        ${completed ? 'border-white/50 shadow-xl' : 'border-transparent'}
      `}
            onClick={() => onToggle(habit._id)}
        >
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${categoryStyle.bgImage})` }}
            >
                <div className={`absolute inset-0 bg-gradient-to-r ${categoryStyle.gradient}`} />
            </div>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <button
                    onClick={handleEdit}
                    className="p-2 bg-blue-500/90 backdrop-blur-sm text-white rounded-lg hover:bg-blue-600 hover:scale-110 shadow-lg transition-all"
                >
                    <Edit2 size={16} />
                </button>
                <button
                    onClick={handleDelete}
                    className="p-2 bg-red-500/90 backdrop-blur-sm text-white rounded-lg hover:bg-red-600 hover:scale-110 shadow-lg transition-all"
                >
                    <Trash2 size={16} />
                </button>
            </div>

            <div className="relative z-10 p-5 flex items-center justify-between h-full">
                <div className="flex items-center gap-4 flex-1">
                    <div className={`p-3 rounded-xl ${categoryStyle.iconBg} ${categoryStyle.iconColor} shadow-lg`}>
                        <CheckCircle size={24} strokeWidth={2.5} />
                    </div>
                    <div className="flex-1">
                        <h3 className={`font-bold text-lg ${categoryStyle.textColor} drop-shadow-lg`}>
                            {habit.name}
                        </h3>
                        <p className={`text-sm ${categoryStyle.textColor} opacity-95 drop-shadow-md mt-0.5`}>
                            {habit.description || 'Keep it up!'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold px-3 py-2 rounded-xl shadow-lg">
                        <Flame size={16} />
                        <span className="text-base">{habit.streak}</span>
                    </div>
                    <div className={`text-2xl ${completed ? 'text-white drop-shadow-lg scale-110' : 'text-white/30'} transition-all`}>
                        {completed ? <CheckCircle className="fill-white" strokeWidth={2} /> : <Circle strokeWidth={2} />}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default HabitCard;
