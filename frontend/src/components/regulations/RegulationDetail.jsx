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
    ExternalLink,
    Download,
    FileText
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const RegulationDetail = () => {
    const { regulationId } = useParams();
    const navigate = useNavigate();

    console.log('Current regulation ID:', regulationId);

    const regulationDetails = {
        'eu-ai-act': {
            title: 'EU AI Act',
            status: 'Approved',
            lastUpdated: 'Feb 2024',
            fullDescription: `The EU AI Act, approved in February 2024, represents the world's first comprehensive 
                            legal framework for artificial intelligence. It introduces a risk-based approach to regulating AI systems, 
                            with specific requirements based on the level of risk posed by each AI application.`,
            sections: [
                {
                    title: 'Risk Categories',
                    content: [
                        'Unacceptable Risk - Prohibited AI practices',
                        'High Risk - Strict obligations and compliance requirements',
                        'Limited Risk - Transparency obligations',
                        'Minimal Risk - Voluntary compliance'
                    ]
                },
                {
                    title: 'Key Requirements',
                    content: [
                        'Mandatory risk assessments for high-risk AI systems',
                        'Human oversight requirements',
                        'Data quality and governance standards',
                        'Technical documentation and record-keeping'
                    ]
                },
                {
                    title: 'Implementation Timeline',
                    content: [
                        'Early 2024: Law approval and publication',
                        'Late 2024: Initial guidance and standards',
                        '2025: Gradual implementation begins',
                        '2026-2027: Full enforcement expected'
                    ]
                }
            ],
            documents: [
                {
                    title: 'Full Text of EU AI Act',
                    type: 'PDF',
                    size: '3.8 MB'
                },
                {
                    title: 'Compliance Checklist',
                    type: 'XLSX',
                    size: '850 KB'
                },
                {
                    title: 'Implementation Guide',
                    type: 'PDF',
                    size: '2.1 MB'
                }
            ]
        },
        'us-ai-framework': {
            title: 'US AI Risk Management Framework',
            status: 'Active',
            lastUpdated: 'Jan 2024',
            fullDescription: `The NIST AI Risk Management Framework (AI RMF 1.0) provides comprehensive guidance 
                            for managing risks in the development, deployment, and use of AI systems. This voluntary 
                            framework helps organizations enhance the trustworthiness of AI technologies.`,
            sections: [
                {
                    title: 'Framework Core',
                    content: [
                        'Govern - Sound governance and compliance',
                        'Map - Context and risk identification',
                        'Measure - Assessment and analysis',
                        'Manage - Response and improvement'
                    ]
                },
                {
                    title: 'Implementation Steps',
                    content: [
                        'Risk assessment and categorization',
                        'Control selection and implementation',
                        'Monitoring and evaluation',
                        'Continuous improvement process'
                    ]
                },
                {
                    title: 'Key Considerations',
                    content: [
                        'Technical robustness and safety',
                        'Fairness and bias mitigation',
                        'Transparency and explainability',
                        'Accountability measures'
                    ]
                }
            ],
            documents: [
                {
                    title: 'NIST AI RMF 1.0',
                    type: 'PDF',
                    size: '4.2 MB'
                },
                {
                    title: 'Implementation Playbook',
                    type: 'PDF',
                    size: '2.8 MB'
                }
            ]
        },
        'ny-ai-bias': {
            title: 'NYC AI Bias Law',
            status: 'Active',
            lastUpdated: 'Dec 2023',
            fullDescription: `Local Law 144 of 2021 requires employers and employment agencies to conduct 
                            independent bias audits of automated employment decision tools. This law aims to 
                            promote fairness and transparency in AI-powered hiring tools.`,
            sections: [
                {
                    title: 'Key Requirements',
                    content: [
                        'Annual independent bias audits',
                        'Public posting of audit results',
                        'Candidate notification requirements',
                        'Record keeping obligations'
                    ]
                },
                {
                    title: 'Compliance Steps',
                    content: [
                        'Identify covered AI tools',
                        'Engage independent auditor',
                        'Implement notification system',
                        'Maintain required documentation'
                    ]
                },
                {
                    title: 'Enforcement Details',
                    content: [
                        'Effective from January 2024',
                        'Civil penalties for violations',
                        'Regular compliance reviews',
                        'Ongoing monitoring requirements'
                    ]
                }
            ],
            documents: [
                {
                    title: 'Law 144 Full Text',
                    type: 'PDF',
                    size: '1.5 MB'
                },
                {
                    title: 'Compliance Guide',
                    type: 'PDF',
                    size: '2.3 MB'
                }
            ]
        },
        'ai-executive-order': {
            title: 'US Executive Order on AI',
            status: 'Active',
            lastUpdated: 'Oct 2023',
            fullDescription: `Executive Order 14110 establishes a comprehensive national policy for the development 
                            and use of artificial intelligence. It focuses on promoting responsible innovation while 
                            protecting rights and safety.`,
            sections: [
                {
                    title: 'Major Provisions',
                    content: [
                        'AI safety and security standards',
                        'Privacy and civil rights protections',
                        'Innovation and competition support',
                        'Federal agency requirements'
                    ]
                },
                {
                    title: 'Implementation Areas',
                    content: [
                        'Agency-specific guidance development',
                        'Safety testing protocols',
                        'Transparency requirements',
                        'International cooperation frameworks'
                    ]
                },
                {
                    title: 'Key Deadlines',
                    content: [
                        'Immediate effect for federal agencies',
                        'Phased implementation through 2024',
                        'Regular progress reporting',
                        'Annual review requirements'
                    ]
                }
            ],
            documents: [
                {
                    title: 'Executive Order 14110',
                    type: 'PDF',
                    size: '2.9 MB'
                },
                {
                    title: 'Agency Guidance',
                    type: 'PDF',
                    size: '3.2 MB'
                }
            ]
        }
    };

    const regulation = regulationDetails[regulationId];

    if (!regulation) {
        console.log('Regulation not found for ID:', regulationId);
        return (
            <Box p={6}>
                <Alert status="error">
                    <AlertIcon />
                    Regulation not found: {regulationId}
                </Alert>
                <Button 
                    mt={4}
                    onClick={() => navigate('/regulations/current')}
                    leftIcon={<ArrowLeft size={16} />}
                >
                    Back to Regulations
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
                        onClick={() => navigate('/regulations/current')}
                    >
                        Back to Regulations
                    </Button>
                    <Badge colorScheme={regulation.status === 'Approved' ? 'green' : 'blue'} p={2}>
                        {regulation.status}
                    </Badge>
                </Flex>

                {/* Main Content */}
                <Card>
                    <CardHeader>
                        <Stack spacing={4}>
                            <Heading size="lg">{regulation.title}</Heading>
                            <Text color="gray.600">Last Updated: {regulation.lastUpdated}</Text>
                            <Text>{regulation.fullDescription}</Text>
                        </Stack>
                    </CardHeader>
                    <CardBody>
                        <Stack spacing={6}>
                            {regulation.sections.map((section, index) => (
                                <Box key={index}>
                                    <Heading size="md" mb={4}>{section.title}</Heading>
                                    <List spacing={3}>
                                        {section.content.map((item, itemIndex) => (
                                            <ListItem 
                                                key={itemIndex}
                                                display="flex"
                                                alignItems="center"
                                            >
                                                <ListIcon as={CheckCircle} color="green.500" />
                                                {item}
                                            </ListItem>
                                        ))}
                                    </List>
                                    {index < regulation.sections.length - 1 && <Divider mt={4} />}
                                </Box>
                            ))}
                        </Stack>
                    </CardBody>
                </Card>

                {/* Documents Section */}
                <Card>
                    <CardHeader>
                        <Heading size="md">Related Documents</Heading>
                    </CardHeader>
                    <CardBody>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                            {regulation.documents.map((doc, index) => (
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
};

export default RegulationDetail;