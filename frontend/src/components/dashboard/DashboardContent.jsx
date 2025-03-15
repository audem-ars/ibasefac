// src/components/dashboard/DashboardContent.jsx

import React from 'react';
import { 
    Card, CardHeader, CardBody,
    Stack, Flex, Text, Box, Heading,
    SimpleGrid, Button, Alert, AlertDescription,
    Progress, Badge, Menu, MenuButton,
    MenuList, MenuItem,
    useColorModeValue
} from '@chakra-ui/react';
import {
    LineChart, Line, BarChart, Bar, AreaChart,
    Area, XAxis, YAxis, CartesianGrid,
    Tooltip as RechartsTooltip, Legend,
    ResponsiveContainer
} from 'recharts';
import {
    TrendingUp, Users, Target, AlertCircle,
    Brain, Rocket, Globe, Book,
    MessageCircle, ChevronDown, BarChart2,
    Award, Star, Download, ChevronRight
} from 'lucide-react';

// Import components
import TeamCollaboration from './teamcollaboration';
import ProjectManagement from './projectmanagement';
import PersonalDevelopment from './personaldevelopment';
import LearningResources from './learningresources';
import EducationalTracking from './educationaltracking';
import EnterpriseAnalytics from './enterpriseanalytics';
import TransformationView from './transformationview';
import QuizList from '../quiz/QuizList';
import LearningList from '../Education/LearningList';
import ProjectSandbox from '../development/ProjectSandbox';
import AIRegulationsList from '../regulations/AIRegulationsList';
import { useVision } from '../../context/VisionContext';

const DashboardContent = ({ 
    dashboarddata,
    loading,
    error,
    selectedTimeframe,
    setselectedtimeframe,
    activeView,
    setActiveView,
    calculatetrend,
    onQuickAction
}) => {
    const cardBg = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.600', 'gray.300');
    const { vision } = useVision(); // Add this

    if (loading) {
        return (
            <Flex justify="center" align="center" minH="500px">
                <Stack align="center" spacing={4}>
                    <Text fontSize="lg" color={textColor}>Loading dashboard data...</Text>
                    <Progress size="xs" width="200px" isIndeterminate colorScheme="blue" />
                </Stack>
            </Flex>
        );
    }

    if (error) {
        return (
            <Alert status="error" borderRadius="md">
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    const MetricCard = ({ title, value, previousValue, icon: Icon, prefix = '', suffix = '', description }) => {
        const trend = calculatetrend(value, previousValue);
        const iconBg = useColorModeValue('blue.50', 'blue.900');
        const iconColor = useColorModeValue('blue.500', 'blue.200');
        
        return (
            <Card
                bg={cardBg}
                borderRadius="xl"
                boxShadow="sm"
                transition="all 0.3s"
                _hover={{ transform: 'translateY(-4px)', boxShadow: 'md' }}
            >
                <CardBody p={6}>
                    <Stack spacing={4}>
                        <Flex justify="space-between" align="center">
                            <Box
                                p={3}
                                bg={iconBg}
                                borderRadius="lg"
                                color={iconColor}
                            >
                                <Icon size={24} />
                            </Box>
                            <Badge
                                colorScheme={trend >= 0 ? 'green' : 'red'}
                                px={3}
                                py={1}
                                borderRadius="full"
                                fontSize="sm"
                            >
                                {trend >= 0 ? '↑' : '↓'} {Math.abs(trend).toFixed(1)}%
                            </Badge>
                        </Flex>
                        <Stack spacing={1}>
                            <Text fontSize="sm" color="gray.500">{title}</Text>
                            <Heading size="lg">
                                {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
                            </Heading>
                            {description && (
                                <Text fontSize="sm" color="gray.500">{description}</Text>
                            )}
                        </Stack>
                    </Stack>
                </CardBody>
            </Card>
        );
    };

    const menuItems = [
        'Overview',
        'Enterprise Analytics',
        'Transformation',
        'Learning Resources',
        'Development',
        'Collaboration',
        'Quizzes',
        'AI Regulations'
    ];

    return (
        <Stack spacing={8}>
            {/* Vision Card */}
            <Card bg={cardBg} borderRadius="xl" mb={6}>
                <CardHeader>
                    <Flex justify="space-between" align="center">
                        <Flex align="center" gap={3}>
                            <Target size={24} />
                            <Heading size="md">Your Vision</Heading>
                        </Flex>
                        <Button
                            variant="ghost"
                            colorScheme="blue"
                            rightIcon={<ChevronRight size={16} />}
                            onClick={() => onQuickAction('Learning Path')}
                        >
                            Update Vision
                        </Button>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Stack spacing={4}>
                        <Text fontSize="lg" fontWeight="medium" color={textColor}>
                            {vision?.personalVision || "Define your vision to get started with your AI journey"}
                        </Text>
                        {vision?.lastUpdated && (
                            <Text fontSize="sm" color="gray.500">
                                Last updated: {new Date(vision.lastUpdated).toLocaleDateString()}
                            </Text>
                        )}
                        <Progress
                            value={vision?.progressMetrics?.overall || 0}
                            colorScheme="blue"
                            size="sm"
                            borderRadius="full"
                        />
                    </Stack>
                </CardBody>
            </Card>

            {/* Top Navigation Menu */}
            <Box 
                bg={cardBg} 
                borderRadius="xl" 
                p={4} 
                boxShadow="sm"
            >
                <Flex 
                    gap={4}
                    justify="center" 
                    align="center" 
                    flexWrap="nowrap"
                    borderBottom="2px"
                    borderColor={useColorModeValue('blue.100', 'blue.900')}
                    pb={4}
                    overflowX="auto"
                    sx={{
                        '&::-webkit-scrollbar': {
                            display: 'none'
                        }
                    }}
                >
                    {menuItems.map((item, index) => (
                        <Button
                            key={index}
                            variant="ghost"
                            color={activeView === item.toLowerCase() ? 'blue.500' : textColor}
                            _hover={{ color: 'blue.500' }}
                            onClick={() => setActiveView(item.toLowerCase())}
                            position="relative"
                            px={3}
                            minW="auto"
                            fontSize="sm"
                            _after={{
                                content: '""',
                                position: 'absolute',
                                bottom: '-4px',
                                left: '0',
                                right: '0',
                                height: '2px',
                                bg: activeView === item.toLowerCase() ? 'blue.500' : 'transparent',
                                transition: 'all 0.2s'
                            }}
                        >
                            {item}
                        </Button>
                    ))}
                </Flex>
            </Box>

            {/* Content Panels */}
            <Box mt={6}>
                {activeView === 'overview' && (
                    <EnterpriseAnalytics 
                        data={dashboarddata?.analytics} 
                        timeframe={selectedTimeframe} 
                    />
                )}
                {activeView === 'enterprise analytics' && (
                    <EnterpriseAnalytics 
                        data={dashboarddata?.analytics} 
                        timeframe={selectedTimeframe} 
                    />
                )}
                {activeView === 'transformation' && (
                    <TransformationView 
                        data={dashboarddata?.transformation} 
                        timeframe={selectedTimeframe} 
                    />
                )}
                {activeView === 'learning resources' && (
                    <Stack spacing={6}>
                        <EducationalTracking 
                            data={dashboarddata?.education} 
                            timeframe={selectedTimeframe} 
                        />
                        <LearningList />
                        <LearningResources 
                            data={dashboarddata?.resources} 
                            timeframe={selectedTimeframe} 
                        />
                    </Stack>
                )}
                {activeView === 'development' && (
                    <Stack spacing={6}>
                        <ProjectSandbox 
                            projects={dashboarddata?.development?.projects || [
                                {
                                    id: 1,
                                    name: "Chat Assistant",
                                    icon: "MessageSquare",
                                    description: "Customer service AI bot",
                                    accuracy: 92,
                                    progress: 75
                                },
                                {
                                    id: 2,
                                    name: "Image Generator",
                                    icon: "ImageIcon",
                                    description: "AI art generation model",
                                    accuracy: 88,
                                    progress: 60
                                }
                            ]} 
                        />
                        <PersonalDevelopment 
                            data={dashboarddata?.development} 
                            timeframe={selectedTimeframe} 
                        />
                    </Stack>
                )}
                {activeView === 'collaboration' && (
                    <Stack spacing={6}>
                        <TeamCollaboration 
                            data={dashboarddata?.team} 
                            timeframe={selectedTimeframe} 
                        />
                        <ProjectManagement 
                            data={dashboarddata?.projects} 
                            timeframe={selectedTimeframe} 
                        />
                    </Stack>
                )}
                {activeView === 'quizzes' && (
                    <Stack spacing={6}>
                        <Heading size="md">Your Quizzes</Heading>
                        <QuizList />
                    </Stack>
                )}
                {activeView === 'ai regulations' && (
                    <Stack spacing={6}>
                        <Heading size="md">AI Regulations & Guidelines</Heading>
                        <AIRegulationsList />
                    </Stack>
                )}
            </Box>

            {/* Quick Access Grid */}
            <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }} spacing={6} mt={6}>
                {[
                    { icon: Brain, text: 'Learning Path', color: 'blue' },
                    { icon: BarChart2, text: 'Analytics', color: 'green' },
                    { icon: Award, text: 'Development', color: 'purple' },
                    { icon: Users, text: 'Team', color: 'orange' },
                    { icon: Rocket, text: 'Transform', color: 'red' },
                    { icon: Book, text: 'Resources', color: 'teal' }
                ].map((item, index) => (
                    <Card
                        key={index}
                        cursor="pointer"
                        borderRadius="xl"
                        overflow="hidden"
                        transition="all 0.3s"
                        _hover={{ transform: 'translateY(-4px)', shadow: 'md' }}
                        onClick={() => onQuickAction(item.text)}
                    >
                        <CardBody p={0}>
                            <Button
                                width="100%"
                                height="120px"
                                display="flex"
                                flexDirection="column"
                                gap={3}
                                colorScheme={item.color}
                                variant="ghost"
                                borderRadius="xl"
                                _hover={{ bg: `${item.color}.50` }}
                            >
                                <Box
                                    p={3}
                                    borderRadius="full"
                                    bg={`${item.color}.100`}
                                    color={`${item.color}.500`}
                                >
                                    <item.icon size={24} />
                                </Box>
                                <Text color={`${item.color}.600`}>{item.text}</Text>
                            </Button>
                        </CardBody>
                    </Card>
                ))}
            </SimpleGrid>

            {/* Business Impact Metrics */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mt={6}>
                <MetricCard
                    title="Total Business Impact"
                    value={8500000}
                    previousValue={7200000}
                    icon={TrendingUp}
                    prefix="$"
                    description="Overall business value created"
                />
                <MetricCard
                    title="Breakthrough Rate"
                    value={71}
                    previousValue={65}
                    icon={Target}
                    suffix="%"
                    description="Innovation success rate"
                />
                <MetricCard
                    title="Active Users"
                    value={12500}
                    previousValue={10800}
                    icon={Users}
                    description="Engaged platform users"
                />
                <MetricCard
                    title="Value Created"
                    value={15000000}
                    previousValue={12000000}
                    icon={AlertCircle}
                    prefix="$"
                    description="Total value generated"
                />
            </SimpleGrid>

            {/* Business Impact Chart */}
            <Card mt={6}>
                <CardHeader>
                    <Heading size="md">Business Impact Trend</Heading>
                </CardHeader>
                <CardBody>
                    <Box height="500px" width="100%" p={4}>
                        <ResponsiveContainer>
                            <AreaChart
                                data={[
                                    {
                                        date: 'Jan 2024',
                                        revenue: 45000,
                                        innovation: 25000,
                                        operational: 20000
                                    },
                                    {
                                        date: 'Feb 2024',
                                        revenue: 90000,
                                        innovation: 45000,
                                        operational: 35000
                                    },
                                    {
                                        date: 'Mar 2024',
                                        revenue: 135000,
                                        innovation: 65000,
                                        operational: 45000
                                    },
                                    {
                                        date: 'Apr 2024',
                                        revenue: 180000,
                                        innovation: 85000,
                                        operational: 55000
                                    }
                                ]}
                                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                            >
                                <defs>
                                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="innovationGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="operationalGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid 
                                    strokeDasharray="3 3" 
                                    stroke={useColorModeValue('gray.200', 'gray.700')} 
                                />
                                <XAxis 
                                    dataKey="date"
                                    tick={{ fill: useColorModeValue('gray.600', 'gray.400') }}
                                />
                                <YAxis 
                                    tick={{ fill: useColorModeValue('gray.600', 'gray.400') }}
                                />
                                <RechartsTooltip />
                                <Legend />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#4F46E5"
                                    fill="url(#revenueGradient)"
                                    name="Revenue Impact"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="innovation"
                                    stroke="#10B981"
                                    fill="url(#innovationGradient)"
                                    name="Innovation Impact"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="operational"
                                    stroke="#F59E0B"
                                    fill="url(#operationalGradient)"
                                    name="Operational Impact"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Box>
                </CardBody>
            </Card>

            {/* Bottom Menu */}
            <Card mt={6}>
                <CardBody>
                    <Flex 
                        justify="center" 
                        gap={8} 
                        flexWrap="wrap"
                    >
                        {['Performance', 'Team Analytics', 'Forecasts'].map((item, index) => (
                            <Button
                                key={index}
                                variant="ghost"
                                color={textColor}
                                _hover={{ color: 'blue.500' }}
                                size="lg"
                            >
                                {item}
                            </Button>
                        ))}
                    </Flex>
                </CardBody>
            </Card>
        </Stack>
    );
};

export default DashboardContent;