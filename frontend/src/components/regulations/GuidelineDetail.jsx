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
    List,
    ListItem,
    ListIcon,
    Flex,
    Badge,
    Divider,
    Grid,
    GridItem
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    CheckCircle, 
    AlertCircle, 
    Book, 
    Download,
    ArrowLeft,
    FileText
} from 'lucide-react';

const GuidelineDetail = () => {
    const { guidelineId } = useParams();
    const navigate = useNavigate();

    // Inside GuidelineDetail.jsx, update the guidelineDetails object:

const guidelineDetails = {
    'transparency': {
        title: 'AI Transparency Guidelines',
        description: 'Essential practices for maintaining transparency in AI systems',
        category: 'Core',
        requirements: [
            {
                title: 'Clear AI Identification',
                description: 'Systems must clearly indicate when users are interacting with AI',
                steps: [
                    'Include AI disclosure in user interfaces',
                    'Provide clear indicators of AI-generated content',
                    'Display AI involvement in decision-making processes'
                ]
            },
            {
                title: 'Capability Documentation',
                description: 'Document and communicate AI system capabilities',
                steps: [
                    'List core functionalities and features',
                    'Document known limitations and constraints',
                    'Provide accuracy and performance metrics'
                ]
            },
            {
                title: 'Update Transparency',
                description: 'Keep users informed of system changes',
                steps: [
                    'Maintain changelog of system updates',
                    'Communicate significant changes to users',
                    'Document impact of updates on functionality'
                ]
            }
        ],
        resources: [
            {
                title: 'Implementation Guide',
                type: 'PDF',
                size: '2.4 MB'
            },
            {
                title: 'Checklist Template',
                type: 'XLSX',
                size: '1.1 MB'
            }
        ]
    },
    'data-privacy': {
        title: 'Data Privacy Best Practices',
        description: 'Protecting personal information in AI systems',
        category: 'Essential',
        requirements: [
            {
                title: 'Data Collection Standards',
                description: 'Establish and maintain strict standards for data collection',
                steps: [
                    'Implement data minimization principles',
                    'Establish clear data retention policies',
                    'Create secure data collection channels',
                    'Document data collection purposes'
                ]
            },
            {
                title: 'Storage Security Protocols',
                description: 'Ensure secure storage of all collected data',
                steps: [
                    'Implement encryption at rest and in transit',
                    'Establish access control mechanisms',
                    'Regular security audits and updates',
                    'Backup and recovery procedures'
                ]
            },
            {
                title: 'User Rights Management',
                description: 'Protect and manage user data rights',
                steps: [
                    'Implement data access request system',
                    'Provide data deletion capabilities',
                    'Enable data portability options',
                    'Maintain user consent records'
                ]
            }
        ],
        resources: [
            {
                title: 'Privacy Framework',
                type: 'PDF',
                size: '3.1 MB'
            },
            {
                title: 'Security Checklist',
                type: 'PDF',
                size: '1.8 MB'
            }
        ]
    },
    'bias-detection': {
        title: 'Bias Detection & Mitigation',
        description: 'Methods for identifying and mitigating AI bias',
        category: 'Advanced',
        requirements: [
            {
                title: 'Testing Framework Implementation',
                description: 'Establish comprehensive bias testing protocols',
                steps: [
                    'Define bias metrics and thresholds',
                    'Implement automated testing pipelines',
                    'Establish diverse test datasets',
                    'Regular bias assessment schedules'
                ]
            },
            {
                title: 'Monitoring System Setup',
                description: 'Create ongoing bias monitoring systems',
                steps: [
                    'Deploy real-time bias detection tools',
                    'Set up alerting mechanisms',
                    'Track bias metrics over time',
                    'Implement feedback collection systems'
                ]
            },
            {
                title: 'Mitigation Strategy Development',
                description: 'Develop and implement bias mitigation plans',
                steps: [
                    'Create bias response protocols',
                    'Establish mitigation priorities',
                    'Implement correction mechanisms',
                    'Document mitigation effectiveness'
                ]
            }
        ],
        resources: [
            {
                title: 'Bias Detection Guide',
                type: 'PDF',
                size: '4.2 MB'
            },
            {
                title: 'Mitigation Toolkit',
                type: 'ZIP',
                size: '8.5 MB'
            }
        ]
    },
    'risk-assessment': {
        title: 'AI Risk Assessment Framework',
        description: 'Frameworks for evaluating AI system risks',
        category: 'Essential',
        requirements: [
            {
                title: 'Risk Identification Process',
                description: 'Systematic approach to identifying potential risks',
                steps: [
                    'Conduct threat modeling sessions',
                    'Identify potential failure modes',
                    'Assess security vulnerabilities',
                    'Document risk scenarios'
                ]
            },
            {
                title: 'Impact Analysis Methodology',
                description: 'Evaluate potential impact of identified risks',
                steps: [
                    'Define impact categories',
                    'Establish severity scales',
                    'Assess likelihood factors',
                    'Calculate risk scores'
                ]
            },
            {
                title: 'Mitigation Planning',
                description: 'Develop comprehensive risk mitigation strategies',
                steps: [
                    'Prioritize risk mitigation efforts',
                    'Develop mitigation strategies',
                    'Allocate mitigation resources',
                    'Create implementation timelines'
                ]
            }
        ],
        resources: [
            {
                title: 'Risk Assessment Template',
                type: 'XLSX',
                size: '2.8 MB'
            },
            {
                title: 'Mitigation Handbook',
                type: 'PDF',
                size: '5.3 MB'
            }
        ]
    }

        // Add other guidelines here
    };

    const guideline = guidelineDetails[guidelineId];

    return (
        <Box p={6}>
            <Stack spacing={6}>
                <Flex justify="space-between" align="center">
                    <Button
                        leftIcon={<ArrowLeft size={16} />}
                        variant="ghost"
                        onClick={() => navigate('/regulations/guidelines')}
                    >
                        Back to Guidelines
                    </Button>
                    <Badge colorScheme="blue" p={2}>
                        {guideline?.category}
                    </Badge>
                </Flex>

                <Card>
                    <CardHeader>
                        <Stack spacing={4}>
                            <Heading size="lg">{guideline?.title}</Heading>
                            <Text color="gray.600">{guideline?.description}</Text>
                        </Stack>
                    </CardHeader>
                    <CardBody>
                        <Stack spacing={6}>
                            {guideline?.requirements.map((req, index) => (
                                <Box key={index}>
                                    <Heading size="md" mb={3}>
                                        {req.title}
                                    </Heading>
                                    <Text mb={4}>{req.description}</Text>
                                    <List spacing={3}>
                                        {req.steps.map((step, stepIndex) => (
                                            <ListItem 
                                                key={stepIndex}
                                                display="flex"
                                                alignItems="center"
                                            >
                                                <ListIcon as={CheckCircle} color="green.500" />
                                                {step}
                                            </ListItem>
                                        ))}
                                    </List>
                                    {index < guideline.requirements.length - 1 && (
                                        <Divider my={6} />
                                    )}
                                </Box>
                            ))}
                        </Stack>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>
                        <Heading size="md">Implementation Resources</Heading>
                    </CardHeader>
                    <CardBody>
                        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                            {guideline?.resources.map((resource, index) => (
                                <GridItem key={index}>
                                    <Card variant="outline">
                                        <CardBody>
                                            <Flex justify="space-between" align="center">
                                                <Stack>
                                                    <Flex align="center" gap={2}>
                                                        <FileText size={16} />
                                                        <Text fontWeight="medium">
                                                            {resource.title}
                                                        </Text>
                                                    </Flex>
                                                    <Text color="gray.500" fontSize="sm">
                                                        {resource.type} • {resource.size}
                                                    </Text>
                                                </Stack>
                                                <Button
                                                    leftIcon={<Download size={16} />}
                                                    size="sm"
                                                    colorScheme="blue"
                                                    variant="ghost"
                                                >
                                                    Download
                                                </Button>
                                            </Flex>
                                        </CardBody>
                                    </Card>
                                </GridItem>
                            ))}
                        </Grid>
                    </CardBody>
                </Card>
            </Stack>
        </Box>
    );
};

export default GuidelineDetail;