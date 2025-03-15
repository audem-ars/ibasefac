import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardBody, Progress, Button } from '@chakra-ui/react';
import { Trophy, Star, Zap, Users, Target, Book, Medal, Gift } from 'lucide-react';

export const gamificationview = ({ user, gamificationData }) => {
    const [showReward, setShowReward] = useState(false);
    const [currentChallenges, setCurrentChallenges] = useState([]);
    const [achievements, setAchievements] = useState([]);

    // Level Progress Component
    const LevelProgress = () => (
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-2xl font-bold">Level {gamificationData.level.current}</h3>
                        <p className="text-sm text-gray-600">Experience Points: {gamificationData.level.experience}</p>
                    </div>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                        <Star className="w-8 h-8 text-yellow-500" />
                    </motion.div>
                </div>
                <Progress 
                    value={(gamificationData.level.experience / gamificationData.level.nextLevelAt) * 100} 
                    className="h-2 mb-2"
                />
                <p className="text-sm text-right text-gray-600">
                    {gamificationData.level.nextLevelAt - gamificationData.level.experience} XP to next level
                </p>
            </CardContent>
        </Card>
    );

    // Daily Challenges Component
    const DailyChallenges = () => (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Daily Challenges
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {gamificationData.challenges.map((challenge, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-background/50 p-4 rounded-lg"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-medium">{challenge.title}</h4>
                                    <p className="text-sm text-gray-600">{challenge.description}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-primary font-bold">+{challenge.xp} XP</div>
                                    <Progress value={challenge.progress} className="w-24 h-2" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );

    // Achievements Showcase
    const AchievementsGrid = () => (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Trophy className="w-5 h-5 mr-2" />
                    Achievements
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {gamificationData.achievements.map((achievement, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`p-4 rounded-lg text-center ${
                                achievement.unlocked 
                                    ? 'bg-primary/10' 
                                    : 'bg-gray-100 opacity-50'
                            }`}
                        >
                            <div className="relative">
                                <Medal className={`w-8 h-8 mx-auto ${
                                    achievement.unlocked 
                                        ? 'text-primary' 
                                        : 'text-gray-400'
                                }`} />
                                {achievement.unlocked && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-1 -right-1"
                                    >
                                        <Star className="w-4 h-4 text-yellow-500" />
                                    </motion.div>
                                )}
                            </div>
                            <h4 className="mt-2 font-medium">{achievement.title}</h4>
                            <p className="text-xs text-gray-600">{achievement.description}</p>
                        </motion.div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );

    // Skill Tree Component
    const SkillTree = () => (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Book className="w-5 h-5 mr-2" />
                    Skill Tree
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative p-4">
                    {/* Skill nodes and connections visualization */}
                    <div className="grid grid-cols-3 gap-4">
                        {gamificationData.skillTree.map((skill, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.1 }}
                                className={`p-4 rounded-lg text-center cursor-pointer ${
                                    skill.unlocked 
                                        ? 'bg-primary/10' 
                                        : 'bg-gray-100'
                                }`}
                            >
                                <h4 className="font-medium">{skill.name}</h4>
                                <Progress value={skill.progress} className="mt-2 h-1" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    // Social Features Component
    const SocialFeatures = () => (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Community
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* Team Challenges */}
                    <div className="bg-primary/5 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Team Challenge</h4>
                        <Progress value={gamificationData.teamProgress} className="mb-2" />
                        <p className="text-sm text-gray-600">
                            Team working towards: {gamificationData.teamChallenge}
                        </p>
                    </div>

                    {/* Peer Recognition */}
                    <div className="space-y-2">
                        {gamificationData.peerRecognitions?.map((recognition, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <Medal className="w-4 h-4 text-primary" />
                                <span className="text-sm">{recognition.message}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    // Reward Marketplace
    const RewardMarketplace = () => (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Gift className="w-5 h-5 mr-2" />
                    Reward Shop
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {gamificationData.rewards.map((reward, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="p-4 bg-primary/5 rounded-lg text-center"
                        >
                            <Gift className="w-8 h-8 mx-auto text-primary mb-2" />
                            <h4 className="font-medium">{reward.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">{reward.cost} points</p>
                            <Button 
                                size="sm" 
                                variant="outline"
                                disabled={gamificationData.points < reward.cost}
                            >
                                Redeem
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LevelProgress />
                <DailyChallenges />
            </div>

            <AchievementsGrid />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SkillTree />
                <SocialFeatures />
            </div>

            <RewardMarketplace />

            {/* Celebration Modal */}
            <AnimatePresence>
                {showReward && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                    >
                        <Card className="w-96 text-center">
                            <CardContent className="p-6">
                                <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
                                <h2 className="text-2xl font-bold mb-2">Achievement Unlocked!</h2>
                                <p>You've earned a new reward!</p>
                                <Button 
                                    className="mt-4" 
                                    onClick={() => setShowReward(false)}
                                >
                                    Claim Reward
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default gamificationview;