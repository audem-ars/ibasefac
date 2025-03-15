import React, { useState } from 'react';
import {
    Box,
    Heading,
    VStack,
    FormControl,
    FormLabel,
    Input,
    Select,
    Button
} from '@chakra-ui/react';

const BlankProjectConfig = ({ onProjectCreate }) => {
    const [projectConfig, setProjectConfig] = useState({
        name: '',
        type: '',
        complexity: 'Custom'
    });

    const aiProjectTypes = [
        'Natural Language Processing',
        'Computer Vision',
        'Generative AI',
        'Predictive Analytics',
        'Robotics',
        'Other'
    ];

    const handleSubmit = () => {
        if (projectConfig.name && projectConfig.type) {
            onProjectCreate(projectConfig);
        }
    };

    return (
        <Box maxWidth="400px" margin="auto">
            <VStack spacing={4}>
                <Heading>Create Custom AI Project</Heading>
                
                <FormControl>
                    <FormLabel>Project Name</FormLabel>
                    <Input 
                        value={projectConfig.name}
                        onChange={(e) => {
                            setProjectConfig(prev => ({
                                ...prev,
                                name: e.target.value
                            }))
                        }}
                        placeholder="Enter project name"
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Project Type</FormLabel>
                    <Select 
                        value={projectConfig.type}
                        onChange={(e) => {
                            setProjectConfig(prev => ({
                                ...prev,
                                type: e.target.value
                            }))
                        }}
                        placeholder="Select Project Type"
                    >
                        {aiProjectTypes.map(type => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </Select>
                </FormControl>

                <Button 
                    colorScheme="blue" 
                    onClick={handleSubmit}
                    isDisabled={!projectConfig.name || !projectConfig.type}
                >
                    Create Project
                </Button>
            </VStack>
        </Box>
    );
};

export default BlankProjectConfig;