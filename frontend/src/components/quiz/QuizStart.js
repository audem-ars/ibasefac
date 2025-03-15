import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Heading,
    Text,
    Stack,
    List,
    ListItem,
    ListIcon,
    Flex
} from '@chakra-ui/react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

const QuizStart = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);

    // Define the same quiz data as in QuizList
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

    useEffect(() => {
        // Find the quiz by ID from our quiz data
        const quizData = quizzes.find(q => q.id === parseInt(quizId));
        
        if (quizData) {
            setQuiz({
                ...quizData,
                duration: '30 minutes',
                questions: 10,
                instructions: [
                    'You cannot go back to previous questions',
                    'Each question has only one correct answer',
                    'You must complete the quiz in one sitting'
                ]
            });
        }
    }, [quizId]);

    const handleStartQuiz = () => {
        const mockAttemptId = '123';
        navigate(`/quiz/${quizId}/attempt/${mockAttemptId}`);
    };

    if (!quiz) {
        return <Box p={8}>Loading quiz details...</Box>;
    }

    return (
        <Box p={8}>
            <Card maxW="800px" mx="auto">
                <CardHeader>
                    <Heading size="lg">{quiz.title}</Heading>
                </CardHeader>
                <CardBody>
                    <Stack spacing={6}>
                        <Text fontSize="lg">{quiz.description}</Text>

                        <Stack spacing={4}>
                            <Flex align="center" gap={2}>
                                <Clock size={20} />
                                <Text>Duration: {quiz.duration}</Text>
                            </Flex>
                            <Flex align="center" gap={2}>
                                <AlertCircle size={20} />
                                <Text>Total Questions: {quiz.questions}</Text>
                            </Flex>
                        </Stack>

                        <Box>
                            <Heading size="md" mb={4}>Instructions:</Heading>
                            <List spacing={3}>
                                {quiz.instructions.map((instruction, index) => (
                                    <ListItem key={index} display="flex" alignItems="center">
                                        <ListIcon as={CheckCircle} color="green.500" />
                                        {instruction}
                                    </ListItem>
                                ))}
                            </List>
                        </Box>

                        <Button
                            colorScheme="blue"
                            size="lg"
                            onClick={handleStartQuiz}
                        >
                            Start Quiz
                        </Button>
                    </Stack>
                </CardBody>
            </Card>
        </Box>
    );
};

export default QuizStart;