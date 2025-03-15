import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Card, CardHeader, CardBody, Button, Progress, 
    Tabs, TabList, Tab, TabPanels, TabPanel, 
    Box, Text, Flex, Stack, SimpleGrid,
    useColorModeValue
} from '@chakra-ui/react';
import { 
    Rocket, Trophy, Target, TrendingUp, 
    Book, Star, DollarSign, Brain, Users 
} from 'lucide-react';
import { PlayCircle } from 'lucide-react';  // Changed from Play to PlayCircle

export const learninghub = ({ user, metrics }) => {
    const [activeQuiz, setActiveQuiz] = useState(null);
    const [showBreakthrough, setShowBreakthrough] = useState(false);

    // Quick Action Bar
    const QuickActions = () => (
        <Box className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg">
            <Flex gap={4}>
                <Button flex="1" onClick={() => continueLastActivity()}>
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Continue Learning
                </Button>
                <Button variant="outline" onClick={() => startQuickQuiz()}>
                    <Target className="w-4 h-4 mr-2" />
                    Quick Quiz
                </Button>
                <Button variant="outline" onClick={() => viewProgress()}>
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Progress
                </Button>
            </Flex>
        </Box>
    );

    // Value Creation Card
    const ValueTracker = () => (
        <Card>
            <CardBody className="bg-gradient-to-br from-green-50 to-blue-50">
                <Flex justify="space-between" align="center" mb={4}>
                    <Box>
                        <Text fontWeight="semibold">Value Created</Text>
                        <Text fontSize="2xl" fontWeight="bold">
                            ${metrics.valueMetrics.currentValue.toLocaleString()}
                        </Text>
                    </Box>
                    <DollarSign className="w-8 h-8 text-green-500" />
                </Flex>
                <Progress 
                    value={(metrics.valueMetrics.currentValue / metrics.valueMetrics.targetValue) * 100} 
                    mb={2}
                />
                <Flex justify="space-between">
                    <Text fontSize="sm" color="gray.600">Current Impact</Text>
                    <Text fontSize="sm" color="gray.600">
                        ${metrics.valueMetrics.projectedValue.toLocaleString()} Potential
                    </Text>
                </Flex>
            </CardBody>
        </Card>
    );

    // Learning Focus Section
    const LearningFocus = () => {
        const currentFocus = metrics.learningPath.currentFocus;
        
        return (
            <Card>
                <CardBody>
                    <Flex justify="space-between" align="center" mb={4}>
                        <Box>
                            <Text fontWeight="semibold">{currentFocus.title}</Text>
                            <Text fontSize="sm" color="gray.600">
                                {currentFocus.description}
                            </Text>
                        </Box>
                        <Brain className="w-8 h-8 text-primary" />
                    </Flex>
                    <Stack spacing={4}>
                        {currentFocus.skills.map((skill, index) => (
                            <Box key={index}>
                                <Flex justify="space-between" mb={1}>
                                    <Text fontSize="sm">{skill.name}</Text>
                                    <Text fontSize="sm" color="primary">
                                        {skill.masteryLevel}%
                                    </Text>
                                </Flex>
                                <Progress value={skill.progress} size="sm" />
                            </Box>
                        ))}
                    </Stack>
                    <Button mt={4} width="100%">
                        Continue Learning
                    </Button>
                </CardBody>
            </Card>
        );
    };

    // Enterprise Impact Section
    const EnterpriseImpact = () => (
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
            <Card>
                <CardBody>
                    <Flex justify="space-between" align="center" mb={2}>
                        <Text fontWeight="medium">Innovation Impact</Text>
                        <Rocket className="w-5 h-5 text-purple-500" />
                    </Flex>
                    <Text fontSize="2xl" fontWeight="bold" mb={2}>
                        {metrics.enterpriseMetrics.innovationScore}%
                    </Text>
                    <Progress 
                        value={metrics.enterpriseMetrics.innovationScore} 
                        size="sm"
                    />
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                    <Flex justify="space-between" align="center" mb={2}>
                        <Text fontWeight="medium">Team Impact</Text>
                        <Users className="w-5 h-5 text-blue-500" />
                    </Flex>
                    <Text fontSize="2xl" fontWeight="bold" mb={2}>
                        {metrics.enterpriseMetrics.teamEfficiency}%
                    </Text>
                    <Progress 
                        value={metrics.enterpriseMetrics.teamEfficiency} 
                        size="sm"
                    />
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                    <Flex justify="space-between" align="center" mb={2}>
                        <Text fontWeight="medium">Value Created</Text>
                        <TrendingUp className="w-5 h-5 text-green-500" />
                    </Flex>
                    <Text fontSize="2xl" fontWeight="bold" mb={2}>
                        ${metrics.enterpriseMetrics.valueCreated.toLocaleString()}
                    </Text>
                    <Progress 
                        value={(metrics.enterpriseMetrics.valueCreated / metrics.enterpriseMetrics.valueTarget) * 100} 
                        size="sm"
                    />
                </CardBody>
            </Card>
        </SimpleGrid>
    );

    // Breakthrough Celebration Modal
    const BreakthroughModal = () => (
        <AnimatePresence>
            {showBreakthrough && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                >
                    <Card className="w-96">
                        <CardBody className="text-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1 }}
                            >
                                <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
                            </motion.div>
                            <Text fontSize="2xl" fontWeight="bold" mb={2}>
                                Breakthrough!
                            </Text>
                            <Text mb={4}>
                                You've achieved a significant milestone!
                            </Text>
                            <Text fontSize="xl" fontWeight="bold" color="primary" mb={4}>
                                +${metrics.breakthroughValue.toLocaleString()} Value Created
                            </Text>
                            <Button 
                                width="100%"
                                onClick={() => setShowBreakthrough(false)}
                            >
                                Continue Learning
                            </Button>
                        </CardBody>
                    </Card>
                </motion.div>
            )}
        </AnimatePresence>
    );

    // Quick Quiz Preview
    const QuickQuizPreview = () => (
        <Card>
            <CardBody>
                <Flex justify="space-between" align="center" mb={4}>
                    <Box>
                        <Text fontWeight="semibold">Ready for a Challenge?</Text>
                        <Text fontSize="sm" color="gray.600">
                            Quick quiz to test your knowledge
                        </Text>
                    </Box>
                    <Target className="w-8 h-8 text-primary" />
                </Flex>
                <Stack spacing={2}>
                    <Flex justify="space-between">
                        <Text fontSize="sm">Difficulty</Text>
                        <Text fontSize="sm" color="primary">Adaptive</Text>
                    </Flex>
                    <Flex justify="space-between">
                        <Text fontSize="sm">Estimated Time</Text>
                        <Text fontSize="sm">5 mins</Text>
                    </Flex>
                    <Flex justify="space-between">
                        <Text fontSize="sm">Potential XP</Text>
                        <Text fontSize="sm" color="primary">+100 XP</Text>
                    </Flex>
                </Stack>
                <Button width="100%" mt={4}>
                    Start Quiz
                </Button>
            </CardBody>
        </Card>
    );

    return (
        <Stack spacing={6}>
            <QuickActions />
            
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <ValueTracker />
                <LearningFocus />
            </SimpleGrid>

            <EnterpriseImpact />
            
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <QuickQuizPreview />
                {/* Additional personalized content */}
            </SimpleGrid>

            <BreakthroughModal />
        </Stack>
    );
};

export default learninghub;