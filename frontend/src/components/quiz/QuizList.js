import React, { useState } from 'react';
import { 
    Card, 
    CardBody, 
    CardHeader, 
    Heading, 
    Text,
    Button,
    Stack,
    Select,
    HStack,
    Badge,
    Tooltip,
    IconButton,
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    SimpleGrid,
    Flex
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Play, HelpCircle, BookOpen, ChevronDown } from 'lucide-react';

const getDifficultyFromTitle = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('basics') || lowerTitle.includes('fundamentals')) {
        return 'beginner';
    }
    if (lowerTitle.includes('mastery') || lowerTitle.includes('advanced')) {
        return 'advanced';
    }
    return 'intermediate';
};

const QuizCard = ({ quiz, categories, difficultyColors, onStart, onStudy }) => (
    <Card>
        <CardHeader>
            <Stack spacing={2}>
                <Heading size="md">{quiz.title}</Heading>
                <HStack spacing={2}>
                    <Badge 
                        colorScheme={difficultyColors[quiz.difficulty]}
                        alignSelf="flex-start"
                    >
                        {quiz.difficulty}
                    </Badge>
                </HStack>
            </Stack>
        </CardHeader>
        <CardBody>
            <Stack spacing={4}>
                <Text>{quiz.description}</Text>
                <HStack spacing={2}>
                    <Button
                        leftIcon={<Play size={16} />}
                        colorScheme="blue"
                        flex="1"
                        onClick={() => onStart(quiz.id, quiz.difficulty)}
                    >
                        Start Quiz
                    </Button>
                    <Tooltip label="View study materials">
                        <IconButton
                            icon={<BookOpen size={16} />}
                            aria-label="Study materials"
                            variant="outline"
                            onClick={() => onStudy(quiz.id)}
                        />
                    </Tooltip>
                </HStack>
            </Stack>
        </CardBody>
    </Card>
);

const QuizSection = ({ title, description, quizzes, selectedDifficulty, categories, difficultyColors, onStart, onStudy }) => {
    const filteredQuizzes = quizzes.filter(quiz => 
        selectedDifficulty === 'all' || quiz.difficulty === selectedDifficulty
    );

    if (filteredQuizzes.length === 0) return null;

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
                    {filteredQuizzes.map((quiz) => (
                        <QuizCard 
                            key={quiz.id}
                            quiz={quiz}
                            categories={categories}
                            difficultyColors={difficultyColors}
                            onStart={onStart}
                            onStudy={onStudy}
                        />
                    ))}
                </SimpleGrid>
            </AccordionPanel>
        </AccordionItem>
    );
};

const QuizList = () => {
    const navigate = useNavigate();
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    
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

    const quizzes = [
        // Web Development
        { id: 1, title: 'JavaScript Basics', description: 'Test your JS knowledge', category: 'web' },
        { id: 2, title: 'React Fundamentals', description: 'Core React concepts', category: 'web' },
        { id: 3, title: 'CSS Mastery', description: 'Advanced CSS techniques', category: 'web' },
        
        // AI Fundamentals
        { id: 4, title: 'AI Fundamentals', description: 'Learn core concepts of artificial intelligence', category: 'ai-basics' },
        { id: 5, title: 'AI Ethics', description: 'Explore ethical considerations in AI development', category: 'ai-basics' },
        { id: 6, title: 'Machine Learning Basics', description: 'Understanding machine learning fundamentals', category: 'ai-basics' },
        
        // AI Specializations
        { id: 7, title: 'Computer Vision', description: 'Learn about AI processing of visual information', category: 'ai-specialized' },
        { id: 8, title: 'Natural Language Processing', description: 'Understanding how AI processes human language', category: 'ai-specialized' },
        
        // Applied AI
        { id: 9, title: 'AI Applications', description: 'Explore real-world applications of AI technology', category: 'ai-applied' },
        { id: 10, title: 'AI Security', description: 'Learn about security considerations in AI systems', category: 'ai-applied' },
        { id: 11, title: 'AI Infrastructure', description: 'Understanding the technical foundation of AI systems', category: 'ai-applied' },
        { id: 12, title: 'AI Development', description: 'Learn about building and optimizing AI models', category: 'ai-applied' },
        
        // Advanced AI
        { id: 13, title: 'Advanced Machine Learning', description: 'Deep dive into complex ML algorithms and techniques', category: 'ai-advanced' },
        { id: 14, title: 'Advanced Neural Architectures', description: 'Explore cutting-edge neural network architectures', category: 'ai-advanced' },
        { id: 15, title: 'Advanced AI Research Methods', description: 'Study advanced AI research methodologies and approaches', category: 'ai-advanced' },
        
        // Deep Learning
        { id: 16, title: 'Deep Learning Fundamentals', description: 'Master the basics of deep learning and neural networks', category: 'deep-learning' },
        { id: 17, title: 'Reinforcement Learning', description: 'Learn about training agents through rewards and actions', category: 'deep-learning' },
        { id: 18, title: 'Generative AI & GANs', description: 'Understand generative models and adversarial networks', category: 'deep-learning' },
        
        // AI Engineering
        { id: 19, title: 'AI Model Optimization', description: 'Learn techniques for optimizing AI model performance', category: 'ai-engineering' },
        { id: 20, title: 'AI Tools & Frameworks', description: 'Master popular AI development tools and frameworks', category: 'ai-engineering' },
        { id: 21, title: 'MLOps & AI Deployment', description: 'Learn about deploying and managing AI systems', category: 'ai-engineering' },
        
        // AI Quality & Management
        { id: 22, title: 'AI Testing & Quality Assurance', description: 'Ensure AI system quality and reliability', category: 'ai-quality' },
        { id: 23, title: 'AI Project Management', description: 'Learn to manage AI projects effectively', category: 'ai-quality' },
        { id: 24, title: 'AI UX & Human-AI Interaction', description: 'Design user-friendly AI interfaces', category: 'ai-quality' },
        { id: 25, title: 'AI Data Management', description: 'Master data handling for AI systems', category: 'ai-quality' }
    ].map(quiz => ({
        ...quiz,
        difficulty: getDifficultyFromTitle(quiz.title)
    }));

    const difficultyColors = {
        beginner: 'green',
        intermediate: 'blue',
        advanced: 'purple'
    };

    const handleStartQuiz = (quizId, difficulty) => {
        navigate(`/quiz/${quizId}?difficulty=${difficulty}`);
    };

    const handleStudyMaterials = (quizId) => {
        navigate(`/study/${quizId}`);
    };

    const quizzesByCategory = Object.keys(categories).reduce((acc, category) => {
        acc[category] = quizzes.filter(quiz => quiz.category === category);
        return acc;
    }, {});

    return (
        <Stack spacing={6} p={4}>
            <Stack spacing={4}>
                <Heading size="lg">Learning Paths</Heading>
                <Text color="gray.600">
                    Explore our comprehensive curriculum organized by subject area. Each section contains carefully curated quizzes to help you master different aspects of AI and development.
                </Text>
            </Stack>

            <HStack spacing={4} alignItems="center">
                <Select 
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    width="200px"
                >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </Select>

                <Tooltip label="Filter quizzes by difficulty level">
                    <IconButton
                        icon={<HelpCircle size={20} />}
                        aria-label="Difficulty info"
                        variant="ghost"
                    />
                </Tooltip>
            </HStack>

            <Accordion allowMultiple defaultIndex={[0]}>
                {Object.entries(categories).map(([categoryKey, categoryInfo]) => (
                    <QuizSection
                        key={categoryKey}
                        title={categoryInfo.title}
                        description={categoryInfo.description}
                        quizzes={quizzesByCategory[categoryKey]}
                        selectedDifficulty={selectedDifficulty}
                        categories={categories}
                        difficultyColors={difficultyColors}
                        onStart={handleStartQuiz}
                        onStudy={handleStudyMaterials}
                    />
                ))}
            </Accordion>

            {Object.values(quizzesByCategory).every(categoryQuizzes => 
                categoryQuizzes.filter(quiz => 
                    selectedDifficulty === 'all' || quiz.difficulty === selectedDifficulty
                ).length === 0
            ) && (
                <Box textAlign="center" p={8}>
                    <Text color="gray.600">
                        No quizzes found matching your selected difficulty level. Try adjusting your criteria.
                    </Text>
                </Box>
            )}
        </Stack>
    );
};

export default QuizList;