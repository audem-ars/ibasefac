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
    Flex,
    Badge,
    List,
    ListItem,
    ListIcon,
    Divider,
    SimpleGrid,
    Alert,
    AlertIcon
} from '@chakra-ui/react';
import { 
    ArrowLeft,
    CheckCircle, 
    AlertCircle,
    Clock,
    Building,
    FileText,
    Download
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const CaseStudyDetail = () => {
    const { caseStudyId } = useParams();
    const navigate = useNavigate();

    const caseStudiesData = {
        'healthcare-ai': {
            title: 'Healthcare AI Implementation',
            organization: 'Major US Hospital Network',
            timeline: '2022-2024',
            status: 'Completed',
            successRate: 92,
            category: 'Healthcare',
            impact: 'Reduced diagnosis time by 60%',
            description: 'Implementation of AI diagnostic tools in radiology department across 12 hospitals.',
            fullDescription: `This case study examines the successful implementation of AI diagnostic tools 
                            across a major US hospital network. The project spanned 24 months and involved 
                            integrating AI systems into existing radiology workflows across 12 hospitals.`,
            challenges: [
                {
                    title: 'Data Privacy Compliance',
                    description: 'Ensuring HIPAA compliance while training AI models',
                    solutions: [
                        'Implemented secure data handling protocols',
                        'Developed anonymization pipelines',
                        'Established access control systems'
                    ]
                },
                {
                    title: 'Staff Training and Adoption',
                    description: 'Training medical staff on new AI systems',
                    solutions: [
                        'Created comprehensive training programs',
                        'Developed user-friendly interfaces',
                        'Provided ongoing support systems'
                    ]
                },
                {
                    title: 'System Integration',
                    description: 'Integrating with existing hospital systems',
                    solutions: [
                        'Built custom API interfaces',
                        'Developed fallback systems',
                        'Implemented gradual rollout'
                    ]
                }
            ],
            metrics: [
                {
                    label: 'Diagnosis Time Reduction',
                    value: '60%',
                    color: 'green'
                },
                {
                    label: 'Accuracy Improvement',
                    value: '28%',
                    color: 'blue'
                },
                {
                    label: 'Cost Reduction',
                    value: '35%',
                    color: 'purple'
                }
            ],
            implementationPhases: [
                {
                    phase: 'Planning',
                    duration: '3 months',
                    milestones: [
                        'Stakeholder alignment',
                        'Requirements gathering',
                        'Vendor selection'
                    ]
                },
                {
                    phase: 'Implementation',
                    duration: '12 months',
                    milestones: [
                        'System integration',
                        'Staff training',
                        'Pilot program'
                    ]
                },
                {
                    phase: 'Optimization',
                    duration: '9 months',
                    milestones: [
                        'Performance tuning',
                        'Workflow refinement',
                        'Scale deployment'
                    ]
                }
            ],
            documents: [
                {
                    title: 'Implementation Guide',
                    type: 'PDF',
                    size: '2.8 MB'
                },
                {
                    title: 'Technical Specifications',
                    type: 'PDF',
                    size: '1.5 MB'
                },
                {
                    title: 'Training Materials',
                    type: 'ZIP',
                    size: '4.2 MB'
                }
            ]
        },
        'ai-myths': {
            title: 'OpenAI Transition Case Study',
            organization: 'Tech Industry Analysis',
            timeline: '2023-2024',
            status: 'Recent',
            category: 'Industry Analysis',
            impact: 'Major industry shift',
            description: 'Analysis of OpenAI\'s transition from non-profit to capped-profit model and its industry impact.',
            fullDescription: `This case study examines OpenAI's significant organizational transformation and its broader implications for the AI industry. The analysis covers the transition period and its effects on AI governance models.`,
            challenges: [
                {
                    title: 'Balancing Profit with AI Safety',
                    description: 'Managing commercial interests while maintaining AI safety commitments',
                    solutions: [
                        'Established safety-first protocols',
                        'Created oversight mechanisms',
                        'Implemented ethical guidelines'
                    ]
                },
                {
                    title: 'Stakeholder Management',
                    description: 'Managing diverse stakeholder expectations during transition',
                    solutions: [
                        'Enhanced communication channels',
                        'Regular stakeholder updates',
                        'Transparent decision-making processes'
                    ]
                },
                {
                    title: 'Public Perception',
                    description: 'Maintaining public trust during organizational change',
                    solutions: [
                        'Proactive communication strategy',
                        'Regular public updates',
                        'Engagement with AI community'
                    ]
                }
            ],
            metrics: [
                {
                    label: 'Safety Compliance',
                    value: '100%',
                    color: 'green'
                },
                {
                    label: 'Stakeholder Satisfaction',
                    value: '85%',
                    color: 'blue'
                },
                {
                    label: 'Public Trust Index',
                    value: '78%',
                    color: 'purple'
                }
            ],
            implementationPhases: [
                {
                    phase: 'Transition Planning',
                    duration: '6 months',
                    milestones: [
                        'Stakeholder consultation',
                        'Governance model design',
                        'Transition roadmap'
                    ]
                },
                {
                    phase: 'Implementation',
                    duration: '3 months',
                    milestones: [
                        'Legal restructuring',
                        'Policy updates',
                        'Communication rollout'
                    ]
                },
                {
                    phase: 'Stabilization',
                    duration: '6 months',
                    milestones: [
                        'Monitoring impacts',
                        'Adjusting policies',
                        'Stakeholder feedback'
                    ]
                }
            ],
            documents: [
                {
                    title: 'Transition Report',
                    type: 'PDF',
                    size: '3.2 MB'
                },
                {
                    title: 'Governance Framework',
                    type: 'PDF',
                    size: '1.8 MB'
                },
                {
                    title: 'Impact Analysis',
                    type: 'PDF',
                    size: '2.5 MB'
                }
            ]
        },
        'privacy-compliance': {
            title: 'AI Privacy Implementation',
            organization: 'European Financial Institution',
            timeline: '2023-2024',
            status: 'Ongoing',
            category: 'Finance',
            impact: 'Enhanced data protection',
            description: 'Implementation of privacy-preserving AI systems in compliance with EU regulations.',
            fullDescription: `This case study documents the implementation of comprehensive privacy-preserving AI systems within a major European financial institution, ensuring compliance with GDPR and emerging EU AI regulations.`,
            challenges: [
                {
                    title: 'Regulatory Compliance',
                    description: 'Meeting complex EU privacy requirements',
                    solutions: [
                        'Developed compliance framework',
                        'Implemented monitoring systems',
                        'Created audit trails'
                    ]
                },
                {
                    title: 'Technical Integration',
                    description: 'Integrating privacy features with legacy systems',
                    solutions: [
                        'Custom API development',
                        'Privacy-preserving protocols',
                        'System modernization'
                    ]
                },
                {
                    title: 'Data Management',
                    description: 'Ensuring compliant data handling across operations',
                    solutions: [
                        'Data mapping implementation',
                        'Privacy-by-design approach',
                        'Automated compliance checks'
                    ]
                }
            ],
            metrics: [
                {
                    label: 'Privacy Compliance',
                    value: '99%',
                    color: 'green'
                },
                {
                    label: 'Data Protection',
                    value: '100%',
                    color: 'blue'
                },
                {
                    label: 'System Integration',
                    value: '85%',
                    color: 'purple'
                }
            ],
            implementationPhases: [
                {
                    phase: 'Assessment',
                    duration: '3 months',
                    milestones: [
                        'Privacy impact assessment',
                        'System audit',
                        'Requirements gathering'
                    ]
                },
                {
                    phase: 'Development',
                    duration: '6 months',
                    milestones: [
                        'Privacy controls implementation',
                        'System integration',
                        'Testing protocols'
                    ]
                },
                {
                    phase: 'Deployment',
                    duration: '3 months',
                    milestones: [
                        'Phased rollout',
                        'Staff training',
                        'Compliance verification'
                    ]
                }
            ],
            documents: [
                {
                    title: 'Privacy Framework',
                    type: 'PDF',
                    size: '2.4 MB'
                },
                {
                    title: 'Compliance Guide',
                    type: 'PDF',
                    size: '1.9 MB'
                },
                {
                    title: 'Training Materials',
                    type: 'ZIP',
                    size: '3.7 MB'
                }
            ]
        }
    };

    const caseStudy = caseStudiesData[caseStudyId];

    if (!caseStudy) {
        return (
            <Box p={6}>
                <Alert status="error">
                    <AlertIcon />
                    Case study not found
                </Alert>
                <Button 
                    mt={4}
                    onClick={() => navigate('/regulations/case-studies')}
                    leftIcon={<ArrowLeft size={16} />}
                >
                    Back to Case Studies
                </Button>
            </Box>
        );
    }

    return (
        <Box p={6}>
            <Stack spacing={6}>
                {/* Header */}
                <Flex justify="space-between" align="center">
                    <Button
                        leftIcon={<ArrowLeft size={16} />}
                        variant="ghost"
                        onClick={() => navigate('/regulations/case-studies')}
                    >
                        Back to Case Studies
                    </Button>
                    <Badge colorScheme={caseStudy.status === 'Completed' ? 'green' : 'blue'} p={2}>
                        {caseStudy.status}
                    </Badge>
                </Flex>

                {/* Main Content */}
                <Card>
                    <CardHeader>
                        <Stack spacing={4}>
                            <Heading size="lg">{caseStudy.title}</Heading>
                            <Flex gap={4} flexWrap="wrap">
                                <Text color="gray.600">
                                    <Building size={16} style={{ display: 'inline', marginRight: '4px' }} />
                                    {caseStudy.organization}
                                </Text>
                                <Text color="gray.600">
                                    <Clock size={16} style={{ display: 'inline', marginRight: '4px' }} />
                                    {caseStudy.timeline}
                                </Text>
                                <Badge colorScheme="purple">{caseStudy.category}</Badge>
                            </Flex>
                            <Text>{caseStudy.fullDescription}</Text>
                        </Stack>
                    </CardHeader>
                    <CardBody>
                        <Stack spacing={6}>
                            {/* Metrics */}
                            <Box>
                                <Heading size="md" mb={4}>Key Metrics</Heading>
                                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                                    {caseStudy.metrics.map((metric, index) => (
                                        <Card key={index}>
                                            <CardBody>
                                                <Stack align="center" spacing={2}>
                                                    <Text color="gray.600">{metric.label}</Text>
                                                    <Heading size="lg" color={`${metric.color}.500`}>
                                                        {metric.value}
                                                    </Heading>
                                                </Stack>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </SimpleGrid>
                            </Box>

                            <Divider />

                            {/* Challenges and Solutions */}
                            {caseStudy.challenges.map((challenge, index) => (
                                <Box key={index}>
                                    <Heading size="md" mb={4}>{challenge.title}</Heading>
                                    <Text mb={4}>{challenge.description}</Text>
                                    <List spacing={3}>
                                        {challenge.solutions.map((solution, sIndex) => (
                                            <ListItem 
                                                key={sIndex}
                                                display="flex"
                                                alignItems="center"
                                            >
                                                <ListIcon as={CheckCircle} color="green.500" />
                                                {solution}
                                            </ListItem>
                                        ))}
                                    </List>
                                    {index < caseStudy.challenges.length - 1 && <Divider mt={4} />}
                                </Box>
                            ))}

                            <Divider />

                            {/* Implementation Timeline */}
                            <Box>
                                <Heading size="md" mb={4}>Implementation Timeline</Heading>
                                <Stack spacing={4}>
                                    {caseStudy.implementationPhases.map((phase, index) => (
                                        <Card key={index}>
                                            <CardBody>
                                                <Stack spacing={3}>
                                                    <Flex justify="space-between" align="center">
                                                        <Heading size="sm">{phase.phase}</Heading>
                                                        <Badge>{phase.duration}</Badge>
                                                    </Flex>
                                                    <List spacing={2}>
                                                        {phase.milestones.map((milestone, mIndex) => (
                                                            <ListItem 
                                                                key={mIndex}
                                                                display="flex"
                                                                alignItems="center"
                                                            >
                                                                <ListIcon as={CheckCircle} color="green.500" />
                                                                {milestone}
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                </Stack>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </Stack>
                            </Box>
                        </Stack>
                    </CardBody>
                </Card>

                {/* Documents Section */}
                <Card>
                    <CardHeader>
                        <Heading size="md">Related Documents</Heading>
                    </CardHeader>
                    <CardBody>
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                            {caseStudy.documents.map((doc, index) => (
                                <Card key={index} variant="outline">
                                    <CardBody>
                                        <Flex justify="space-between" align="center">
                                            <Stack>
                                                <Flex align="center" gap={2}>
                                                    <FileText size={16} />
                                                    <Text fontWeight="medium">
                                                        {doc.title}
                                                    </Text>
                                                </Flex>
                                                <Text color="gray.500" fontSize="sm">
                                                    {doc.type} • {doc.size}
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
                            ))}
                        </SimpleGrid>
                    </CardBody>
                </Card>
            </Stack>
        </Box>
    );
}

export default CaseStudyDetail;