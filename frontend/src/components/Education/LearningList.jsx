import React, { useState, useEffect } from 'react';
import { 
    Card, 
    CardBody, 
    CardHeader, 
    Heading, 
    Text,
    Button,
    Stack,
    HStack,
    Box,
    Progress,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    SimpleGrid,
    Badge,
    Tooltip,
    IconButton
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Book, Info, ChevronDown, Bookmark, Play } from 'lucide-react';
import { learningService } from '../../services/learningService';
import { learningModules } from './LearningData';

const ModuleCard = ({ module, progress, onStart }) => (
    <Card>
        <CardHeader>
            <Stack spacing={2}>
                <Heading size="md">{module.title}</Heading>
                <Badge 
                    colorScheme={progress > 0 ? "green" : "gray"}
                    alignSelf="flex-start"
                >
                    {progress > 0 ? `${Math.round(progress)}% Complete` : 'Not Started'}
                </Badge>
            </Stack>
        </CardHeader>
        <CardBody>
            <Stack spacing={4}>
                <Text>{module.content.introduction}</Text>
                <Progress 
                    value={progress || 0} 
                    size="sm" 
                    colorScheme="green" 
                />
                <HStack spacing={2}>
                    <Button
                        leftIcon={<Book size={16} />}
                        colorScheme="teal"
                        flex="1"
                        onClick={() => onStart(module.id)}
                    >
                        {progress > 0 ? 'Continue Learning' : 'Start Learning'}
                    </Button>
                    <Tooltip label="Take Quiz">
                        <IconButton
                            icon={<Play size={16} />}
                            colorScheme="blue"
                            onClick={() => window.location.href = `/quiz/${module.id}`}
                        />
                    </Tooltip>
                </HStack>
            </Stack>
        </CardBody>
    </Card>
);

const LearningSection = ({ title, description, modules, progress, onStart }) => {
    if (modules.length === 0) return null;

    return (
        <AccordionItem>
            <AccordionButton py={4}>
                <Box flex="1" textAlign="left">
                    <Heading size="md">{title}</Heading>
                    <Text color="gray.600" mt={1} fontSize="sm">
                        {description}
                    </Text>
                </Box>
                <AccordionIcon as={ChevronDown} />
            </AccordionButton>
            <AccordionPanel pb={4}>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                    {modules.map((module) => (
                        <ModuleCard 
                            key={module.id}
                            module={module}
                            progress={progress[module.id] || 0}
                            onStart={onStart}
                        />
                    ))}
                </SimpleGrid>
            </AccordionPanel>
        </AccordionItem>
    );
};

const LearningList = () => {
    const navigate = useNavigate();
    const [moduleProgress, setModuleProgress] = useState({});

    const categories = {
        'web': {
            title: 'Web Development',
            description: 'Master modern web development technologies and frameworks'
        },
        'ai-basics': {
            title: 'AI Fundamentals',
            description: 'Build a strong foundation in artificial intelligence concepts'
        },
        'ai-specialized': {
            title: 'AI Specializations',
            description: 'Deep dive into specific AI domains like computer vision and NLP'
        },
        'ai-applied': {
            title: 'Applied AI',
            description: 'Learn practical applications and implementations of AI'
        },
        'ai-advanced': {
            title: 'Advanced AI',
            description: 'Explore cutting-edge AI techniques and research'
        },
        'deep-learning': {
            title: 'Deep Learning',
            description: 'Master neural networks and deep learning architectures'
        },
        'ai-engineering': {
            title: 'AI Engineering',
            description: 'Learn to build and optimize AI systems'
        },
        'ai-quality': {
            title: 'AI Quality & Management',
            description: 'Ensure quality and effectively manage AI projects'
        }
    };

    // Categorize modules
    const categorizedModules = {
        'web': [1, 2, 3],
        'ai-basics': [4, 5, 6],
        'ai-specialized': [7, 8],
        'ai-applied': [9, 10, 11, 12],
        'ai-advanced': [13, 14, 15],
        'deep-learning': [16, 17, 18],
        'ai-engineering': [19, 20, 21],
        'ai-quality': [22, 23, 24, 25]
    };

    const modulesByCategory = Object.keys(categories).reduce((acc, category) => {
        acc[category] = learningModules.filter(module => 
            categorizedModules[category].includes(module.id)
        );
        return acc;
    }, {});

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const history = await learningService.getLearningHistory();
                setModuleProgress(history.reduce((acc, item) => ({
                    ...acc,
                    [item.moduleId]: item.progress
                }), {}));
            } catch (error) {
                console.error('Failed to fetch progress:', error);
            }
        };
        fetchProgress();
    }, []);

    const handleStartModule = (moduleId) => {
        navigate(`/learn/${moduleId}`);
    };

    return (
        <Stack spacing={6} p={4}>
            <Stack spacing={4}>
                <Heading size="lg">Learning Paths</Heading>
                <Text color="gray.600">
                    Explore our comprehensive curriculum organized by subject area. Each section contains 
                    carefully curated learning materials to help you master different aspects of AI and development.
                </Text>
            </Stack>

            <HStack>
                <Tooltip label="Your progress is automatically saved">
                    <IconButton
                        icon={<Info size={20} />}
                        aria-label="Progress info"
                        variant="ghost"
                    />
                </Tooltip>
                <Tooltip label="View bookmarked modules">
                    <IconButton
                        icon={<Bookmark size={20} />}
                        aria-label="Bookmarks"
                        variant="ghost"
                    />
                </Tooltip>
            </HStack>

            <Accordion allowMultiple defaultIndex={[0]}>
                {Object.entries(categories).map(([categoryKey, categoryInfo]) => (
                    <LearningSection
                        key={categoryKey}
                        title={categoryInfo.title}
                        description={categoryInfo.description}
                        modules={modulesByCategory[categoryKey]}
                        progress={moduleProgress}
                        onStart={handleStartModule}
                    />
                ))}
            </Accordion>
        </Stack>
    );
};

export default LearningList;