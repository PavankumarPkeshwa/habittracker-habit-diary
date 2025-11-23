import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HabitCard from './HabitCard';
import CreateHabit from './CreateHabit';
import EditHabit from './EditHabit';
import { Plus, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = [
    { value: 'all', label: 'All Habits' },
    { value: 'health', label: 'Health' },
    { value: 'productivity', label: 'Productivity' },
    { value: 'mindfulness', label: 'Mindfulness' },
    { value: 'social', label: 'Social' },
    { value: 'screentime', label: 'Screen Time' },
    { value: 'custom', label: 'Custom' },
];

const DailyPlanner = () => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingHabit, setEditingHabit] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [lockedCategory, setLockedCategory] = useState(null);

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

    const toggleHabit = async (id) => {
        try {
            const res = await axios.post(`http://localhost:5000/api/habits/${id}/toggle`);
            setHabits(habits.map(h => h._id === id ? res.data : h));
        } catch (err) {
            console.error('Error toggling habit:', err);
        }
    };

    const logScreenTime = async (id, minutes) => {
        try {
            const res = await axios.post(`http://localhost:5000/api/habits/${id}/screentime`, { minutes });
            setHabits(habits.map(h => h._id === id ? res.data : h));
        } catch (err) {
            console.error('Error logging screen time:', err);
        }
    };

    const deleteHabit = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/habits/${id}`);
            setHabits(habits.filter(h => h._id !== id));
        } catch (err) {
            console.error('Error deleting habit:', err);
            alert('Failed to delete habit. Please try again.');
        }
    };

    const handleEditHabit = (habit) => {
        setEditingHabit(habit);
        setIsEditModalOpen(true);
    };

    const handleHabitUpdated = (updatedHabit) => {
        setHabits(habits.map(h => h._id === updatedHabit._id ? updatedHabit : h));
        setIsEditModalOpen(false);
        setEditingHabit(null);
    };

    const handleHabitCreated = (newHabit) => {
        setHabits([newHabit, ...habits]);
    };

    const handleCreateClick = () => {
        // Lock category if viewing a specific category
        if (selectedCategory !== 'all') {
            setLockedCategory(selectedCategory);
        } else {
            setLockedCategory(null);
        }
        setIsCreateModalOpen(true);
    };

    const filteredHabits = selectedCategory === 'all'
        ? habits
        : habits.filter(h => h.category === selectedCategory);

    // Determine which category to pre-select in the create modal
    const preselectedCategory = selectedCategory === 'all' ? 'custom' : selectedCategory;

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Today's Focus</h1>
                    <p className="text-gray-500 mt-1">Build your better self, one day at a time.</p>
                </div>
                {/* Show + button only when viewing "All Habits" */}
                {selectedCategory === 'all' && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCreateClick}
                        className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
                    >
                        <Plus size={24} />
                    </motion.button>
                )}
            </div>

            {/* Category Filter */}
            <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2">
                <Filter size={18} className="text-gray-400 flex-shrink-0" />
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.value}
                        onClick={() => setSelectedCategory(cat.value)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === cat.value
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="text-center py-10 text-gray-400">Loading your habits...</div>
            ) : (
                <div className="space-y-4">
                    {filteredHabits.length === 0 ? (
                        <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-500 mb-4">
                                {selectedCategory === 'all'
                                    ? 'No habits yet. Click the + button to start!'
                                    : `No ${CATEGORIES.find(c => c.value === selectedCategory)?.label} habits yet.`}
                            </p>
                            {/* Show + button in empty state for specific categories */}
                            {selectedCategory !== 'all' && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleCreateClick}
                                    className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-lg"
                                >
                                    <Plus size={20} />
                                    Add {CATEGORIES.find(c => c.value === selectedCategory)?.label} Habit
                                </motion.button>
                            )}
                        </div>
                    ) : (
                        <>
                            {filteredHabits.map(habit => (
                                <HabitCard
                                    key={habit._id}
                                    habit={habit}
                                    onToggle={toggleHabit}
                                    onScreenTimeLog={logScreenTime}
                                    onDelete={deleteHabit}
                                    onEdit={handleEditHabit}
                                />
                            ))}

                            {/* Show + button at bottom when viewing specific category with habits */}
                            {selectedCategory !== 'all' && (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleCreateClick}
                                    className="w-full flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 border-2 border-dashed border-indigo-300 px-6 py-4 rounded-xl font-medium hover:bg-indigo-100 transition-colors"
                                >
                                    <Plus size={20} />
                                    Add Another {CATEGORIES.find(c => c.value === selectedCategory)?.label} Habit
                                </motion.button>
                            )}
                        </>
                    )}
                </div>
            )}

            <CreateHabit
                isOpen={isCreateModalOpen}
                onClose={() => {
                    setIsCreateModalOpen(false);
                    setLockedCategory(null);
                }}
                onHabitCreated={handleHabitCreated}
                preselectedCategory={preselectedCategory}
                lockedCategory={lockedCategory}
            />

            <EditHabit
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setEditingHabit(null);
                }}
                habit={editingHabit}
                onHabitUpdated={handleHabitUpdated}
            />
        </div>
    );
};

export default DailyPlanner;
