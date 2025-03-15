import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardBody, Button, Progress } from '@chakra-ui/react';
import { Trophy, Star, Gift, Users, Target, Zap, Award, Crown, Rocket, Brain } from 'lucide-react';

export const gameelements = ({ user, metrics, achievements }) => {
    const [showReward, setShowReward] = useState(false);
    const [selectedChallenge, setSelectedChallenge] = useState(null);

    // Achievement Display
    const AchievementCard = ({ achievement }) => (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative"
        >
            <Card className={`${achievement.unlocked ? 'bg-primary/10' : 'bg-gray-100'}`}>
                <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 mx-auto mb-2 relative">
                        {achievement.icon === 'trophy' && <Trophy className="w-full h-full text-yellow-500" />}
                        {achievement.icon === 'star' && <Star className="w-full h-full text-blue-500" />}
                        {achievement.icon === 'rocket' && <Rocket className="w-full h-full text-purple-500" />}
                        {achievement.unlocked && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1"
                            >
                                <div className="w-4 h-4 bg-green-500 rounded-full" />
                            </motion.div>
                        )}
                    </div>
                    <h4 className="font-medium">{achievement.name}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    {!achievement.unlocked && (
                        <div className="mt-2">
                            <Progress value={achievement.progress} className="h-1" />
                            <p className="text-xs text-gray-500 mt-1">
                                {achievement.progress}% Complete
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );

    // Team Challenge Section
    const TeamChallenges = () => (
        <Card>
            <CardHeader>
                <CardTitle>Team Challenges</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {metrics.teamChallenges.map((challenge, index) => (
                        <div 
                            key={index}
                            className="p-4 bg-background rounded-lg hover:bg-primary/5 transition-all cursor-pointer"
                            onClick={() => setSelectedChallenge(challenge)}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="font-medium">{challenge.title}</h4>
                                    <p className="text-sm text-gray-600">
                                        {challenge.description}
                                    </p>
                                </div>
                                <Award className="w-6 h-6 text-primary" />
                            </div>
                            <Progress value={challenge.progress} className="h-1 mb-1" />
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>{challenge.teamMembers.length} participants</span>
                                <span>{challenge.timeLeft} remaining</span>
                            </div>
                        </div>
                    ))}
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
                <div className="grid grid-cols-2 gap-4">
                    {metrics.rewards.map((reward, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            className="p-4 bg-primary/5 rounded-lg"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium">{reward.name}</h4>
                                <span className="text-sm font-bold text-primary">
                                    {reward.cost} pts
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">
                                {reward.description}
                            </p>
                            <Button 
                                className="w-full"
                                disabled={user.points < reward.cost}
                                onClick={() => redeemReward(reward)}
                            >
                                Redeem
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );

    // Social Features
    const SocialHub = () => (
        <Card>
            <CardHeader>
                <CardTitle>Team Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {metrics.teamActivity.map((activity, index) => (
                        <div key={index} className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                {activity.type === 'achievement' && <Trophy className="w-5 h-5 text-yellow-500" />}
                                {activity.type === 'challenge' && <Target className="w-5 h-5 text-blue-500" />}
                                {activity.type === 'milestone' && <Star className="w-5 h-5 text-purple-500" />}
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">{activity.user}</p>
                                <p className="text-sm text-gray-600">{activity.description}</p>
                            </div>
                            <div className="text-sm text-gray-500">
                                {activity.timeAgo}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Level</p>
                                <h3 className="text-2xl font-bold">{user.level}</h3>
                            </div>
                            <Crown className="w-8 h-8 text-yellow-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Points</p>
                                <h3 className="text-2xl font-bold">{user.points}</h3>
                            </div>
                            <Star className="w-8 h-8 text-blue-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Streak</p>
                                <h3 className="text-2xl font-bold">{user.streak} days</h3>
                            </div>
                            <Zap className="w-8 h-8 text-yellow-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Team Rank</p>
                                <h3 className="text-2xl font-bold">#{user.teamRank}</h3>
                            </div>
                            <Users className="w-8 h-8 text-purple-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Achievement Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {achievements.map((achievement, index) => (
                    <AchievementCard 
                        key={index} 
                        achievement={achievement} 
                    />
                ))}
            </div>

            {/* Team and Social Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TeamChallenges />
                <SocialHub />
            </div>

            <RewardMarketplace />

            {/* Reward Animation */}
            <AnimatePresence>
                {showReward && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                    >
                        <Card className="w-96">
                            <CardContent className="p-6 text-center">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1 }}
                                >
                                    <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
                                </motion.div>
                                <h2 className="text-2xl font-bold mb-2">Reward Unlocked!</h2>
                                <p className="mb-4">You've earned a new reward!</p>
                                <Button 
                                    className="w-full"
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

export default gameelements;