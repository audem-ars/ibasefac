import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from '@chakra-ui/react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react';
import { 
    LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie,
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend 
} from 'recharts';
import { 
    TrendingUp, DollarSign, Users, Target, Brain, Rocket, 
    BarChart2, Download, ZoomIn, Filter 
} from 'lucide-react';

export const enterpriseview = ({ data, timeframe }) => {
    const [selectedMetric, setSelectedMetric] = useState('overview');
    const [drilldownView, setDrilldownView] = useState(null);

    // Value Creation Card
    const ValueMetricCard = ({ title, value, trend, icon: Icon, details }) => (
        <Card className="hover:shadow-lg transition-all">
            <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm text-gray-500">{title}</p>
                        <h3 className="text-2xl font-bold">${value.toLocaleString()}</h3>
                        <span className={`text-sm ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
                        </span>
                    </div>
                    <Icon className="w-8 h-8 text-gray-400" />
                </div>
                <div className="mt-4">
                    <p className="text-sm text-gray-600">{details}</p>
                </div>
            </CardContent>
        </Card>
    );

    // ROI Projections Section
    const ROIProjections = () => (
        <Card>
            <CardHeader>
                <CardTitle>ROI Projections</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data.roiProjections}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="period" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area 
                                type="monotone" 
                                dataKey="conservative" 
                                stackId="1"
                                stroke="#8884d8" 
                                fill="#8884d8" 
                                fillOpacity={0.3}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="expected" 
                                stackId="1"
                                stroke="#82ca9d" 
                                fill="#82ca9d" 
                                fillOpacity={0.3}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="optimistic" 
                                stackId="1"
                                stroke="#ffc658" 
                                fill="#ffc658" 
                                fillOpacity={0.3}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );

    // Innovation Metrics
    const InnovationMetrics = () => (
        <Card>
            <CardHeader>
                <CardTitle>Innovation Impact</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={data.innovationMetrics}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="attribute" />
                                <PolarRadiusAxis />
                                <Radar 
                                    name="Current" 
                                    dataKey="value" 
                                    stroke="#8884d8" 
                                    fill="#8884d8" 
                                    fillOpacity={0.6} 
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-4">
                        <h3 className="font-semibold">Innovation Breakdown</h3>
                        {data.innovationBreakdown?.map((item, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex justify-between">
                                    <span>{item.name}</span>
                                    <span className="font-medium">{item.value}%</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full">
                                    <div 
                                        className="h-2 bg-primary rounded-full" 
                                        style={{ width: `${item.value}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    // Talent Development Metrics
    const TalentMetrics = () => (
        <Card>
            <CardHeader>
                <CardTitle>Talent Development</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-primary/5 rounded-lg">
                        <h4 className="font-semibold">Skill Growth</h4>
                        <div className="text-2xl font-bold">+{data.talentMetrics?.skillGrowth || 0}%</div>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-lg">
                        <h4 className="font-semibold">Promotion Rate</h4>
                        <div className="text-2xl font-bold">{data.talentMetrics?.promotionRate || 0}%</div>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-lg">
                        <h4 className="font-semibold">Retention</h4>
                        <div className="text-2xl font-bold">{data.talentMetrics?.retention || 0}%</div>
                    </div>
                </div>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data.talentTrends}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="period" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="skills" stroke="#8884d8" />
                            <Line type="monotone" dataKey="performance" stroke="#82ca9d" />
                            <Line type="monotone" dataKey="satisfaction" stroke="#ffc658" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="space-y-6">
            {/* Quick Value Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <ValueMetricCard
                    title="Total Business Impact"
                    value={data.totalImpact || 0}
                    trend={data.impactTrend || 0}
                    icon={TrendingUp}
                    details="Overall business value created"
                />
                <ValueMetricCard
                    title="Revenue Growth"
                    value={data.revenueGrowth || 0}
                    trend={data.revenueTrend || 0}
                    icon={DollarSign}
                    details="Direct revenue impact"
                />
                <ValueMetricCard
                    title="Innovation Value"
                    value={data.innovationValue || 0}
                    trend={data.innovationTrend || 0}
                    icon={Brain}
                    details="Value from new initiatives"
                />
                <ValueMetricCard
                    title="Market Impact"
                    value={data.marketImpact || 0}
                    trend={data.marketTrend || 0}
                    icon={Target}
                    details="Market position improvement"
                />
            </div>

            {/* Main Analysis Sections */}
            <Tabs defaultValue="overview">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="roi">ROI & Projections</TabsTrigger>
                    <TabsTrigger value="innovation">Innovation</TabsTrigger>
                    <TabsTrigger value="talent">Talent Development</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    <ROIProjections />
                    <InnovationMetrics />
                </TabsContent>

                <TabsContent value="roi">
                    <ROIProjections />
                </TabsContent>

                <TabsContent value="innovation">
                    <InnovationMetrics />
                </TabsContent>

                <TabsContent value="talent">
                    <TalentMetrics />
                </TabsContent>
            </Tabs>

            {/* Export and Action Buttons */}
            <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => exportData('pdf')}>
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                </Button>
                <Button variant="outline" onClick={() => exportData('excel')}>
                    <Download className="w-4 h-4 mr-2" />
                    Export Excel
                </Button>
                <Button variant="primary" onClick={() => setDrilldownView('detailed')}>
                    <ZoomIn className="w-4 h-4 mr-2" />
                    Detailed Analysis
                </Button>
            </div>
        </div>
    );
};

export default enterpriseview;