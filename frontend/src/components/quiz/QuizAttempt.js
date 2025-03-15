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
    Radio,
    RadioGroup,
    Progress,
    Flex
} from '@chakra-ui/react';
import { getQuizQuestions } from './questions';

const QuizAttempt = () => {
    const { quizId, attemptId } = useParams();
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [questions, setQuestions] = useState([]);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        const questions = getQuizQuestions(quizId);
        setQuestions(questions);
    }, [quizId]);

    const handleAnswer = (value) => {
        setAnswers({
            ...answers,
            [currentQuestion]: value
        });
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setShowAnswer(false); // Hide answer when moving to next question
        } else {
            // Quiz completed - navigate to results
            navigate(`/quiz/${quizId}/results/${attemptId}`);
        }
    };

    if (questions.length === 0) {
        return <Box p={8}>Loading questions...</Box>;
    }

    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const question = questions[currentQuestion];

    return (
        <Box p={8}>
            <Card maxW="800px" mx="auto">
                <CardHeader>
                    <Stack spacing={4}>
                        <Flex justify="space-between" align="center">
                            <Heading size="md">Question {currentQuestion + 1} of {questions.length}</Heading>
                            <Text>Progress: {progress.toFixed(0)}%</Text>
                        </Flex>
                        <Progress value={progress} size="sm" colorScheme="blue" />
                    </Stack>
                </CardHeader>
                <CardBody>
                    <Stack spacing={6}>
                        <Text fontSize="lg" fontWeight="medium">
                            {question.question}
                        </Text>

                        <RadioGroup
                            onChange={handleAnswer}
                            value={answers[currentQuestion]}
                        >
                            <Stack spacing={4}>
                                {question.options.map((option, index) => (
                                    <Radio key={index} value={index.toString()}>
                                        {option}
                                    </Radio>
                                ))}
                            </Stack>
                        </RadioGroup>

                        <Stack direction="row" spacing={4}>
                            <Button
                                colorScheme="blue"
                                onClick={handleNext}
                                isDisabled={!answers[currentQuestion]}
                            >
                                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                            </Button>
                            
                            <Button
                                variant="outline"
                                colorScheme="purple"
                                onClick={() => setShowAnswer(!showAnswer)}
                            >
                                {showAnswer ? 'Hide Answer' : 'Show Answer'}
                            </Button>
                        </Stack>

                        {showAnswer && (
                            <Box 
                                mt={4} 
                                p={4} 
                                bg="purple.50" 
                                borderRadius="md"
                                borderLeft="4px"
                                borderColor="purple.500"
                            >
                                <Text fontWeight="bold" color="purple.700">
                                    Correct Answer: {question.options[question.correctAnswer]}
                                </Text>
                            </Box>
                        )}
                    </Stack>
                </CardBody>
            </Card>
        </Box>
    );
};

export default QuizAttempt;