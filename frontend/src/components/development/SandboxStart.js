import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Heading,
    Text,
    Stack,
    Flex,
    Progress,
    Badge,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    SimpleGrid,
    useDisclosure
} from '@chakra-ui/react';
import { Code, MessageSquare, ImageIcon, PlusCircle } from 'lucide-react';

const SandboxStart = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [project, setProject] = useState(null);

    const projects = [
        {
            id: 1,
            name: "Chat Assistant",
            icon: MessageSquare,
            description: "Build an AI-powered chatbot for customer service",
            type: "NLP",
            difficulty: "Intermediate",
            requirements: [
                'Basic understanding of NLP',
                'Familiarity with Python',
                'API integration experience'
            ]
        },
        {
            id: 2,
            name: "Image Generator",
            icon: ImageIcon,
            description: "Create an AI model for generating images",
            type: "Computer Vision",
            difficulty: "Advanced",
            requirements: [
                'Deep learning fundamentals',
                'Understanding of CNNs',
                'Experience with PyTorch or TensorFlow'
            ]
        }
    ];

    useEffect(() => {
        if (projectId === 'new') {
            setProject({
                id: 'new',
                name: 'Create New Project',
                type: 'Custom',
                description: 'Design your own AI project from scratch',
                difficulty: 'Custom'
            });
            return;
        }

        const projectData = projects.find(p => p.id === parseInt(projectId));
        
        if (projectData) {
            setProject({
                ...projectData,
                estimatedTime: '2-3 weeks',
                complexity: 'Intermediate'
            });
        }
    }, [projectId]);

    const handleStartProject = () => {
        if (project.id === 'new') {
            navigate('/development/sandbox/new/attempt');
        } else {
            navigate(`/development/sandbox/${project.id}/attempt`);
        }
    };

    if (!project) {
        return <Box p={8}>Loading project details...</Box>;
    }

    return (
        <Box p={8}>
            <Card maxW="800px" mx="auto">
                <CardHeader>
                    <Stack spacing={4}>
                        <Flex justify="space-between" align="center">
                            <Heading size="lg">AI Project Sandbox</Heading>
                            <Button
                                leftIcon={<PlusCircle size={16} />}
                                colorScheme="purple"
                                onClick={onOpen}
                            >
                                Create New Project
                            </Button>
                        </Flex>
                    </Stack>
                </CardHeader>
                <CardBody>
                    <SimpleGrid columns={2} spacing={4}>
                        {projects.map((proj) => (
                            <Card 
                                key={proj.id} 
                                variant="outline" 
                                cursor="pointer"
                            >
                                <CardBody>
                                    <Stack>
                                        <Flex align="center" gap={3}>
                                            {React.createElement(proj.icon, { size: 24 })}
                                            <Heading size="md">{proj.name}</Heading>
                                        </Flex>
                                        <Text>{proj.description}</Text>
                                        <Badge colorScheme="purple">{proj.difficulty}</Badge>
                                        <Button 
                                            colorScheme="purple" 
                                            onClick={() => navigate(`/development/sandbox/${proj.id}/template`)}
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

<Modal isOpen={isOpen} onClose={onClose} size="xl">
    <ModalOverlay />
    <ModalContent>
        <ModalHeader>Create New AI Project</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            {/* Placeholder for BlankProjectConfig */}
            <Text>Blank Project Configuration Coming Soon</Text>
        </ModalBody>
    </ModalContent>
</Modal>
</Box>
    );
};

export default SandboxStart;