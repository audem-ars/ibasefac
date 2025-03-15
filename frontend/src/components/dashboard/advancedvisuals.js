import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Button, Progress } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { TreeMap, Radar, Sankey, RadialBarChart, RadialBar, PieChart, Pie, ComposedChart, Line, Bar, Area, ScatterChart, Scatter } from 'recharts';
import { Settings, ChevronDown, Sparkles, Crown, Target, Award } from 'lucide-react';

export const advancedvisuals = ({ data, onInteraction }) => {
    const [activeVisual, setActiveVisual] = useState('tree');
    const [colorScheme, setColorScheme] = useState('default');
    const [showSettings, setShowSettings] = useState(false);

    // Enhanced Treemap for Skill Distribution
    const SkillTreemap = () => (
        <Card>
            <CardContent className="p-6">
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <TreeMap
                            data={data.skillDistribution}
                            dataKey="value"
                            aspectRatio={4/3}
                            stroke="#fff"
                            fill="#8884d8"
                            content={CustomTreemapContent}
                        />
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );

    // Interactive Radar Chart for Team Performance
    const TeamRadar = () => (
        <Card>
            <CardContent className="p-6">
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={data.teamMetrics}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="aspect" />
                            <PolarRadiusAxis />
                            <Radar
                                name="Current"
                                dataKey="value"
                                stroke="#8884d8"
                                fill="#8884d8"
                                fillOpacity={0.6}
                            />
                            <Radar
                                name="Target"
                                dataKey="target"
                                stroke="#82ca9d"
                                fill="#82ca9d"
                                fillOpacity={0.6}
                            />
                            <Legend />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );

    // Advanced Multi-metric Chart
    const MultiMetricChart = () => (
        <Card>
            <CardContent className="p-6">
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={data.multiMetrics}>
                            <XAxis dataKey="name" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip />
                            <Legend />
                            <CartesianGrid stroke="#f5f5f5" />
                            <Area yAxisId="left" type="monotone" dataKey="learning" fill="#8884d8" stroke="#8884d8" />
                            <Bar yAxisId="left" dataKey="achievements" barSize={20} fill="#413ea0" />
                            <Line yAxisId="right" type="monotone" dataKey="value" stroke="#ff7300" />
                            <Scatter yAxisId="right" dataKey="breakthroughs" fill="red" />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );

    // Visualization Settings Panel
    const VisualizationSettings = () => (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute right-0 top-12 bg-white rounded-lg shadow-lg p-4 z-10"
        >
            <div className="space-y-4">
                <div>
                    <h4 className="font-medium mb-2">Color Scheme</h4>
                    <div className="grid grid-cols-4 gap-2">
                        {colorSchemes.map((scheme) => (
                            <div
                                key={scheme.name}
                                className={`w-8 h-8 rounded cursor-pointer ${
                                    colorScheme === scheme.name ? 'ring-2 ring-primary' : ''
                                }`}
                                style={{ background: scheme.preview }}
                                onClick={() => setColorScheme(scheme.name)}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="font-medium mb-2">Interaction Mode</h4>
                    <Select
                        value={interactionMode}
                        onValueChange={setInteractionMode}
                        options={[
                            { value: 'click', label: 'Click to Drill Down' },
                            { value: 'hover', label: 'Hover to Preview' },
                            { value: 'both', label: 'Click and Hover' }
                        ]}
                    />
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="space-y-6">
            {/* Visualization Controls */}
            <div className="flex justify-between items-center">
                <div className="space-x-2">
                    <Button
                        variant={activeVisual === 'tree' ? 'default' : 'outline'}
                        onClick={() => setActiveVisual('tree')}
                    >
                        Skill Distribution
                    </Button>
                    <Button
                        variant={activeVisual === 'radar' ? 'default' : 'outline'}
                        onClick={() => setActiveVisual('radar')}
                    >
                        Team Performance
                    </Button>
                    <Button
                        variant={activeVisual === 'multi' ? 'default' : 'outline'}
                        onClick={() => setActiveVisual('multi')}
                    >
                        Multi-metric
                    </Button>
                </div>
                <Button
                    variant="outline"
                    onClick={() => setShowSettings(!showSettings)}
                >
                    <Settings className="w-4 h-4 mr-2" />
                    Customize
                </Button>
            </div>

            {/* Settings Panel */}
            <AnimatePresence>
                {showSettings && <VisualizationSettings />}
            </AnimatePresence>

            {/* Active Visualization */}
            {activeVisual === 'tree' && <SkillTreemap />}
            {activeVisual === 'radar' && <TeamRadar />}
            {activeVisual === 'multi' && <MultiMetricChart />}
        </div>
    );
};

// Power-ups and Special Events Component
export const specialevents = ({ events, powerUps, team }) => {
    const [activeEvent, setActiveEvent] = useState(null);

    // Special Event Card
    const EventCard = ({ event }) => (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative"
        >
            <Card className="overflow-hidden">
                <div 
                    className="h-32 bg-cover bg-center"
                    style={{ backgroundImage: `url(${event.backgroundImage})` }}
                />
                <CardContent className="p-6">
                    <div className="absolute -top-4 right-4">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <h3 className="font-semibold text-lg">{event.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{event.description}</p>
                    <div className="flex justify-between items-center">
                        <div className="text-sm">
                            <span className="text-primary font-medium">
                                {event.participantCount}
                            </span> participants
                        </div>
                        <Button
                            variant={event.joined ? 'outline' : 'default'}
                            onClick={() => joinEvent(event.id)}
                        >
                            {event.joined ? 'Leave' : 'Join'} Event
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );

    // Power-up Selection
    const PowerUpSelector = () => (
        <Card>
            <CardHeader>
                <CardTitle>Available Power-ups</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {powerUps.map((powerUp, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-lg text-center cursor-pointer
                                ${powerUp.active ? 'bg-primary/10' : 'bg-gray-100'}
                            `}
                            onClick={() => activatePowerUp(powerUp.id)}
                        >
                            <div className="w-12 h-12 rounded-full bg-white shadow-lg mx-auto mb-2 flex items-center justify-center">
                                {powerUp.icon}
                            </div>
                            <h4 className="font-medium">{powerUp.name}</h4>
                            <p className="text-sm text-gray-600">{powerUp.effect}</p>
                            <div className="mt-2 text-sm">
                                {powerUp.duration} remaining
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="space-y-6">
            <PowerUpSelector />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map((event, index) => (
                    <EventCard key={index} event={event} />
                ))}
            </div>
        </div>
    );
};

export default { advancedvisuals, specialevents };