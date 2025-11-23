import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, CheckCircle, Zap, Book, Heart, Sun, Moon, Smartphone, Youtube, Instagram, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ICONS = [
    { name: 'CheckCircle', component: CheckCircle },
    { name: 'Zap', component: Zap },
    { name: 'Book', component: Book },
    { name: 'Heart', component: Heart },
    { name: 'Sun', component: Sun },
    { name: 'Moon', component: Moon },
    { name: 'Smartphone', component: Smartphone },
    { name: 'Youtube', component: Youtube },
    { name: 'Instagram', component: Instagram },
    { name: 'Clock', component: Clock },
];

const CATEGORIES = [
    { value: 'health', label: 'Health & Fitness', color: 'bg-green-100 text-green-700' },
    { value: 'productivity', label: 'Productivity', color: 'bg-blue-100 text-blue-700' },
    { value: 'mindfulness', label: 'Mindfulness', color: 'bg-purple-100 text-purple-700' },
    { value: 'social', label: 'Social', color: 'bg-pink-100 text-pink-700' },
    { value: 'screentime', label: 'Screen Time', color: 'bg-orange-100 text-orange-700' },
    { value: 'custom', label: 'Custom', color: 'bg-gray-100 text-gray-700' },
];

const EditHabit = ({ isOpen, onClose, habit, onHabitUpdated }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('CheckCircle');
    const [frequency, setFrequency] = useState('daily');
    const [category, setCategory] = useState('custom');
    const [habitType, setHabitType] = useState('checkbox');
    const [screenTimeGoal, setScreenTimeGoal] = useState(120);

    useEffect(() => {
        if (habit) {
            setName(habit.name || '');
            setDescription(habit.description || '');
            setSelectedIcon(habit.icon || 'CheckCircle');
            setFrequency(habit.frequency || 'daily');
            setCategory(habit.category || 'custom');
            setHabitType(habit.habitType || 'checkbox');
            setScreenTimeGoal(habit.screenTimeGoal || 120);
        }
    }, [habit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:5000/api/habits/${habit._id}`, {
                name,
                description,
                icon: selectedIcon,
                frequency,
                category,
                habitType,
                screenTimeGoal: habitType === 'timer' ? screenTimeGoal : 0,
            });
            onHabitUpdated(res.data);
            onClose();
        } catch (err) {
            console.error('Error updating habit:', err);
            alert('Failed to update habit. Please try again.');
        }
    };

    if (!isOpen || !habit) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Edit Habit</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Habit Type</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    type="button"
                                    onClick={() => setHabitType('checkbox')}
                                    className={`p-3 rounded-xl border-2 transition-all ${habitType === 'checkbox' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}`}
                                >
                                    <CheckCircle className="mx-auto mb-1" size={20} />
                                    <span className="text-sm font-medium">Regular Habit</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setHabitType('timer')}
                                    className={`p-3 rounded-xl border-2 transition-all ${habitType === 'timer' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}`}
                                >
                                    <Clock className="mx-auto mb-1" size={20} />
                                    <span className="text-sm font-medium">Screen Time</span>
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Habit Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                placeholder={habitType === 'timer' ? 'e.g., Instagram Usage' : 'e.g., Read 30 mins'}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                placeholder="Why do you want to do this?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <div className="grid grid-cols-2 gap-2">
                                {CATEGORIES.map((cat) => (
                                    <button
                                        key={cat.value}
                                        type="button"
                                        onClick={() => setCategory(cat.value)}
                                        className={`p-2 rounded-lg text-sm font-medium transition-all ${category === cat.value ? cat.color + ' ring-2 ring-offset-1 ring-indigo-500' : 'bg-gray-50 text-gray-600'}`}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {habitType === 'timer' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Daily Goal (minutes)
                                </label>
                                <input
                                    type="number"
                                    value={screenTimeGoal}
                                    onChange={(e) => setScreenTimeGoal(parseInt(e.target.value))}
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                    placeholder="120"
                                    min="0"
                                />
                                <p className="text-xs text-gray-500 mt-1">Try to stay under this limit</p>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Choose Icon</label>
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {ICONS.map((icon) => {
                                    const IconComp = icon.component;
                                    return (
                                        <button
                                            key={icon.name}
                                            type="button"
                                            onClick={() => setSelectedIcon(icon.name)}
                                            className={`p-3 rounded-xl transition-all flex-shrink-0 ${selectedIcon === icon.name ? 'bg-indigo-100 text-indigo-600 ring-2 ring-indigo-500' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                                        >
                                            <IconComp size={24} />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                        >
                            Update Habit
                        </button>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default EditHabit;
