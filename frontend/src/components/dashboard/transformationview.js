import React, { useState } from 'react';
import {
    Card, CardHeader, CardBody,
    Stack, Flex, Text, Box, Heading,
    SimpleGrid, Button, Progress,
    Tabs, TabList, Tab, TabPanels, TabPanel
} from '@chakra-ui/react';
import {
    Brain, Users, Book, MessageCircle
} from 'lucide-react';
import {
    RadarChart, Radar, PolarGrid, PolarAngleAxis,
    PolarRadiusAxis, ResponsiveContainer
} from 'recharts';

// Changed component name to TransformationView
export const TransformationView = ({ data, timeframe }) => {
    const [selectedInsight, setSelectedInsight] = useState(null);

    // Rest of your code stays exactly the same
    const InsightCard = ({ title, value, icon: Icon, description, trend, onClick }) => (
        <Card 
            onClick={onClick}
            _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
            transition="all 0.2s"
            cursor="pointer"
        >
            <CardBody p={6}>
                <Flex justify="space-between" align="center" mb={4}>
                    <Icon size={24} className="text-blue-500" />
                    <Text 
                        fontSize="sm" 
                        color={trend > 0 ? 'green.500' : 'red.500'}
                    >
                        {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
                    </Text>
                </Flex>
                <Heading size="md" mb={2}>{title}</Heading>
                <Text fontSize="2xl" fontWeight="bold" mb={2}>{value}</Text>
                <Text fontSize="sm" color="gray.500">{description}</Text>
            </CardBody>
        </Card>
    );

    // Keep all your existing code exactly the same...
    const ProgressTracker = ({ dimensions }) => (
        <Stack spacing={4}>
            {dimensions.map((dim) => (
                <Box key={dim.name}>
                    <Flex justify="space-between" mb={2}>
                        <Text>{dim.name}</Text>
                        <Text fontWeight="medium">{dim.progress}%</Text>
                    </Flex>
                    <Progress value={dim.progress} size="sm" colorScheme="blue" />
                </Box>
            ))}
        </Stack>
    );

    const sections = {
        cognitive: {
            title: "Cognitive Development",
            icon: Brain,
            metrics: {
                technicalMastery: data?.cognitive?.technicalMastery || 85,
                problemSolving: data?.cognitive?.problemSolving || 78,
                analyticalThinking: data?.cognitive?.analyticalThinking || 82
            }
        },
        social: {
            title: "Social Impact",
            icon: Users,
            metrics: {
                collaboration: data?.social?.collaboration || 88,
                leadership: data?.social?.leadership || 75,
                communityInfluence: data?.social?.communityInfluence || 70
            }
        },
        educational: {
            title: "Educational Progress",
            icon: Book,
            metrics: {
                courseCompletion: data?.educational?.courseCompletion || 92,
                skillApplication: data?.educational?.skillApplication || 85,
                knowledgeRetention: data?.educational?.knowledgeRetention || 88
            }
        },
        linguistic: {
            title: "Communication Growth",
            icon: MessageCircle,
            metrics: {
                technicalCommunication: data?.linguistic?.technicalCommunication || 80,
                documentation: data?.linguistic?.documentation || 75,
                presentation: data?.linguistic?.presentation || 85
            }
        }
    };

    return (
        <Stack spacing={6}>
            {/* Quick Insights Grid */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
                {Object.entries(sections).map(([key, section]) => (
                    <InsightCard
                        key={key}
                        title={section.title}
                        value={`${Object.values(section.metrics).reduce((a, b) => a + b, 0) / 3}%`}
                        icon={section.icon}
                        description={`Tracking ${Object.keys(section.metrics).length} key metrics`}
                        trend={5}
                        onClick={() => setSelectedInsight(key)}
                    />
                ))}
            </SimpleGrid>

            {/* Detailed Analysis Section */}
            <Card>
                <CardHeader>
                    <Heading size="md">Comprehensive Development Analysis</Heading>
                </CardHeader>
                <CardBody>
                    <Tabs>
                        <TabList>
                            <Tab>Progress Tracking</Tab>
                            <Tab>Skill Development</Tab>
                            <Tab>Impact Analysis</Tab>
                            <Tab>Future Trajectory</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                                    {/* Radar Chart for Multi-dimensional Progress */}
                                    <Box height="400px">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <RadarChart data={Object.values(sections).map(s => ({
                                                subject: s.title,
                                                value: Object.values(s.metrics).reduce((a, b) => a + b, 0) / 3
                                            }))}>
                                                <PolarGrid />
                                                <PolarAngleAxis dataKey="subject" />
                                                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                                                <Radar 
                                                    name="Overall Progress" 
                                                    dataKey="value" 
                                                    stroke="#8884d8" 
                                                    fill="#8884d8" 
                                                    fillOpacity={0.6} 
                                                />
                                            </RadarChart>
                                        </ResponsiveContainer>
                                    </Box>

                                    {/* Detailed Progress Tracking */}
                                    <Box>
                                        <Heading size="md" mb={6}>Development Progress</Heading>
                                        <ProgressTracker dimensions={[
                                            { name: "Technical Skills", progress: 85 },
                                            { name: "Soft Skills", progress: 78 },
                                            { name: "Leadership", progress: 72 },
                                            { name: "Innovation", progress: 80 }
                                        ]} />
                                    </Box>
                                </SimpleGrid>
                            </TabPanel>

                            <TabPanel>
                                <Text>Skill Development content coming soon...</Text>
                            </TabPanel>

                            <TabPanel>
                                <Text>Impact Analysis content coming soon...</Text>
                            </TabPanel>

                            <TabPanel>
                                <Text>Future Trajectory content coming soon...</Text>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </CardBody>
            </Card>

            {/* Real-world Impact Section */}
            <Card>
                <CardHeader>
                    <Heading size="md">Real-world Impact</Heading>
                </CardHeader>
                <CardBody>
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                        <Box p={4} bg="blue.50" borderRadius="lg">
                            <Heading size="sm" mb={2}>Career Growth</Heading>
                            <Text fontSize="2xl" fontWeight="bold">+45%</Text>
                            <Text fontSize="sm" color="gray.500">Increase in job opportunities</Text>
                        </Box>
                        <Box p={4} bg="green.50" borderRadius="lg">
                            <Heading size="sm" mb={2}>Project Success</Heading>
                            <Text fontSize="2xl" fontWeight="bold">92%</Text>
                            <Text fontSize="sm" color="gray.500">Implementation success rate</Text>
                        </Box>
                        <Box p={4} bg="purple.50" borderRadius="lg">
                            <Heading size="sm" mb={2}>Innovation Impact</Heading>
                            <Text fontSize="2xl" fontWeight="bold">15</Text>
                            <Text fontSize="sm" color="gray.500">New solutions implemented</Text>
                        </Box>
                    </SimpleGrid>
                </CardBody>
            </Card>
        </Stack>
    );
};

// Add both named and default export
export default TransformationView;