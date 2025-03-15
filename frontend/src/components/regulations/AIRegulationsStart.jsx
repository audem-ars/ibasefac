import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
    List,
    ListItem,
    ListIcon
} from '@chakra-ui/react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

const AIRegulationsStart = () => {
    const { topicId } = useParams();
    const navigate = useNavigate();

    const topics = {
        'transparency': {
            title: 'AI Transparency Guidelines',
            description: 'Understanding and implementing transparency in AI systems',
            requirements: [
                'Clear disclosure of AI system capabilities',
                'User notification of AI interactions',
                'Documentation of system limitations'
            ],
            estimatedTime: '45 minutes',
            difficulty: 'Intermediate'
        },
        'privacy': {
            title: 'Data Privacy Best Practices',
            description: 'Protecting personal information in AI systems',
            requirements: [
                'Data collection principles',
                'Storage and processing guidelines',
                'User consent management'
            ],
            estimatedTime: '60 minutes',
            difficulty: 'Advanced'
        }
    };

    const topic = topics[topicId];

    return (
        <Box p={6}>
            <Card maxW="3xl" mx="auto">
                <CardHeader>
                    <Heading size="lg">{topic?.title}</Heading>
                    <Text mt={2} color="gray.600">{topic?.description}</Text>
                </CardHeader>
                <CardBody>
                    <Stack spacing={6}>
                        <Flex align="center" gap={2}>
                            <Clock size={20} color="blue.500" />
                            <Text>Estimated time: {topic?.estimatedTime}</Text>
                        </Flex>
                        
                        <Flex align="center" gap={2}>
                            <AlertCircle size={20} color="purple.500" />
                            <Text>Difficulty: {topic?.difficulty}</Text>
                        </Flex>

                        <Box>
                            <Heading size="md" mb={3}>Key Requirements:</Heading>
                            <List spacing={3}>
                                {topic?.requirements.map((req, index) => (
                                    <ListItem key={index} display="flex" alignItems="center">
                                        <ListIcon as={CheckCircle} color="green.500" />
                                        {req}
                                    </ListItem>
                                ))}
                            </List>
                        </Box>

                        <Button
                            colorScheme="blue"
                            size="lg"
                            onClick={() => navigate(`/regulations/${topicId}/learn`)}
                        >
                            Start Learning
                        </Button>
                    </Stack>
                </CardBody>
            </Card>
        </Box>
    );
};

export default AIRegulationsStart;