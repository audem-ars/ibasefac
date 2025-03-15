import React from 'react';
import {
    Box,
    Card,
    CardHeader,
    CardBody,
    Stack,
    Heading,
    Text,
    Button,
    SimpleGrid,
    Badge,
    Flex,
    List,
    ListItem,
    ListIcon
} from '@chakra-ui/react';
import { AlertCircle, Book, CheckCircle, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PracticalGuidelines = () => {
    const navigate = useNavigate();

    const guidelines = [
        {
            id: 'transparency',
            title: 'AI Transparency Guidelines',
            description: 'Essential practices for maintaining transparency in AI systems',
            category: 'Core',
            topics: [
                'AI System Disclosure',
                'User Interaction Labeling',
                'Capability Documentation',
                'Limitation Transparency'
            ],
            requirements: [
                'Clear AI identification in user interfaces',
                'Documentation of AI capabilities and limitations',
                'Regular updates on system changes',
                'User-friendly explanation of AI decisions'
            ],
            difficulty: 'Beginner'
        },
        {
            id: 'data-privacy',
            title: 'Data Privacy Best Practices',
            description: 'Comprehensive guide to protecting user data in AI systems',
            category: 'Essential',
            topics: [
                'Data Collection Standards',
                'Storage Security',
                'Processing Guidelines',
                'User Rights Management'
            ],
            requirements: [
                'Secure data collection methods',
                'Privacy-preserving storage solutions',
                'Transparent data usage policies',
                'User consent management systems'
            ],
            difficulty: 'Intermediate'
        },
        {
            id: 'bias-detection',
            title: 'Bias Detection & Mitigation',
            description: 'Strategies for identifying and addressing AI bias',
            category: 'Advanced',
            topics: [
                'Testing Frameworks',
                'Monitoring Tools',
                'Mitigation Strategies',
                'Regular Audits'
            ],
            requirements: [
                'Comprehensive bias testing protocols',
                'Continuous monitoring systems',
                'Mitigation strategy documentation',
                'Regular bias audit procedures'
            ],
            difficulty: 'Advanced'
        },
        {
            id: 'risk-assessment',
            title: 'AI Risk Assessment Framework',
            description: 'Systematic approach to evaluating AI system risks',
            category: 'Essential',
            topics: [
                'Risk Identification',
                'Impact Analysis',
                'Mitigation Planning',
                'Monitoring Systems'
            ],
            requirements: [
                'Risk assessment methodology',
                'Impact evaluation criteria',
                'Mitigation strategy development',
                'Continuous monitoring protocols'
            ],
            difficulty: 'Intermediate'
        }
    ];

    const getDifficultyColor = (difficulty) => {
        switch (difficulty.toLowerCase()) {
            case 'beginner':
                return 'green';
            case 'intermediate':
                return 'blue';
            case 'advanced':
                return 'purple';
            default:
                return 'gray';
        }
    };

    return (
        <Box p={6}>
            <Stack spacing={6}>
                <Flex justify="space-between" align="center" mb={4}>
                    <Stack>
                        <Heading size="lg">Practical Guidelines</Heading>
                        <Text color="gray.600">
                            Comprehensive guides for responsible AI implementation
                        </Text>
                    </Stack>
                    <Button
                        leftIcon={<Info size={16} />}
                        colorScheme="blue"
                        variant="outline"
                        onClick={() => navigate('/regulations/guidelines/overview')}
                    >
                        Guidelines Overview
                    </Button>
                </Flex>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={6}>
                    {guidelines.map((guideline) => (
                        <Card 
                            key={guideline.id}
                            variant="outline"
                            _hover={{ shadow: 'md' }}
                            transition="all 0.2s"
                        >
                            <CardHeader>
                                <Stack spacing={2}>
                                    <Flex justify="space-between" align="center">
                                        <Heading size="md">{guideline.title}</Heading>
                                        <Badge 
                                            colorScheme={getDifficultyColor(guideline.difficulty)}
                                        >
                                            {guideline.difficulty}
                                        </Badge>
                                    </Flex>
                                    <Text color="gray.600">{guideline.description}</Text>
                                </Stack>
                            </CardHeader>
                            <CardBody>
                                <Stack spacing={4}>
                                    <Box>
                                        <Text fontWeight="medium" mb={2}>Key Topics:</Text>
                                        <List spacing={1}>
                                            {guideline.topics.map((topic, index) => (
                                                <ListItem 
                                                    key={index}
                                                    display="flex"
                                                    alignItems="center"
                                                >
                                                    <ListIcon as={CheckCircle} color="green.500" />
                                                    {topic}
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                    <Button
                                        leftIcon={<Book size={16} />}
                                        colorScheme="blue"
                                        onClick={() => navigate(`/regulations/guidelines/${guideline.id}`)}
                                        mt={2}
                                    >
                                        View Guidelines
                                    </Button>
                                </Stack>
                            </CardBody>
                        </Card>
                    ))}
                </SimpleGrid>
            </Stack>
        </Box>
    );
};

export default PracticalGuidelines;