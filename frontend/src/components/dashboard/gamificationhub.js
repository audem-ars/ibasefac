import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardBody, Tabs, TabList, Tab, TabPanels, TabPanel, Button, Progress } from '@chakra-ui/react';
import { Trophy, Star, Target, Users, Gift, Book, Medal, Crown, Zap, Compass, Calendar, Award } from 'lucide-react';

export const gamificationhub = ({ user, gameData }) => {
    const [activeTab, setActiveTab] = useState('progress');

    // Quick Action Bar - Always visible for easy access
    const QuickActions = () => (
        <div className="flex items-center space-x-4 p-4 bg-background rounded-lg shadow-sm">
            {/* Main progress indicator */}
            <div className="flex-1 flex items-center">
                <div className="rounded-full bg-primary/10 p-2 mr-3">
                    <Trophy className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <div className="text-sm">Level {gameData.level}</div>
                    <Progress value={gameData.progress} className="w-32 h-2" />
                </div>
            </div>

            {/* Daily streak */}
            <div className="flex items-center px-4 border-l border-r">
                <Zap className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="font-semibold">{gameData.streak} Day Streak</span>
            </div>

            {/* Quick actions */}
            <div className="flex space-x-2">
                <Button variant="outline" size="sm" 
                    onClick={() => claimDailyReward()}
                    disabled={gameData.dailyRewardClaimed}>
                    <Gift className="w-4 h-4 mr-2" />
                    Daily Reward
                </Button>
                <Button variant="outline" size="sm">
                    <Users className="w-4 h-4 mr-2" />
                    Team Hub
                </Button>
            </div>
        </div>
    );

    // Main Navigation Tabs - Clear and organized sections
    return (
        <div className="space-y-4">
            <QuickActions />

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 gap-4 bg-transparent">
                    <TabsTrigger value="progress" className="data-[state=active]:bg-primary/10">
                        <Compass className="w-4 h-4 mr-2" />
                        My Journey
                    </TabsTrigger>
                    <TabsTrigger value="challenges" className="data-[state=active]:bg-primary/10">
                        <Target className="w-4 h-4 mr-2" />
                        Challenges
                    </TabsTrigger>
                    <TabsTrigger value="social" className="data-[state=active]:bg-primary/10">
                        <Users className="w-4 h-4 mr-2" />
                        Community
                    </TabsTrigger>
                    <TabsTrigger value="rewards" className="data-[state=active]:bg-primary/10">
                        <Gift className="w-4 h-4 mr-2" />
                        Rewards
                    </TabsTrigger>
                </TabsList>

                {/* Journey Tab - Personal Progress */}
                <TabsContent value="progress">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Skill Progress */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Learning Path</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {gameData.skills.map((skill, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="relative"
                                        >
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm font-medium">{skill.name}</span>
                                                <span className="text-sm text-gray-500">
                                                    {skill.level} / {skill.maxLevel}
                                                </span>
                                            </div>
                                            <Progress value={skill.progress} className="h-2" />
                                            {skill.newUnlock && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="absolute -right-2 -top-2"
                                                >
                                                    <Star className="w-4 h-4 text-yellow-500" />
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Achievements */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Achievements</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {gameData.recentAchievements.map((achievement, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-center p-2 bg-primary/5 rounded-lg"
                                        >
                                            <Medal className="w-8 h-8 text-primary mr-3" />
                                            <div>
                                                <div className="font-medium">{achievement.title}</div>
                                                <div className="text-sm text-gray-500">
                                                    {achievement.description}
                                                </div>
                                            </div>
                                            <div className="ml-auto text-sm text-primary">
                                                +{achievement.xp} XP
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Challenges Tab - Daily & Special Events */}
                <TabsContent value="challenges">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Daily Challenges */}
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Today's Challenges</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {gameData.dailyChallenges.map((challenge, index) => (
                                        <motion.div
                                            key={index}
                                            className="p-4 bg-background rounded-lg"
                                        >
                                            <div className="flex justify-between mb-2">
                                                <div className="font-medium">{challenge.title}</div>
                                                <div className="text-primary">+{challenge.reward} XP</div>
                                            </div>
                                            <Progress value={challenge.progress} className="h-2 mb-2" />
                                            <div className="flex justify-between text-sm text-gray-500">
                                                <span>{challenge.progress}%</span>
                                                <span>{challenge.timeLeft} left</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Special Events */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Special Events</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {gameData.specialEvents.map((event, index) => (
                                        <motion.div
                                            key={index}
                                            className="p-3 bg-primary/5 rounded-lg"
                                        >
                                            <div className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-2 text-primary" />
                                                <span>{event.name}</span>
                                            </div>
                                            <div className="text-sm text-gray-500 mt-1">
                                                {event.timeRemaining}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Social Tab - Community Features */}
                <TabsContent value="social">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Team Progress */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Team Progress</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium">Team Challenge</div>
                                            <div className="text-sm text-gray-500">
                                                {gameData.teamChallenge.description}
                                            </div>
                                        </div>
                                        <Crown className="w-6 h-6 text-yellow-500" />
                                    </div>
                                    <Progress 
                                        value={gameData.teamChallenge.progress} 
                                        className="h-2" 
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Leaderboard */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Leaderboard</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {gameData.leaderboard.map((entry, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex items-center p-2 bg-background rounded-lg"
                                        >
                                            <div className="w-8 text-center font-bold">
                                                #{index + 1}
                                            </div>
                                            <div className="flex-1 ml-3">
                                                <div className="font-medium">{entry.name}</div>
                                                <div className="text-sm text-gray-500">
                                                    Level {entry.level}
                                                </div>
                                            </div>
                                            <div className="text-primary font-medium">
                                                {entry.points} pts
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Rewards Tab */}
                <TabsContent value="rewards">
                    <Card>
                        <CardHeader>
                            <CardTitle>Rewards Shop</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {gameData.rewards.map((reward, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.02 }}
                                        className="p-4 bg-primary/5 rounded-lg"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <Award className="w-8 h-8 text-primary" />
                                            <div className="text-sm font-medium text-primary">
                                                {reward.cost} points
                                            </div>
                                        </div>
                                        <h4 className="font-medium mb-2">{reward.name}</h4>
                                        <p className="text-sm text-gray-500 mb-3">
                                            {reward.description}
                                        </p>
                                        <Button 
                                            className="w-full"
                                            disabled={gameData.points < reward.cost}
                                        >
                                            Redeem
                                        </Button>
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default gamificationhub;