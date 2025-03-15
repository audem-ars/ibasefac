import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardBody, Button } from '@chakra-ui/react';
import { Medal, Star, Trophy, Zap, Heart, Sun, Moon } from 'lucide-react';
import confetti from 'canvas-confetti';

export const personalizedview = ({ user, achievements, preferences }) => {
    const [theme, setTheme] = useState(preferences?.theme || 'light');
    const [recentMilestones, setRecentMilestones] = useState([]);
    const [showCelebration, setShowCelebration] = useState(false);

    // Achievement Badge Component
    const AchievementBadge = ({ achievement }) => (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
        >
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-none">
                <CardContent className="p-4 text-center">
                    <motion.div 
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 group-hover:opacity-100 rounded-lg"
                    />
                    <div className="relative z-10">
                        {achievement.icon === 'medal' && <Medal className="w-8 h-8 mx-auto text-primary" />}
                        {achievement.icon === 'star' && <Star className="w-8 h-8 mx-auto text-yellow-500" />}
                        {achievement.icon === 'trophy' && <Trophy className="w-8 h-8 mx-auto text-purple-500" />}
                        <h4 className="mt-2 font-semibold">{achievement.title}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );

    // Celebration Effects
    const triggerCelebration = () => {
        setShowCelebration(true);
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
        setTimeout(() => setShowCelebration(false), 3000);
    };

    // Progress Path Component
    const ProgressPath = ({ milestones }) => (
        <div className="relative">
            <div className="absolute left-1/2 h-full w-px bg-primary/20" />
            {milestones.map((milestone, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative flex items-center mb-8"
                >
                    <div className={`w-4 h-4 rounded-full ${milestone.completed ? 'bg-primary' : 'bg-gray-300'}`} />
                    <div className="ml-4">
                        <h4 className="font-medium">{milestone.title}</h4>
                        <p className="text-sm text-gray-600">{milestone.description}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );

    // Daily Rewards Component
    const DailyRewards = ({ streak }) => (
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Daily Streak</h3>
                    <div className="flex items-center">
                        <Zap className="w-5 h-5 text-yellow-500 mr-2" />
                        <span className="text-xl font-bold">{streak} days</span>
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {[...Array(7)].map((_, i) => (
                        <div 
                            key={i}
                            className={`h-8 rounded-full ${i < streak % 7 ? 'bg-primary' : 'bg-gray-200'}`}
                        />
                    ))}
                </div>
                <Button 
                    className="w-full mt-4"
                    variant="outline"
                    onClick={() => claimDailyReward()}
                >
                    Claim Daily Reward
                </Button>
            </CardContent>
        </Card>
    );

    // Personalization Controls
    const PersonalizationControls = () => (
        <div className="flex items-center space-x-4">
            <Button
                variant="ghost"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
                {theme === 'light' ? 
                    <Moon className="w-5 h-5" /> : 
                    <Sun className="w-5 h-5" />
                }
            </Button>
            <Button
                variant="ghost"
                onClick={() => toggleFavorite()}
            >
                <Heart className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-current' : ''}`} />
            </Button>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Personalization Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Welcome back, {user.name}!</h2>
                <PersonalizationControls />
            </div>

            {/* Achievement Showcase */}
            <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                {achievements.map((achievement, index) => (
                    <AchievementBadge key={index} achievement={achievement} />
                ))}
            </motion.div>

            {/* Progress and Rewards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Your Learning Journey</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ProgressPath milestones={recentMilestones} />
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <DailyRewards streak={user.streak} />
                    {/* More reward components */}
                </div>
            </div>

            {/* Celebration Overlay */}
            <AnimatePresence>
                {showCelebration && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed inset-0 flex items-center justify-center z-50"
                    >
                        <div className="text-center">
                            <Trophy className="w-24 h-24 text-yellow-500 mx-auto" />
                            <h2 className="text-3xl font-bold mt-4">Congratulations!</h2>
                            <p className="text-xl">You've unlocked a new achievement!</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default personalizedview;