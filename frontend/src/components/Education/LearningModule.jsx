import React, { useState, useEffect } from 'react';
import { 
    Stack,
    Button, 
    Heading,
    Progress,
    HStack,
    Box,
    useToast
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { learningService } from '../../services/learningService';
import LearningContent from './LearningContent';
import { learningModules } from './LearningData';

const quizzes = [
    { id: 1, title: 'JavaScript Basics', description: 'Test your JS knowledge' },
    { id: 2, title: 'React Fundamentals', description: 'Core React concepts' },
    { id: 3, title: 'CSS Mastery', description: 'Advanced CSS techniques' },
    { id: 4, title: 'AI Fundamentals', description: 'Learn core concepts of artificial intelligence' },
    { id: 5, title: 'AI Ethics', description: 'Explore ethical considerations in AI development' },
    { id: 6, title: 'Machine Learning Basics', description: 'Understanding machine learning fundamentals' },
    { id: 7, title: 'Computer Vision', description: 'Learn about AI processing of visual information' },
    { id: 8, title: 'Natural Language Processing', description: 'Understanding how AI processes human language' },
    { id: 9, title: 'AI Applications', description: 'Explore real-world applications of AI technology' },
    { id: 10, title: 'AI Security', description: 'Learn about security considerations in AI systems' },
    { id: 11, title: 'AI Infrastructure', description: 'Understanding the technical foundation of AI systems' },
    { id: 12, title: 'AI Development', description: 'Learn about building and optimizing AI models' },
    { id: 13, title: 'Advanced Machine Learning', description: 'Deep dive into complex ML algorithms and techniques' },
    { id: 14, title: 'Advanced Neural Architectures', description: 'Explore cutting-edge neural network architectures' },
    { id: 15, title: 'Advanced AI Research Methods', description: 'Study advanced AI research methodologies and approaches' }
];

const LearningModule = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    const [currentSection, setCurrentSection] = useState(0);
    const [progress, setProgress] = useState(0);
    const moduleData = learningModules.find(m => m.id === parseInt(id));

    useEffect(() => {
        const loadProgress = async () => {
            try {
                const savedProgress = await learningService.getProgress(id);
                setProgress(savedProgress.progress);
                setCurrentSection(savedProgress.currentSection || 0);
            } catch (error) {
                console.warn('Failed to load progress:', error);
                setProgress(0);
                setCurrentSection(0);
            }
        };
        loadProgress();
    }, [id]);

    const handleNext = async () => {
        if (currentSection < moduleData.content.sections.length - 1) {
            const newSection = currentSection + 1;
            setCurrentSection(newSection);
            toast({
                title: "We believe in you",
                description: "You can do this",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            try {
                await learningService.saveProgress(id, {
                    progress: ((newSection + 1) / moduleData.content.sections.length) * 100,
                    currentSection: newSection
                });
            } catch (error) {
                console.warn('Failed to save progress:', error);
            }
        }
    };

    const handlePrevious = () => {
        if (currentSection > 0) {
            setCurrentSection(curr => curr - 1);
        }
    };

    if (!moduleData) return null;

    return (
        <Stack spacing={6} p={4}>
            <HStack justify="space-between">
                <Button
                    leftIcon={<ChevronLeft size={16} />}
                    onClick={() => navigate('/dashboard?tab=learning')}
                    variant="outline"
                >
                    Back to Learning Resources
                </Button>
                <Button
    leftIcon={<Play size={16} />}
    colorScheme="blue"
    onClick={() => {
        console.log('Current module:', moduleData);
        const mappedQuizId = moduleData.id;
        console.log('Quiz ID:', mappedQuizId);
        navigate(`/quiz/${mappedQuizId}`);
    }}
>
    Take Quiz
</Button>
            </HStack>

            <Heading size="lg">{moduleData.title}</Heading>

            <Progress
                value={(currentSection + 1) / moduleData.content.sections.length * 100}
                size="sm"
                colorScheme="green"
            />

            <Box flex={1}>
                <LearningContent
                    moduleId={parseInt(id)}
                    sectionIndex={currentSection}
                />
            </Box>

            <HStack justify="space-between">
                <Button
                    leftIcon={<ChevronLeft size={16} />}
                    onClick={handlePrevious}
                    isDisabled={currentSection === 0}
                >
                    Previous
                </Button>
                <Button
                    rightIcon={<ChevronRight size={16} />}
                    onClick={handleNext}
                    isDisabled={currentSection === moduleData.content.sections.length - 1}
                    colorScheme="blue"
                >
                    Next
                </Button>
            </HStack>
        </Stack>
    );
};

export default LearningModule;