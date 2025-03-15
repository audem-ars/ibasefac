import React, { useState } from 'react';
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
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel
} from '@chakra-ui/react';
import { 
    AlertCircle, 
    Book, 
    CheckCircle, 
    FileText, 
    MessageSquare 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AIRegulationsList = () => {
    const navigate = useNavigate();
    const [selectedSection, setSelectedSection] = useState('guidelines');

    const sections = {
        guidelines: {
            title: 'Practical Guidelines',
            items: [
                { id: 'transparency', title: 'Transparency in AI Systems', content: 'Clear labeling practices for AI interactions and system capabilities. Learn best practices for AI disclosure.' },
                { id: 'data-privacy', title: 'Data Privacy Best Practices', content: 'Protecting personal information in AI systems, including data collection and storage guidelines.' },
                { id: 'bias-detection', title: 'Bias Detection Strategies', content: 'Methods for identifying and mitigating AI bias, including testing frameworks and monitoring tools.' },
                { id: 'risk-assessment', title: 'Risk Assessment', content: 'Frameworks for evaluating AI application risks and implementing appropriate safeguards.' }
            ]
        },
        regulations: {
            title: 'Current Regulations',
            items: [
                { id: 'eu-ai-act', title: 'EU AI Act', content: 'Key compliance requirements and implementation guidelines' },
                { id: 'us-guidelines', title: 'US AI Guidelines', content: 'NIST AI Risk Management Framework overview' },
                { id: 'state-regulations', title: 'State Regulations', content: 'NY AI bias audit requirements and other state laws' },
                { id: 'industry-requirements', title: 'Industry Requirements', content: 'Sector-specific AI regulations' }
            ]
        },
        caseStudies: {
            title: 'Impact Case Studies',
            items: [
                { id: 'healthcare', title: 'Healthcare AI Implementation', content: 'Major hospital diagnostic tool deployment' },
                { id: 'ai-myths', title: 'AI Myths Debunked', content: 'Common misconceptions about AI companies and capabilities' },
                { id: 'privacy-challenges', title: 'Privacy Challenges', content: 'Real-world data protection scenarios' }
            ]
        },
        community: {
            title: 'Community Resources',
            items: [
                { id: 'expert-connect', title: 'Expert Connect', content: 'Network with AI ethics professionals' },
                { id: 'discussion-forum', title: 'Discussion Forum', content: 'Share experiences and best practices' },
                { id: 'resource-library', title: 'Resource Library', content: 'Curated materials on AI risks and benefits' }
            ]
        }
    };

    const handleNavigation = (section, itemId) => {
        switch(section) {
            case 'guidelines':
                navigate(`/regulations/guidelines/${itemId}`);
                break;
            case 'regulations':
                navigate(`/regulations/${itemId}/details`);
                break;
                case 'caseStudies':
                  navigate(`/regulations/case-studies/${itemId}`); // Keep this consistent
                  break;
            case 'community':
                navigate(`/regulations/community/${itemId}`);
                break;
            default:
                navigate('/regulations');
        }
    };

    return (
        <Box p={6}>
            <Tabs colorScheme="blue">
                <TabList mb={6}>
                    {Object.keys(sections).map((key) => (
                        <Tab key={key}>{sections[key].title}</Tab>
                    ))}
                </TabList>

                <TabPanels>
                    {Object.entries(sections).map(([key, section]) => (
                        <TabPanel key={key}>
                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                                {section.items.map((item) => (
                                    <Card key={item.id}>
                                        <CardHeader>
                                            <Flex justify="space-between" align="center">
                                                <Heading size="md">{item.title}</Heading>
                                                {key === 'regulations' && (
                                                    <Badge colorScheme="blue">Updated 2024</Badge>
                                                )}
                                            </Flex>
                                        </CardHeader>
                                        <CardBody>
                                            <Stack spacing={4}>
                                                <Text>{item.content}</Text>
                                                <Flex>
                                                    <Button
                                                        leftIcon={key === 'community' ? <MessageSquare size={16} /> : <FileText size={16} />}
                                                        colorScheme="blue"
                                                        onClick={() => handleNavigation(key, item.id)}
                                                    >
                                                        {key === 'community' ? 'Join Discussion' : 'View Full Details'}
                                                    </Button>
                                                </Flex>
                                            </Stack>
                                        </CardBody>
                                    </Card>
                                ))}
                            </SimpleGrid>
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default AIRegulationsList;