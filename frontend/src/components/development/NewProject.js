// NewProject.js
import React from 'react';
import {
    Box,
    Card,
    CardHeader,
    CardBody,
    Stack,
    Heading,
    Text,
    SimpleGrid,
    Button,
    FormControl,
    FormLabel,
    Select
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

const ProjectWorkspace = () => {
    const { projectId } = useParams();
    
    return (
        <Box p={8}>
            <Card>
                <CardHeader>
                    <Heading size="md">Project Workspace</Heading>
                </CardHeader>
                <CardBody>
                    <Box>Project ID: {projectId}</Box>
                </CardBody>
            </Card>
        </Box>
    );
};

const NewProject = () => {
    const navigate = useNavigate();
    
    const projectTemplates = [
        {
            id: 1,
            name: 'Chat Assistant',
            description: 'Build an AI-powered chatbot for customer service',
            difficulty: 'Intermediate'
        },
        {
            id: 2,
            name: 'Image Generator',
            description: 'Create an AI model for generating images',
            difficulty: 'Advanced'
        },
        {
            id: 'blank',
            name: 'Blank Project',
            description: 'Start from scratch with a clean workspace',
            difficulty: 'Custom'
        }
    ];

    const handleSelectTemplate = (templateId) => {
        if (templateId === 'blank') {
            navigate('/development/sandbox/new/workspace');
        } else {
            navigate(`/development/sandbox/${templateId}/template`);
        }
    };

    return (
        <Box p={8}>
            <Card maxW="1200px" mx="auto">
                <CardHeader>
                    <Stack spacing={4}>
                        <Heading size="lg">Create New Project</Heading>
                        <Text>Select a template to get started</Text>
                    </Stack>
                </CardHeader>
                <CardBody>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                        {projectTemplates.map((template) => (
                            <Card
                                key={template.id}
                                variant="outline"
                                cursor="pointer"
                                _hover={{ shadow: 'md' }}
                            >
                                <CardBody>
                                    <Stack spacing={4}>
                                        <Heading size="md">{template.name}</Heading>
                                        <Text>{template.description}</Text>
                                        <Text color="gray.500">
                                            Difficulty: {template.difficulty}
                                        </Text>
                                        <Button 
                                            colorScheme="purple"
                                            onClick={() => handleSelectTemplate(template.id)}
                                        >
                                            Use Template
                                        </Button>
                                    </Stack>
                                </CardBody>
                            </Card>
                        ))}
                    </SimpleGrid>
                </CardBody>
            </Card>
        </Box>
    );
};

export { NewProject, ProjectWorkspace };