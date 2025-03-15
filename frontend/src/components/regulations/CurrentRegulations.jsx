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
    Divider
} from '@chakra-ui/react';
import { 
    AlertCircle, 
    FileText, 
    ExternalLink,
    CheckCircle,
    Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CurrentRegulations = () => {
    const navigate = useNavigate();

    const regulations = [
        {
            id: 'eu-ai-act',
            title: 'EU AI Act',
            status: 'Approved',
            lastUpdated: 'Feb 2024',
            description: 'The EU AI Act is the world\'s first comprehensive AI law. Approved in Feb 2024, it introduces a risk-based approach to regulating AI.',
            keyPoints: [
                'Risk-based categorization of AI systems',
                'Strict rules for high-risk AI applications',
                'Ban on certain AI practices',
                'Requirements for transparency and human oversight'
            ],
            compliance: [
                'Mandatory risk assessments',
                'Documentation requirements',
                'Quality management systems',
                'Post-market monitoring'
            ],
            timeline: '2024: Approved, 2025: Gradual implementation begins'
        },
        {
            id: 'us-ai-framework',
            title: 'US AI Risk Management Framework',
            status: 'Active',
            lastUpdated: 'Jan 2024',
            description: 'NIST\'s AI Risk Management Framework (AI RMF 1.0) provides guidance for managing risks in AI systems.',
            keyPoints: [
                'Voluntary framework for AI governance',
                'Risk management approach',
                'Focus on trustworthy AI',
                'Integration with existing practices'
            ],
            compliance: [
                'Risk assessment guidelines',
                'Governance recommendations',
                'Technical standards',
                'Best practices for deployment'
            ],
            timeline: 'Current version active, regular updates planned'
        },
        {
            id: 'ny-ai-bias',
            title: 'NYC AI Bias Law',
            status: 'Active',
            lastUpdated: 'Dec 2023',
            description: 'Local Law 144 requires mandatory bias audits for AI-based employment decision tools in NYC.',
            keyPoints: [
                'Annual bias audits required',
                'Candidate notification mandatory',
                'Public posting of audit results',
                'Specific employment decision focus'
            ],
            compliance: [
                'Independent bias audits',
                'Public disclosure requirements',
                'Notice to candidates',
                'Record keeping obligations'
            ],
            timeline: 'Enforcement began January 2024'
        },
        {
            id: 'ai-executive-order',
            title: 'US Executive Order on AI',
            status: 'Active',
            lastUpdated: 'Oct 2023',
            description: 'Executive Order 14110 establishes guidelines for safe, secure, and trustworthy development of AI.',
            keyPoints: [
                'Safety and security standards',
                'Privacy protections',
                'Equity and civil rights',
                'Consumer, patient, and worker protections'
            ],
            compliance: [
                'Agency-specific requirements',
                'Safety testing protocols',
                'Transparency measures',
                'Regular reporting obligations'
            ],
            timeline: 'Immediate effect with ongoing implementation'
        }
    ];

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'approved':
                return 'green';
            case 'active':
                return 'blue';
            case 'pending':
                return 'yellow';
            default:
                return 'gray';
        }
    };

    return (
        <Box p={6}>
            <Stack spacing={6}>
                <Flex justify="space-between" align="center" mb={4}>
                    <Stack>
                        <Heading size="lg">Current AI Regulations</Heading>
                        <Text color="gray.600">
                            Overview of major AI regulations and compliance requirements
                        </Text>
                    </Stack>
                </Flex>

                <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                    {regulations.map((reg) => (
                        <Card key={reg.id} variant="outline">
                            <CardHeader>
                                <Stack spacing={3}>
                                    <Flex justify="space-between" align="center">
                                        <Heading size="md">{reg.title}</Heading>
                                        <Badge colorScheme={getStatusColor(reg.status)}>
                                            {reg.status}
                                        </Badge>
                                    </Flex>
                                    <Text fontSize="sm" color="gray.500">
                                        Last Updated: {reg.lastUpdated}
                                    </Text>
                                    <Text>{reg.description}</Text>
                                </Stack>
                            </CardHeader>
                            <CardBody>
                                <Stack spacing={4}>
                                    <Box>
                                        <Text fontWeight="medium" mb={2}>Key Points:</Text>
                                        <List spacing={2}>
                                            {reg.keyPoints.map((point, index) => (
                                                <ListItem 
                                                    key={index}
                                                    display="flex"
                                                    alignItems="center"
                                                >
                                                    <ListIcon as={CheckCircle} color="green.500" />
                                                    {point}
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                    
                                    <Divider />
                                    
                                    <Box>
                                        <Text fontWeight="medium" mb={2}>Compliance Requirements:</Text>
                                        <List spacing={2}>
                                            {reg.compliance.map((req, index) => (
                                                <ListItem 
                                                    key={index}
                                                    display="flex"
                                                    alignItems="center"
                                                >
                                                    <ListIcon as={AlertCircle} color="blue.500" />
                                                    {req}
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>

                                    <Box>
                                        <Text fontWeight="medium">Timeline:</Text>
                                        <Text color="gray.600" fontSize="sm">{reg.timeline}</Text>
                                    </Box>

                                    <Button
                                        leftIcon={<FileText size={16} />}
                                        colorScheme="blue"
                                        onClick={() => {
                                            console.log('Navigating to regulation:', reg.id);
                                            navigate(`/regulations/${reg.id}/details`);
                                        }}
                                    >
                                        View Full Details
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

export default CurrentRegulations;