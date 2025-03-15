import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Card,
    CardBody,
    CardHeader,
    Heading,
    Text,
    Stack,
    Button,
    Select,
    FormControl,
    FormLabel
} from '@chakra-ui/react';

const ProjectTemplate = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [projectConfig, setProjectConfig] = useState({});

    const projectTemplates = {
        1: {  // Chat Assistant
            name: "Chat Assistant",
            configOptions: {
                modelType: ["GPT-3.5", "GPT-4", "Claude"],
                language: ["English", "Spanish", "French"],
                complexity: ["Basic", "Intermediate", "Advanced"]
            }
        },
        2: {  // Image Generator
            name: "Image Generator",
            configOptions: {
                resolution: ["512x512", "1024x1024", "2048x2048"],
                style: ["Photorealistic", "Artistic", "Anime"],
                modelType: ["Stable Diffusion", "DALL-E", "Midjourney"]
            }
        }
    };

    useEffect(() => {
        if (!projectTemplates[projectId]) {
            navigate('/development/sandbox');
        }
    }, [projectId, navigate]);

    const handleConfigChange = (field, value) => {
        setProjectConfig(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleStartProject = () => {
        // Logic to start the project with selected configuration
        navigate(`/development/sandbox/${projectId}/workspace`);
    };

    const currentTemplate = projectTemplates[projectId];

    if (!currentTemplate) return null;

    return (
        <Box p={8}>
            <Card maxW="600px" mx="auto">
                <CardHeader>
                    <Heading size="md">{currentTemplate.name} Configuration</Heading>
                </CardHeader>
                <CardBody>
                    <Stack spacing={4}>
                        {Object.entries(currentTemplate.configOptions).map(([field, options]) => (
                            <FormControl key={field}>
                                <FormLabel>{field.charAt(0).toUpperCase() + field.slice(1)}</FormLabel>
                                <Select
                                    placeholder={`Select ${field}`}
                                    value={projectConfig[field] || ''}
                                    onChange={(e) => handleConfigChange(field, e.target.value)}
                                >
                                    {options.map(option => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        ))}
                        <Button 
                            colorScheme="purple" 
                            onClick={handleStartProject}
                            isDisabled={Object.keys(projectConfig).length !== Object.keys(currentTemplate.configOptions).length}
                        >
                            Start Project
                        </Button>
                    </Stack>
                </CardBody>
            </Card>
        </Box>
    );
};

export default ProjectTemplate;