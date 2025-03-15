import React from 'react';
import { LineChart, AreaChart, BarChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardBody } from '@chakra-ui/react';
import { TrendingUp, Users, Target, Brain } from 'lucide-react';

export const analyticshub = ({ metrics }) => {
    return (
        <div className="space-y-6">
            {/* Skill Growth Analytics */}
            <Card>
                <CardHeader>
                    <CardTitle>Skill Growth Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={metrics.skillGrowthData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Area 
                                    type="monotone" 
                                    dataKey="technicalSkills" 
                                    stackId="1"
                                    stroke="#8884d8" 
                                    fill="#8884d8" 
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="softSkills" 
                                    stackId="1"
                                    stroke="#82ca9d" 
                                    fill="#82ca9d" 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Value Creation Trends */}
            <Card>
                <CardHeader>
                    <CardTitle>Value Creation Trends</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={metrics.valueCreationData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line 
                                    type="monotone" 
                                    dataKey="personalValue" 
                                    stroke="#8884d8" 
                                    name="Personal Value"
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="teamValue" 
                                    stroke="#82ca9d" 
                                    name="Team Value"
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="enterpriseValue" 
                                    stroke="#ffc658" 
                                    name="Enterprise Value"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// src/components/dashboard/teamhub.js
export const teamhub = ({ teamData }) => {
    return (
        <div className="space-y-6">
            {/* Team Performance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">Team Velocity</h4>
                            <TrendingUp className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-2xl font-bold">
                            {teamData.velocity.current}
                        </div>
                        <div className="text-sm text-gray-600">
                            {teamData.velocity.trend > 0 ? '↑' : '↓'} 
                            {Math.abs(teamData.velocity.trend)}% from last week
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">Team Synergy</h4>
                            <Users className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="text-2xl font-bold">
                            {teamData.synergy.score}%
                        </div>
                        <div className="text-sm text-gray-600">
                            {teamData.synergy.collaborations} collaborations
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">Innovation Score</h4>
                            <Brain className="w-5 h-5 text-purple-500" />
                        </div>
                        <div className="text-2xl font-bold">
                            {teamData.innovation.score}
                        </div>
                        <div className="text-sm text-gray-600">
                            {teamData.innovation.breakthroughs} breakthroughs
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Team Leaderboard */}
            <Card>
                <CardHeader>
                    <CardTitle>Team Leaderboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {teamData.members.map((member, index) => (
                            <div 
                                key={index}
                                className="flex items-center p-4 bg-background rounded-lg"
                            >
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                                    {index + 1}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="font-medium">
                                                {member.name}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {member.role}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-primary">
                                                {member.points} pts
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                Level {member.level}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Team Goals */}
            <Card>
                <CardHeader>
                    <CardTitle>Team Goals</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {teamData.goals.map((goal, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="font-medium">{goal.name}</span>
                                    <span className="text-primary">
                                        {goal.progress}%
                                    </span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full">
                                    <div 
                                        className="h-2 bg-primary rounded-full"
                                        style={{ width: `${goal.progress}%` }}
                                    />
                                </div>
                                <div className="text-sm text-gray-600">
                                    {goal.timeRemaining} remaining
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default { analyticshub, teamhub };