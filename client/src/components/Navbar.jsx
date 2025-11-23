import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Trophy, BarChart2, Calendar } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
            <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link to="/" className="text-xl font-bold text-indigo-600 flex items-center gap-2">
                    <Layout className="text-indigo-600" />
                    HabitDiary
                </Link>

                <div className="flex items-center gap-6">
                    <Link
                        to="/"
                        className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive('/') ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                        <Layout size={18} />
                        Planner
                    </Link>
                    <Link
                        to="/challenges"
                        className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive('/challenges') ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                        <Trophy size={18} />
                        Challenges
                    </Link>
                    <Link
                        to="/stats"
                        className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive('/stats') ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                        <BarChart2 size={18} />
                        Progress
                    </Link>
                    <Link
                        to="/calendar"
                        className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive('/calendar') ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                        <Calendar size={18} />
                        Calendar
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
