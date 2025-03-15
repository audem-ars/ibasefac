import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Stack,
    Card,
    CardHeader,
    CardBody,
    Heading,
    Text,
    Button,
    Input,
    Textarea,
    Select,
    Progress,
    Badge,
    Flex,
    SimpleGrid,
    Container,
    List,
    ListItem,
    ListIcon,
    useColorModeValue,
    Switch,
    Tooltip
} from '@chakra-ui/react';
import {
    Target,
    Brain,
    Book,
    CheckCircle,
    PlayCircle,
    Code,
    FileText,
    ChevronRight,
    Clock,
    Star,
    Map,
    BookOpen,
    Youtube,
    Calculator
} from 'lucide-react';
import { useVision } from '../../context/VisionContext';

// Constants from both files
const MILESTONE_CONTENT = {
    'Foundations': {
        modules: [
            {
                id: 'neural-networks-intro',
                title: 'Introduction to Neural Networks',
                type: 'video',
                path: '/learn/neural-networks-intro',
                description: 'Comprehensive video course on neural network fundamentals',
                duration: '2 hours'
            },
            {
                id: 'python-ml',
                title: 'Python for Machine Learning',
                type: 'code',
                path: '/learn/python-ml',
                description: 'Interactive coding exercises and examples',
                duration: '4 hours'
            }
        ]
    },
    'Core Concepts': {
        modules: [
            {
                id: 'math-ai',
                title: 'Mathematics for AI',
                type: 'exercise',
                path: '/learn/math-ai',
                description: 'Essential mathematical concepts and practice problems',
                duration: '3 hours'
            },
            {
                id: 'deep-learning-docs',
                title: 'Deep Learning Documentation',
                type: 'documentation',
                path: '/learn/deep-learning',
                description: 'In-depth technical documentation and guides',
                duration: '5 hours'
            }
        ]
    }
};

const LEARNING_PATHS = {
    'ai_engineering': {
        title: 'AI Engineering Track',
        description: 'Master the technical aspects of AI development',
        duration: '6 months',
        difficulty: 'advanced',
        prerequisites: ['Python', 'Math Fundamentals', 'Basic ML']
    },
    'ai_research': {
        title: 'AI Research Track',
        description: 'Focus on theoretical aspects and cutting-edge research',
        duration: '8 months',
        difficulty: 'advanced',
        prerequisites: ['Advanced Math', 'ML Theory', 'Research Methods']
    },
    'applied_ai': {
        title: 'Applied AI Track',
        description: 'Learn practical applications of AI in industry',
        duration: '4 months',
        difficulty: 'intermediate',
        prerequisites: ['Basic Python', 'Statistics', 'Industry Knowledge']
    }
};

const SKILL_AREAS = [
    { id: 'python', name: 'Python Programming', category: 'technical' },
    { id: 'ml_basics', name: 'Machine Learning Basics', category: 'ai' },
    { id: 'deep_learning', name: 'Deep Learning', category: 'ai' },
    { id: 'math', name: 'Mathematics for AI', category: 'foundation' },
    { id: 'data_eng', name: 'Data Engineering', category: 'technical' },
    { id: 'mlops', name: 'MLOps', category: 'technical' },
    { id: 'ai_ethics', name: 'AI Ethics', category: 'soft' },
    { id: 'research', name: 'Research Methods', category: 'academic' }
];

// Component definitions
const GoalSettingPanel = ({ goals, setGoals, onNext }) => {
    const cardBg = useColorModeValue('white', 'gray.800');

    return (
        <Card bg={cardBg} mb={6}>
            <CardHeader>
                <Flex align="center" gap={3}>
                    <Target size={24} />
                    <Heading size="md">Define Your Learning Goals</Heading>
                </Flex>
            </CardHeader>
            <CardBody>
                <Stack spacing={6}>
                    <Box>
                        <Text mb={2} fontWeight="medium">Career Vision</Text>
                        <Textarea
                            value={goals.vision}
                            onChange={(e) => setGoals({ ...goals, vision: e.target.value })}
                            placeholder="What do you want to achieve in your AI career?"
                            rows={4}
                        />
                    </Box>

                    <Box>
                        <Text mb={2} fontWeight="medium">Primary Focus Area</Text>
                        <Select
                            value={goals.focusArea}
                            onChange={(e) => setGoals({ ...goals, focusArea: e.target.value })}
                        >
                            <option value="ai_engineering">AI Engineering</option>
                            <option value="ai_research">AI Research</option>
                            <option value="applied_ai">Applied AI</option>
                        </Select>
                    </Box>

                    <Stack spacing={4}>
                        <Text fontWeight="medium">Key Skills to Develop</Text>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                            {SKILL_AREAS.map((skill) => (
                                <Flex key={skill.id} align="center" gap={3}>
                                    <Switch
                                        isChecked={goals.selectedSkills.includes(skill.id)}
                                        onChange={(e) => {
                                            const updatedSkills = e.target.checked
                                                ? [...goals.selectedSkills, skill.id]
                                                : goals.selectedSkills.filter(id => id !== skill.id);
                                            setGoals({ ...goals, selectedSkills: updatedSkills });
                                        }}
                                    />
                                    <Text>{skill.name}</Text>
                                    <Badge colorScheme="blue">{skill.category}</Badge>
                                </Flex>
                            ))}
                        </SimpleGrid>
                    </Stack>

                    <Box>
                        <Text mb={2} fontWeight="medium">Time Commitment</Text>
                        <Select
                            value={goals.timeCommitment}
                            onChange={(e) => setGoals({ ...goals, timeCommitment: e.target.value })}
                        >
                            <option value="high">20+ hours/week</option>
                            <option value="medium">10-20 hours/week</option>
                            <option value="low">5-10 hours/week</option>
                        </Select>
                    </Box>

                    <Button
                        colorScheme="blue"
                        rightIcon={<ChevronRight />}
                        onClick={onNext}
                        isDisabled={!goals.vision || !goals.focusArea || goals.selectedSkills.length === 0}
                    >
                        Generate Learning Path
                    </Button>
                </Stack>
            </CardBody>
        </Card>
    );
};

const PathOverview = ({ path, onStartLearning }) => {
    const cardBg = useColorModeValue('white', 'gray.800');

    return (
        <Card bg={cardBg} mb={6}>
            <CardHeader>
                <Stack spacing={4}>
                    <Flex align="center" gap={3}>
                        <Map size={24} />
                        <Heading size="md">{path.title}</Heading>
                    </Flex>
                    <Text color="gray.500">{path.description}</Text>
                    <Flex gap={4} flexWrap="wrap">
                        <Badge colorScheme="blue" display="flex" alignItems="center" gap={2}>
                            <Clock size={14} />
                            {path.duration}
                        </Badge>
                        <Badge colorScheme="purple" display="flex" alignItems="center" gap={2}>
                            <Star size={14} />
                            {path.difficulty}
                        </Badge>
                    </Flex>
                </Stack>
            </CardHeader>
            <CardBody>
                <Stack spacing={6}>
                    <Box>
                        <Text fontWeight="medium" mb={2}>Prerequisites</Text>
                        <List spacing={2}>
                            {path.prerequisites.map((prereq, index) => (
                                <ListItem key={index} display="flex" alignItems="center" gap={2}>
                                    <ListIcon as={CheckCircle} color="green.500" />
                                    {prereq}
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    <Button
                        colorScheme="blue"
                        rightIcon={<ChevronRight />}
                        onClick={onStartLearning}
                    >
                        Start Learning Journey
                    </Button>
                </Stack>
            </CardBody>
        </Card>
    );
};

const MilestoneTracker = ({ currentMilestone }) => {
    const navigate = useNavigate();
    const cardBg = useColorModeValue('white', 'gray.800');
    const milestones = [
        { title: 'Foundations', progress: 100 },
        { title: 'Core Concepts', progress: 75 },
        { title: 'Advanced Topics', progress: 30 },
        { title: 'Practical Projects', progress: 0 },
        { title: 'Specialization', progress: 0 }
    ];

    const handleMilestoneClick = (milestone) => {
        if (MILESTONE_CONTENT[milestone.title]) {
            const firstModule = MILESTONE_CONTENT[milestone.title].modules[0];
            if (firstModule) {
                navigate(firstModule.path);
            }
        }
    };

    return (
        <Card bg={cardBg}>
            <CardHeader>
                <Flex align="center" gap={3}>
                    <Target size={24} />
                    <Heading size="md">Your Learning Progress</Heading>
                </Flex>
            </CardHeader>
            <CardBody>
                <Stack spacing={6}>
                    {milestones.map((milestone, index) => (
                        <Box key={index} 
                            onClick={() => handleMilestoneClick(milestone)}
                            cursor={milestone.progress > 0 ? 'pointer' : 'default'}
                        >
                            <Flex align="center" gap={4} mb={2}>
                                <Badge
                                    colorScheme={
                                        milestone.progress === 100 ? "green" :
                                        milestone.progress > 0 ? "blue" : "gray"
                                    }
                                    p={2}
                                    borderRadius="full"
                                >
                                    {index + 1}
                                </Badge>
                                <Stack flex={1}>
                                    <Text fontWeight="medium">{milestone.title}</Text>
                                    <Progress
                                        value={milestone.progress}
                                        colorScheme={
                                            milestone.progress === 100 ? "green" :
                                            milestone.progress > 0 ? "blue" : "gray"
                                        }
                                        size="sm"
                                        borderRadius="full"
                                    />
                                </Stack>
                                <Text color="gray.500">{milestone.progress}%</Text>
                            </Flex>
                        </Box>
                    ))}
                </Stack>
            </CardBody>
        </Card>
    );
};

const ResourcesPanel = () => {
    const navigate = useNavigate();
    const cardBg = useColorModeValue('white', 'gray.800');

    const resourceTypes = {
        video: { icon: PlayCircle, color: 'red' },
        documentation: { icon: FileText, color: 'blue' },
        code: { icon: Code, color: 'green' },
        exercise: { icon: Brain, color: 'purple' }
    };

    const resources = Object.values(MILESTONE_CONTENT).reduce((acc, milestone) => {
        return [...acc, ...milestone.modules];
    }, []);

    const handleResourceClick = (resource) => {
        navigate(resource.path);
    };

    return (
        <Card bg={cardBg}>
            <CardHeader>
                <Flex align="center" gap={3}>
                    <Book size={24} />
                    <Heading size="md">Learning Resources</Heading>
                </Flex>
            </CardHeader>
            <CardBody>
                <Stack spacing={4}>
                    {resources.map((resource, index) => {
                        const TypeIcon = resourceTypes[resource.type].icon;
                        return (
                            <Card key={index} variant="outline">
                                <CardBody>
                                    <Flex align="center" gap={4}>
                                        <Box
                                            p={2}
                                            borderRadius="lg"
                                            bg={`${resourceTypes[resource.type].color}.100`}
                                            color={`${resourceTypes[resource.type].color}.500`}
                                        >
                                            <TypeIcon size={20} />
                                        </Box>
                                        <Stack flex={1}>
                                            <Text fontWeight="medium">{resource.title}</Text>
                                            <Text color="gray.500" fontSize="sm">
                                                {resource.description}
                                            </Text>
                                            <Text fontSize="sm" color="gray.500">
                                                Duration: {resource.duration}
                                            </Text>
                                        </Stack>
                                        <Button
                                            variant="ghost"
                                            colorScheme={resourceTypes[resource.type].color}
                                            size="sm"
                                            onClick={() => handleResourceClick(resource)}
                                            rightIcon={<ChevronRight size={16} />}
                                        >
                                            Access
                                        </Button>
                                    </Flex>
                                </CardBody>
                            </Card>
                        );
                    })}
                </Stack>
            </CardBody>
        </Card>
    );
};

const LearningPathView = () => {
    const [currentStep, setCurrentStep] = useState('goals');
    const [currentMilestone, setCurrentMilestone] = useState(2);
    const [goals, setGoals] = useState({
        vision: '',
        focusArea: '',
        selectedSkills: [],
        timeCommitment: 'medium'
    });
    const [selectedPath, setSelectedPath] = useState(null);
    const { vision } = useVision();

    const handleGeneratePath = () => {
        const pathData = LEARNING_PATHS[goals.focusArea];
        setSelectedPath(pathData);
        setCurrentStep('path');
    };

    const handleStartLearning = () => {
        setCurrentStep('learning');
    };

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')} p={8}>
            <Container maxW="1200px">
                <Stack spacing={8}>
                    {currentStep === 'goals' && (
                        <GoalSettingPanel
                            goals={goals}
                            setGoals={setGoals}
                            onNext={handleGeneratePath}
                        />
                    )}

                    {currentStep === 'path' && selectedPath && (
                        <PathOverview
                            path={selectedPath}
                            onStartLearning={handleStartLearning}
                        />
                    )}

                    {currentStep === 'learning' && (
                        <Stack spacing={6}>
                            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                                <MilestoneTracker
                                    currentMilestone={currentMilestone}
                                />
                                <ResourcesPanel />
                            </SimpleGrid>
                        </Stack>
                    )}
                </Stack>
            </Container>
        </Box>
    );
};

export default LearningPathView;