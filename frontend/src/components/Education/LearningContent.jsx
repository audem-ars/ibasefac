// src/components/education/LearningContent.jsx
import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Stack,
    Heading,
    Text,
    Code,
    VStack,
    HStack,
    Button,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Badge,
    Icon,
    useColorModeValue,
    Alert,
    AlertIcon,
    Progress,
    Tooltip,
    useToast,
    Collapse,
    IconButton,
    Flex,
    Divider,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel
} from '@chakra-ui/react';
import { 
    BookOpen, 
    Code as CodeIcon, 
    CheckCircle2, 
    Lightbulb,
    GraduationCap,
    Star,
    Clock,
    ChevronDown,
    ChevronUp,
    BookmarkPlus,
    PlayCircle,
    CheckCircle,
    Coffee,
    Award
} from 'lucide-react';
import { learningModules } from './LearningData';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const CodeBlock = ({ code }) => {
    const [isCopied, setIsCopied] = useState(false);
    const toast = useToast();

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setIsCopied(true);
        toast({
            title: "Code copied!",
            status: "success",
            duration: 2000,
        });
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.800')}
            p={4}
            borderRadius="md"
            my={4}
            position="relative"
        >
            <Button
                size="sm"
                position="absolute"
                top={2}
                right={2}
                onClick={handleCopy}
                colorScheme={isCopied ? "green" : "blue"}
            >
                {isCopied ? "Copied!" : "Copy"}
            </Button>
            <Code 
                display="block" 
                whiteSpace="pre" 
                p={2}
                pt={12}
                overflowX="auto"
                fontSize="sm"
                bg="transparent"
            >
                {code}
            </Code>
        </Box>
    );
};

const Example = ({ example, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const bgColor = useColorModeValue('blue.50', 'blue.900');

    return (
        <MotionCard 
            mb={6} 
            variant="outline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <CardHeader bg={bgColor} p={4}>
                <Flex justify="space-between" align="center">
                    <HStack>
                        <Icon as={CodeIcon} color="blue.500" />
                        <Heading size="sm">{example.concept}</Heading>
                    </HStack>
                    <IconButton
                        icon={isExpanded ? <ChevronUp /> : <ChevronDown />}
                        variant="ghost"
                        onClick={() => setIsExpanded(!isExpanded)}
                        aria-label="Toggle example"
                    />
                </Flex>
            </CardHeader>
            <Collapse in={isExpanded}>
                <CardBody>
                    <CodeBlock code={example.code} />
                    <Text mt={2} color={useColorModeValue('gray.600', 'gray.300')}>
                        {example.explanation}
                    </Text>
                </CardBody>
            </Collapse>
        </MotionCard>
    );
};

const LearningObjectives = ({ objectives }) => {
    const [completedObjectives, setCompletedObjectives] = useState(new Set());
    const toast = useToast();

    const toggleObjective = (index) => {
        const newCompleted = new Set(completedObjectives);
        if (newCompleted.has(index)) {
            newCompleted.delete(index);
        } else {
            newCompleted.add(index);
            toast({
                title: "Objective completed!",
                description: "Keep up the great work!",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        }
        setCompletedObjectives(newCompleted);
    };

    return (
        <MotionCard 
            mb={6} 
            variant="outline"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
        >
            <CardHeader bg={useColorModeValue('green.50', 'green.900')} p={4}>
                <HStack justify="space-between">
                    <HStack>
                        <Icon as={GraduationCap} color="green.500" />
                        <Heading size="md">Learning Objectives</Heading>
                    </HStack>
                    <Badge colorScheme="green">
                        {completedObjectives.size}/{objectives.length} Complete
                    </Badge>
                </HStack>
            </CardHeader>
            <CardBody>
                <VStack align="stretch" spacing={3}>
                    {objectives.map((objective, index) => (
                        <HStack 
                            key={index}
                            onClick={() => toggleObjective(index)}
                            cursor="pointer"
                            p={2}
                            borderRadius="md"
                            bg={completedObjectives.has(index) ? useColorModeValue('green.50', 'green.900') : 'transparent'}
                            transition="all 0.2s"
                            _hover={{
                                bg: useColorModeValue('gray.50', 'gray.700')
                            }}
                        >
                            <Icon 
                                as={completedObjectives.has(index) ? CheckCircle : CheckCircle2} 
                                color={completedObjectives.has(index) ? "green.500" : "gray.500"}
                            />
                            <Text>{objective}</Text>
                        </HStack>
                    ))}
                </VStack>
            </CardBody>
            <CardFooter>
                <Progress 
                    value={(completedObjectives.size / objectives.length) * 100}
                    size="sm"
                    colorScheme="green"
                    borderRadius="full"
                    width="100%"
                />
            </CardFooter>
        </MotionCard>
    );
};

const InteractiveContent = ({ content }) => {
    const [readingProgress, setReadingProgress] = useState(0);
    const [hasReachedBottom, setHasReachedBottom] = useState(false);
    const toast = useToast();

    useEffect(() => {
        const handleScroll = (e) => {
            const element = e.target;
            const scrollPercent = (element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100;
            setReadingProgress(scrollPercent);
            
            if (scrollPercent > 90 && !hasReachedBottom) {
                setHasReachedBottom(true);
                toast({
                    title: "Great progress!",
                    description: "You've read through this section! Time for a coffee break? ☕",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    icon: <Coffee />
                });
            }
        };

        document.addEventListener('scroll', handleScroll);
        return () => document.removeEventListener('scroll', handleScroll);
    }, [hasReachedBottom, toast]);

    return (
        <Card mb={6}>
            <CardHeader>
                <HStack justify="space-between">
                    <HStack>
                        <Icon as={BookOpen} color="blue.500" />
                        <Heading size="md">Content</Heading>
                    </HStack>
                    <Tooltip label="Reading progress">
                        <Progress 
                            value={readingProgress} 
                            size="sm" 
                            width="100px" 
                            colorScheme="blue" 
                            borderRadius="full"
                        />
                    </Tooltip>
                </HStack>
            </CardHeader>
            <CardBody>
                <Text
                    fontSize="lg"
                    color={useColorModeValue('gray.700', 'gray.300')}
                    lineHeight="tall"
                >
                    {content.split('Key concepts covered:')[0]}
                </Text>
            </CardBody>
        </Card>
    );
};

const LearningContent = ({ moduleId, sectionIndex }) => {
    const toast = useToast();
    const [timeSpent, setTimeSpent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeSpent(prev => prev + 1);
        }, 60000); // Update every minute

        return () => clearInterval(timer);
    }, []);

    try {
        const module = learningModules.find(m => m.id === parseInt(moduleId));
        if (!module) return <Alert status="error"><AlertIcon />Module not found</Alert>;

        const section = module.content.sections[sectionIndex];
        if (!section) return <Alert status="error"><AlertIcon />Section not found</Alert>;

        return (
            <Box maxW="1200px" mx="auto" p={8}>
                {/* Header */}
                <VStack align="stretch" spacing={4} mb={8}>
                    <HStack justify="space-between">
                        <Heading size="lg">{section.title}</Heading>
                        <HStack>
                            <Tooltip label="Time spent on this section">
                                <HStack>
                                    <Icon as={Clock} />
                                    <Text>{timeSpent} min</Text>
                                </HStack>
                            </Tooltip>
                            <IconButton
                                icon={<BookmarkPlus />}
                                aria-label="Bookmark section"
                                onClick={() => toast({
                                    title: "Section bookmarked!",
                                    status: "success",
                                    duration: 2000,
                                })}
                            />
                        </HStack>
                    </HStack>
                    <Progress size="xs" colorScheme="blue" value={(sectionIndex + 1) * (100 / module.content.sections.length)} />
                </VStack>

                <Tabs variant="enclosed" colorScheme="blue" mb={8}>
                    <TabList>
                        <Tab><Icon as={BookOpen} mr={2} />Content</Tab>
                        <Tab><Icon as={GraduationCap} mr={2} />Objectives</Tab>
                        <Tab><Icon as={CodeIcon} mr={2} />Examples</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <InteractiveContent content={section.content} />
                        </TabPanel>
                        <TabPanel>
                            <LearningObjectives objectives={section.learningObjectives} />
                        </TabPanel>
                        <TabPanel>
                            <VStack align="stretch" spacing={4}>
                                {section.examples?.map((example, index) => (
                                    <Example key={index} example={example} index={index} />
                                ))}
                            </VStack>
                        </TabPanel>
                    </TabPanels>
                </Tabs>

                {/* Achievement Card */}
                <MotionCard
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    bg={useColorModeValue('purple.50', 'purple.900')}
                    p={4}
                >
                    <HStack spacing={4}>
                        <Icon as={Award} color="purple.500" boxSize={8} />
                        <VStack align="start" spacing={0}>
                            <Heading size="sm">Keep going!</Heading>
                            <Text>You're making great progress in your learning journey.</Text>
                        </VStack>
                    </HStack>
                </MotionCard>
            </Box>
        );
    } catch (error) {
        console.error('Error in LearningContent:', error);
        return <Alert status="error"><AlertIcon />An error occurred while loading the content</Alert>;
    }
};

export default LearningContent;