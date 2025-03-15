import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Text,
    Card,
    CardBody,
    Heading,
    Stack,
    Button
} from '@chakra-ui/react';

const SandboxAttempt = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [projectDetails, setProjectDetails] = useState(null);

    useEffect(() => {
        // Mock project details logic
        const getProjectDetails = () => {
            const projects = {
                'new': {
                    name: 'Custom Project',
                    type: 'Custom AI',
                    description: 'User-defined AI project'
                },
                '1': {
                    name: 'Chat Assistant',
                    type: 'NLP',
                    description: 'AI-powered chatbot'
                },
                '2': {
                    name: 'Image Generator',
                    type: 'Computer Vision',
                    description: 'AI image generation model'
                }
            };
            return projects[projectId] || null;
        };

        const details = getProjectDetails();
        setProjectDetails(details);
    }, [projectId]);

    if (!projectDetails) {
        return (
            <Box p={8}>
                <Text>Loading project details...</Text>
            </Box>
        );
    }

    return (
        <Box p={8}>
            <Card>
                <CardBody>
                    <Stack spacing={4}>
                        <Heading>{projectDetails.name}</Heading>
                        <Text>{projectDetails.description}</Text>
                        <Button 
                            colorScheme="purple"
                            onClick={() => navigate('/dashboard')}
                        >
                            Back to Dashboard
                        </Button>
                    </Stack>
                </CardBody>
            </Card>
        </Box>
    );
};

export default SandboxAttempt;