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
    List,
    ListItem,
    ListIcon,
    Flex,
    Divider,
    Progress,
    Icon
} from '@chakra-ui/react';
import {
    Shield,
    Target,
    Users,
    Scale,
    CheckCircle,
    AlertTriangle,
    FileText,
    ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GuidelinesOverview = () => {
    const navigate = useNavigate();

    const frameworkPillars = [
        {
            title: 'Transparency',
            icon: Shield,
            description: 'Building trust through clear communication and disclosure',
            principles: [
                'Clear AI system identification',
                'Open communication about capabilities',
                'Regular updates and notifications'
            ]
        },
        {
            title: 'Privacy',
            icon: Users,
            description: 'Protecting user data and maintaining confidentiality',
            principles: [
                'Secure data handling',
                'User rights protection',
                'Consent management'
            ]
        },
        {
            title: 'Fairness',
            icon: Scale,
            description: 'Ensuring equitable treatment and preventing bias',
            principles: [
                'Bias detection and mitigation',
                'Equal access provisions',
                'Fair decision making'
            ]
        },
        {
            title: 'Risk Management',
            icon: Target,
            description: 'Identifying and mitigating potential risks',
            principles: [
                'Systematic risk assessment',
                'Impact analysis',
                'Mitigation strategies'
            ]
        }
    ];

    const implementationSteps = [
        {
            title: 'Assessment',
            description: 'Evaluate your current AI systems and identify areas for improvement',
            progress: 100
        },
        {
            title: 'Planning',
            description: 'Develop implementation strategies and timelines',
            progress: 100
        },
        {
            title: 'Implementation',
            description: 'Execute guidelines across your organization',
            progress: 75
        },
        {
            title: 'Monitoring',
            description: 'Continuous oversight and improvement',
            progress: 50
        }
    ];

    return (
        <Box p={6}>
            <Stack spacing={6}>
                {/* Header Section */}
                <Flex justify="space-between" align="center">
                    <Button
                        leftIcon={<ArrowLeft size={16} />}
                        variant="ghost"
                        onClick={() => navigate('/regulations/guidelines')}
                    >
                        Back to Guidelines
                    </Button>
                </Flex>

                {/* Introduction Card */}
                <Card>
                    <CardHeader>
                        <Stack spacing={4}>
                            <Heading size="lg">AI Guidelines Framework</Heading>
                            <Text color="gray.600">
                                A comprehensive approach to responsible AI implementation, focusing on
                                transparency, privacy, fairness, and risk management. These guidelines
                                provide a structured framework for organizations to develop and deploy
                                AI systems responsibly.
                            </Text>
                        </Stack>
                    </CardHeader>
                    <CardBody>
                        <Stack spacing={6}>
                            <Box>
                                <Heading size="md" mb={4}>Framework Pillars</Heading>
                                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                                    {frameworkPillars.map((pillar, index) => (
                                        <Card key={index} variant="outline">
                                            <CardBody>
                                                <Stack spacing={4}>
                                                    <Flex align="center" gap={2}>
                                                        <Icon as={pillar.icon} boxSize={6} color="blue.500" />
                                                        <Heading size="md">{pillar.title}</Heading>
                                                    </Flex>
                                                    <Text color="gray.600">{pillar.description}</Text>
                                                    <List spacing={2}>
                                                        {pillar.principles.map((principle, pIndex) => (
                                                            <ListItem 
                                                                key={pIndex}
                                                                display="flex"
                                                                alignItems="center"
                                                            >
                                                                <ListIcon as={CheckCircle} color="green.500" />
                                                                {principle}
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                </Stack>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </SimpleGrid>
                            </Box>

                            <Divider />

                            {/* Implementation Progress */}
                            <Box>
                                <Heading size="md" mb={4}>Implementation Roadmap</Heading>
                                <Stack spacing={4}>
                                    {implementationSteps.map((step, index) => (
                                        <Card key={index} variant="outline">
                                            <CardBody>
                                                <Stack spacing={3}>
                                                    <Flex justify="space-between" align="center">
                                                        <Heading size="sm">{step.title}</Heading>
                                                        <Text color="blue.500" fontWeight="medium">
                                                            {step.progress}%
                                                        </Text>
                                                    </Flex>
                                                    <Text color="gray.600" fontSize="sm">
                                                        {step.description}
                                                    </Text>
                                                    <Progress 
                                                        value={step.progress} 
                                                        colorScheme="blue" 
                                                        size="sm" 
                                                        borderRadius="full"
                                                    />
                                                </Stack>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </Stack>
                            </Box>

                            {/* Key Considerations */}
                            <Card>
                                <CardHeader>
                                    <Heading size="md">Key Considerations</Heading>
                                </CardHeader>
                                <CardBody>
                                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                                        <Flex gap={3}>
                                            <AlertTriangle size={20} color="orange" />
                                            <Text>Regular updates to align with evolving AI regulations</Text>
                                        </Flex>
                                        <Flex gap={3}>
                                            <AlertTriangle size={20} color="orange" />
                                            <Text>Integration with existing business processes</Text>
                                        </Flex>
                                        <Flex gap={3}>
                                            <AlertTriangle size={20} color="orange" />
                                            <Text>Employee training and awareness programs</Text>
                                        </Flex>
                                        <Flex gap={3}>
                                            <AlertTriangle size={20} color="orange" />
                                            <Text>Regular audits and compliance checks</Text>
                                        </Flex>
                                    </SimpleGrid>
                                </CardBody>
                            </Card>

                            {/* Resource Button */}
                            <Button
                                leftIcon={<FileText size={16} />}
                                colorScheme="blue"
                                size="lg"
                                onClick={() => {/* Add download functionality */}}
                            >
                                Download Complete Guidelines Package
                            </Button>
                        </Stack>
                    </CardBody>
                </Card>
            </Stack>
        </Box>
    );
};

export default GuidelinesOverview;