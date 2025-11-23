import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChallengeCard from '../components/ChallengeCard';

const Challenges = () => {
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchChallenges();
    }, []);

    const fetchChallenges = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/challenges');
            setChallenges(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching challenges:', err);
            setLoading(false);
        }
    };

    const handleJoinChallenge = () => {
        // Refresh challenges or navigate to planner
        window.location.href = '/';
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Challenges</h1>
                <p className="text-gray-500 mt-1">Push your limits with curated habit streaks.</p>
            </div>

            {loading ? (
                <div className="text-center py-10 text-gray-400">Loading challenges...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {challenges.length === 0 ? (
                        <div className="col-span-full text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-500">No challenges available right now.</p>
                        </div>
                    ) : (
                        challenges.map(challenge => (
                            <ChallengeCard
                                key={challenge._id}
                                challenge={challenge}
                                onJoin={handleJoinChallenge}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Challenges;
