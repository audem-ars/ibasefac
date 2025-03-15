import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Button, Progress } from '@chakra-ui/react';
import { LineChart, BarChart, AreaChart, Line, Bar, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Users, Brain, Target, Rocket } from 'lucide-react';

export const enterprisemetrics = ({ metrics }) => {
    const [timeframe, setTimeframe] = useState('month');
    
    // ROI Analytics Component
    const ROITracker = () => (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>ROI Analytics</span>
                    <DollarSign className="w-5 h-5 text-green-500" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={metrics.roiData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area 
                                type="monotone" 
                                dataKey="investment" 
                                stackId="1"
                                stroke="#8884d8" 
                                fill="#8884d8" 
                            />
                            <Area 
                                type="monotone" 
                                dataKey="return" 
                                stackId="1"
                                stroke="#82ca9d" 
                                fill="#82ca9d" 
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center">
                        <div className="text-sm text-gray-600">Current ROI</div>
                        <div className="text-2xl font-bold text-green-500">
                            {metrics.currentROI}%
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm text-gray-600">Projected ROI</div>
                        <div className="text-2xl font-bold">
                            {metrics.projectedROI}%
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm text-gray-600">Time to ROI</div>
                        <div className="text-2xl font-bold">
                            {metrics.timeToROI} months
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    // Value Creation Metrics
    const ValueCreation = () => (
        <Card>
            <CardHeader>
                <CardTitle>Value Creation Metrics</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {Object.entries(metrics.valueCreation).map(([key, value]) => (
                        <div key={key} className="p-4 bg-primary/5 rounded-lg">
                            <div className="text-sm text-gray-600 mb-1">{key}</div>
                            <div className="text-2xl font-bold">${value.toLocaleString()}</div>
                            <div className="text-sm text-gray-600">
                                {value > metrics.previousValue ? '↑' : '↓'} 
                                {Math.abs(((value - metrics.previousValue) / metrics.previousValue) * 100).toFixed(1)}%
                            </div>
                        </div>
                    ))}
                </div>
                <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={metrics.valueCreationTrend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="value" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );

    // Innovation Metrics
    const InnovationTracker = () => (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Innovation Impact</span>
                    <Rocket className="w-5 h-5 text-purple-500" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {metrics.innovationMetrics.map((metric, index) => (
                        <div key={index} className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">{metric.name}</span>
                                <span className="text-sm font-medium">{metric.value}%</span>
                            </div>
                            <Progress value={metric.value} className="h-2" />
                        </div>
                    ))}
                </div>
                <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={metrics.innovationBreakdown}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-end space-x-2">
                <Button 
                    variant={timeframe === 'month' ? 'default' : 'outline'}
                    onClick={() => setTimeframe('month')}
                >
                    Monthly
                </Button>
                <Button 
                    variant={timeframe === 'quarter' ? 'default' : 'outline'}
                    onClick={() => setTimeframe('quarter')}
                >
                    Quarterly
                </Button>
                <Button 
                    variant={timeframe === 'year' ? 'default' : 'outline'}
                    onClick={() => setTimeframe('year')}
                >
                    Yearly
                </Button>
            </div>

            <ROITracker />
            <ValueCreation />
            <InnovationTracker />
        </div>
    );
};

// src/components/dashboard/learningoptimization.js
export const learningoptimization = ({ learningData }) => {
    const [selectedSkill, setSelectedSkill] = useState(null);

    // AI-Driven Recommendations
    const AIRecommendations = () => (
        <Card>
            <CardHeader>
                <CardTitle>Personalized Learning Path</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {learningData.recommendations.map((rec, index) => (
                        <div 
                            key={index}
                            className="p-4 bg-primary/5 rounded-lg hover:bg-primary/10 transition-all cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="font-medium">{rec.title}</h4>
                                    <p className="text-sm text-gray-600">{rec.description}</p>
                                </div>
                                <Brain className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex-1">
                                    <Progress value={rec.relevance * 100} className="h-1" />
                                </div>
                                <span className="text-sm text-primary font-medium">
                                    {Math.round(rec.relevance * 100)}% Match
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );

    // Skill Progression Tracking
    const SkillProgression = () => (
        <Card>
            <CardHeader>
                <CardTitle>Skill Mastery Tracking</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    {learningData.skills.map((skill, index) => (
                        <div 
                            key={index}
                            className="p-4 bg-background rounded-lg"
                            onClick={() => setSelectedSkill(skill)}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium">{skill.name}</h4>
                                <span className="text-sm text-primary">
                                    Level {skill.level}
                                </span>
                            </div>
                            <Progress value={skill.progress} className="h-1 mb-2" />
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>{skill.progress}% Complete</span>
                                <span>{skill.timeToNextLevel}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );

    // Learning Velocity Analytics
    const VelocityAnalytics = () => (
        <Card>
            <CardHeader>
                <CardTitle>Learning Velocity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={learningData.velocityData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line 
                                type="monotone" 
                                dataKey="velocity" 
                                stroke="#8884d8" 
                                name="Learning Speed"
                            />
                            <Line 
                                type="monotone" 
                                dataKey="retention" 
                                stroke="#82ca9d" 
                                name="Knowledge Retention"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-600">Learning Velocity</p>
                                <div className="text-2xl font-bold">
                                    {learningData.currentVelocity}x
                                </div>
                            </div>
                            <TrendingUp className="w-8 h-8 text-primary" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-600">Mastery Rate</p>
                                <div className="text-2xl font-bold">
                                    {learningData.masteryRate}%
                                </div>
                            </div>
                            <Target className="w-8 h-8 text-blue-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-600">Knowledge Retention</p>
                                <div className="text-2xl font-bold">
                                    {learningData.retentionRate}%
                                </div>
                            </div>
                            <Brain className="w-8 h-8 text-purple-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <AIRecommendations />
            <SkillProgression />
            <VelocityAnalytics />
        </div>
    );
};

export default { enterprisemetrics, learningoptimization };