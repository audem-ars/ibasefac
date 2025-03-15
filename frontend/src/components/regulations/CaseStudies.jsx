// src/components/regulations/CaseStudies.jsx

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
    Flex,
    Badge,
    List,
    ListItem,
    ListIcon,
    Divider,
    Progress
} from '@chakra-ui/react';
import { 
    CheckCircle, 
    AlertCircle, 
    FileText,
    Clock,
    ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CaseStudies = () => {
    const navigate = useNavigate();

    const caseStudies = [
        {
            id: 'healthcare-ai',
            title: 'Healthcare AI Implementation',
            organization: 'Major US Hospital Network',
            timeline: '2022-2024',
            status: 'Completed',
            successRate: 92,
            category: 'Healthcare',
            impact: 'Reduced diagnosis time by 60%',
            description: 'Implementation of AI diagnostic tools in radiology department across 12 hospitals.',
            challenges: [
                'Data privacy compliance',
                'Staff training and adoption',
                'Integration with existing systems',
                'Performance validation'
            ],
            outcomes: [
                'Reduced patient wait times by 45%',
                'Improved diagnostic accuracy by 28%',
                'Decreased radiologist workload by 35%',
                'Cost savings of $2.3M annually'
            ],
            lessons: [
                'Early stakeholder involvement is crucial',
                'Phased rollout reduces disruption',
                'Continuous training improves adoption',
                'Regular performance audits essential'
            ]
        },
        {
            id: 'ai-myths',
            title: 'OpenAI Transition Case Study',
            organization: 'Tech Industry Analysis',
            timeline: '2023-2024',
            status: 'Recent',
            category: 'Industry Analysis',
            impact: 'Major industry shift',
            description: 'Analysis of OpenAI\'s transition from non-profit to capped-profit model and its industry impact.',
            challenges: [
                'Balancing profit with AI safety',
                'Maintaining transparency',
                'Stakeholder management',
                'Public perception'
            ],
            outcomes: [
                'Increased investment in AI safety',
                'New industry standards for AI governance',
                'Enhanced public discourse on AI ethics',
                'Improved corporate accountability models'
            ],
            lessons: [
                'Clear communication is essential',
                'Governance structure matters',
                'Balance profit with ethics',
                'Transparency builds trust'
            ]
        },
        {
            id: 'privacy-compliance',
            title: 'AI Privacy Implementation',
            organization: 'European Financial Institution',
            timeline: '2023-2024',
            status: 'Ongoing',
            successRate: 85,
            category: 'Finance',
            impact: 'Enhanced data protection',
            description: 'Implementation of privacy-preserving AI systems in compliance with EU regulations.',
            challenges: [
                'Complex regulatory requirements',
                'Legacy system integration',
                'Real-time compliance monitoring',
                'Cross-border data handling'
            ],
            outcomes: [
                'Full GDPR compliance achieved',
                'Improved customer trust metrics',
                'Reduced privacy incidents by 75%',
                'Automated compliance reporting'
            ],
            lessons: [
                'Start with regulatory framework',
                'Invest in proper infrastructure',
                'Regular compliance audits needed',
                'Staff training is crucial'
            ]
        }
    ];

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return 'green';
            case 'ongoing':
                return 'blue';
            case 'recent':
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
                        <Heading size="lg">AI Implementation Case Studies</Heading>
                        <Text color="gray.600">
                            Real-world examples of AI deployment and lessons learned
                        </Text>
                    </Stack>
                </Flex>

                <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={6}>
                    {caseStudies.map((study) => (
                        <Card key={study.id} variant="outline">
                            <CardHeader>
                                <Stack spacing={3}>
                                    <Flex justify="space-between" align="center">
                                        <Heading size="md">{study.title}</Heading>
                                        <Badge colorScheme={getStatusColor(study.status)}>
                                            {study.status}
                                        </Badge>
                                    </Flex>
                                    <Flex gap={4}>
                                        <Text fontSize="sm" color="gray.500">
                                            <Clock size={14} style={{ display: 'inline', marginRight: '4px' }} />
                                            {study.timeline}
                                        </Text>
                                        <Text fontSize="sm" color="gray.500">
                                            {study.category}
                                        </Text>
                                    </Flex>
                                    <Text>{study.description}</Text>
                                    {study.successRate && (
                                        <Box>
                                            <Flex justify="space-between" mb={2}>
                                                <Text fontSize="sm">Implementation Success</Text>
                                                <Text fontSize="sm" fontWeight="bold">{study.successRate}%</Text>
                                            </Flex>
                                            <Progress 
                                                value={study.successRate} 
                                                colorScheme={study.successRate > 90 ? 'green' : 'blue'} 
                                                size="sm" 
                                                borderRadius="full"
                                            />
                                        </Box>
                                    )}
                                </Stack>
                            </CardHeader>
                            <CardBody>
                                <Stack spacing={4}>
                                    <Box>
                                        <Text fontWeight="medium" mb={2}>Key Challenges:</Text>
                                        <List spacing={2}>
                                            {study.challenges.map((challenge, index) => (
                                                <ListItem 
                                                    key={index}
                                                    display="flex"
                                                    alignItems="center"
                                                >
                                                    <ListIcon as={AlertCircle} color="orange.500" />
                                                    {challenge}
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                    
                                    <Divider />
                                    
                                    <Box>
                                        <Text fontWeight="medium" mb={2}>Outcomes:</Text>
                                        <List spacing={2}>
                                            {study.outcomes.map((outcome, index) => (
                                                <ListItem 
                                                    key={index}
                                                    display="flex"
                                                    alignItems="center"
                                                >
                                                    <ListIcon as={CheckCircle} color="green.500" />
                                                    {outcome}
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>

                                    <Button
                                        leftIcon={<FileText size={16} />}
                                        rightIcon={<ArrowRight size={16} />}
                                        colorScheme="blue"
                                        onClick={() => navigate(`/regulations/case-studies/${study.id}`)}
                                    >
                                        View Full Case Study
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

export default CaseStudies;