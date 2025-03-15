import React from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Card,
    CardHeader,
    CardBody,
    Stack,
    Heading,
    Text,
    Link,
    Flex
} from '@chakra-ui/react';
import { FileText, ExternalLink } from 'lucide-react';

const AIRegulationsDetail = () => {
    const { regulationId } = useParams();
    
    const regulationDetails = {
        'eu-ai-act': {
            title: 'EU AI Act',
            content: `The EU AI Act is a comprehensive framework for artificial intelligence regulation in the European Union.
                    Key aspects include:
                    - Risk-based approach to AI regulation
                    - Requirements for high-risk AI systems
                    - Transparency obligations
                    - Compliance requirements for AI providers`,
            links: [
                { title: 'Official Documentation', url: '#' },
                { title: 'Implementation Guide', url: '#' }
            ]
        },
        'us-guidelines': {
            title: 'US AI Guidelines',
            content: `The US approach to AI regulation focuses on:
                    - NIST AI Risk Management Framework
                    - Industry-specific guidelines
                    - State-level requirements
                    - Voluntary standards`,
            links: [
                { title: 'NIST Framework', url: '#' },
                { title: 'State Guidelines', url: '#' }
            ]
        }
    };

    const regulation = regulationDetails[regulationId];

    return (
        <Box p={6}>
            <Card>
                <CardHeader>
                    <Flex align="center" gap={2}>
                        <FileText size={24} />
                        <Heading size="lg">{regulation?.title}</Heading>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Stack spacing={6}>
                        <Text whiteSpace="pre-line">
                            {regulation?.content}
                        </Text>
                        
                        <Box>
                            <Heading size="md" mb={3}>Related Resources</Heading>
                            <Stack spacing={2}>
                                {regulation?.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        color="blue.600"
                                        display="flex"
                                        alignItems="center"
                                        gap={2}
                                    >
                                        <ExternalLink size={16} />
                                        {link.title}
                                    </Link>
                                ))}
                            </Stack>
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
        </Box>
    );
};

export default AIRegulationsDetail;