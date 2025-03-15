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
    CircularProgress,
    CircularProgressLabel,
    Flex,
    Divider
} from '@chakra-ui/react';
import { Trophy, Home, RefreshCw } from 'lucide-react';
import { getQuizQuestions } from './questions';

const QuizResults = () => {
    const { quizId, attemptId } = useParams();
    const navigate = useNavigate();
    const [results, setResults] = useState(null);

    useEffect(() => {
        // Get the questions for this quiz
        const quizQuestions = getQuizQuestions(quizId);
        
        // TODO: In the future, get actual user answers from backend
        // For now, simulate some answers
        const simulatedAnswers = quizQuestions.map((question, index) => {
            const randomAnswer = Math.floor(Math.random() * question.options.length);
            return {
                question: question.question,
                yourAnswer: question.options[randomAnswer],
                correct: randomAnswer === question.correctAnswer
            };
        });

        const correctAnswers = simulatedAnswers.filter(answer => answer.correct).length;
        const percentage = (correctAnswers / quizQuestions.length) * 100;

        const mockResults = {
            score: correctAnswers,
            totalQuestions: quizQuestions.length,
            percentage: Math.round(percentage),
            timeTaken: '5 minutes',
            answers: simulatedAnswers
        };
        setResults(mockResults);
    }, [quizId, attemptId]);

    if (!results) {
        return <Box p={8}>Loading results...</Box>;
    }

    return (
        <Box p={8}>
            <Card maxW="800px" mx="auto">
                <CardHeader>
                    <Stack spacing={4} align="center" textAlign="center">
                        <Trophy size={48} color="#4299E1" />
                        <Heading size="lg">Quiz Complete!</Heading>
                    </Stack>
                </CardHeader>
                <CardBody>
                    <Stack spacing={6}>
                        <Flex justify="center">
                            <CircularProgress 
                                value={results.percentage} 
                                size="120px"
                                color={results.percentage >= 70 ? "green.400" : "orange.400"}
                            >
                                <CircularProgressLabel>
                                    {results.percentage}%
                                </CircularProgressLabel>
                            </CircularProgress>
                        </Flex>

                        <Stack spacing={3} align="center">
                            <Text fontSize="lg">
                                You scored {results.score} out of {results.totalQuestions} questions correctly
                            </Text>
                            <Text color="gray.600">Time taken: {results.timeTaken}</Text>
                        </Stack>

                        <Divider />

                        <Stack spacing={4}>
                            <Heading size="md">Question Review</Heading>
                            {results.answers.map((answer, index) => (
                                <Card key={index} variant="outline">
                                    <CardBody>
                                        <Stack spacing={2}>
                                            <Text fontWeight="medium">
                                                Question {index + 1}: {answer.question}
                                            </Text>
                                            <Text 
                                                color={answer.correct ? "green.500" : "red.500"}
                                            >
                                                Your answer: {answer.yourAnswer}
                                            </Text>
                                        </Stack>
                                    </CardBody>
                                </Card>
                            ))}
                        </Stack>

                        <Stack direction="row" spacing={4}>
                            <Button
                                leftIcon={<Home />}
                                colorScheme="blue"
                                onClick={() => navigate('/dashboard')}
                                flex={1}
                            >
                                Back to Dashboard
                            </Button>
                            <Button
                                leftIcon={<RefreshCw />}
                                onClick={() => navigate(`/quiz/${quizId}`)}
                                flex={1}
                            >
                                Try Again
                            </Button>
                        </Stack>
                    </Stack>
                </CardBody>
            </Card>
        </Box>
    );
};

export default QuizResults;