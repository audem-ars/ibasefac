import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardBody, Button, Progress } from '@chakra-ui/react';
import { LineChart, AreaChart, BarChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Brain, Target, Book, Star, ChevronDown, ChevronUp, ArrowRight, AlertCircle } from 'lucide-react';

export const metricdrilldown = ({ metrics, userId, teamId }) => {
    const [selectedMetric, setSelectedMetric] = useState(null);
    const [comparisonData, setComparisonData] = useState(null);
    const [timeRange, setTimeRange] = useState('week');

    // Fetch detailed metrics when a metric is selected
    useEffect(() => {
        if (selectedMetric) {
            fetchDetailedMetrics(selectedMetric);
        }
    }, [selectedMetric, timeRange]);

    const fetchDetailedMetrics = async (metricType) => {
        try {
            const response = await fetch(`/api/analytics/detailed/${metricType}?userId=${userId}&timeRange=${timeRange}`);
            const data = await response.json();
            setComparisonData(data);
        } catch (error) {
            console.error('Error fetching detailed metrics:', error);
        }
    };

    // Detailed Metric Card with Drill-down
    const MetricCard = ({ metric }) => (
        <Card 
            className="hover:shadow-lg transition-all cursor-pointer"
            onClick={() => setSelectedMetric(metric.type)}
        >
            <CardContent className="p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-medium">{metric.name}</h3>
                        <div className="text-2xl font-bold">
                            {metric.value}{metric.unit}
                        </div>
                    </div>
                    <div className={`text-sm ${metric.trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {metric.trend > 0 ? '↑' : '↓'} {Math.abs(metric.trend)}%
                    </div>
                </div>
                <Progress value={metric.progress} className="mt-2" />
            </CardContent>
        </Card>
    );

    // Detailed Analysis View
    const DetailedAnalysis = ({ data }) => (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>{data.name} Analysis</span>
                    <Button variant="ghost" onClick={() => setSelectedMetric(null)}>
                        Close
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {/* Time Series Analysis */}
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.timeSeriesData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line 
                                    type="monotone" 
                                    dataKey="value" 
                                    stroke="#8884d8" 
                                    name={data.name}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="benchmark" 
                                    stroke="#82ca9d" 
                                    name="Team Average"
                                    strokeDasharray="3 3"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Contributing Factors */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {data.factors.map((factor, index) => (
                            <div key={index} className="p-4 bg-primary/5 rounded-lg">
                                <div className="text-sm text-gray-600">{factor.name}</div>
                                <div className="text-xl font-bold">{factor.value}</div>
                                <div className="text-sm text-gray-600">
                                    Impact: {factor.impact}%
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Performance Radar */}
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={data.performanceData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="aspect" />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                                <Radar 
                                    name="Your Performance" 
                                    dataKey="value" 
                                    stroke="#8884d8" 
                                    fill="#8884d8" 
                                    fillOpacity={0.6} 
                                />
                                <Radar 
                                    name="Team Average" 
                                    dataKey="average" 
                                    stroke="#82ca9d" 
                                    fill="#82ca9d" 
                                    fillOpacity={0.6} 
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Recommendations */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Optimization Recommendations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {data.recommendations.map((rec, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-start space-x-4 p-4 bg-primary/5 rounded-lg"
                                    >
                                        <AlertCircle className="w-6 h-6 text-primary flex-shrink-0" />
                                        <div>
                                            <h4 className="font-medium">{rec.title}</h4>
                                            <p className="text-sm text-gray-600">{rec.description}</p>
                                            <div className="mt-2">
                                                <Button size="sm" variant="outline">
                                                    Take Action
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="space-y-6">
            {/* Time Range Selection */}
            <div className="flex justify-end space-x-2">
                {['week', 'month', 'quarter', 'year'].map((range) => (
                    <Button
                        key={range}
                        variant={timeRange === range ? 'default' : 'outline'}
                        onClick={() => setTimeRange(range)}
                    >
                        {range.charAt(0).toUpperCase() + range.slice(1)}
                    </Button>
                ))}
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric, index) => (
                    <MetricCard key={index} metric={metric} />
                ))}
            </div>

            {/* Detailed Analysis */}
            <AnimatePresence>
                {selectedMetric && comparisonData && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        <DetailedAnalysis data={comparisonData} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default metricdrilldown;