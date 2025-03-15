import React from 'react';
import {
  Card, CardHeader, CardBody,
  Flex, Stack, Heading, Text,
  Button, SimpleGrid, Stat,
  StatLabel, StatNumber, Progress,
  Divider, useToast
} from '@chakra-ui/react';
import { Code, MessageSquare, ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const iconMap = {
  MessageSquare: MessageSquare,
  ImageIcon: ImageIcon
};

const ProjectSandbox = ({ projects }) => {
  const navigate = useNavigate();
  const toast = useToast();

  const handleNewProject = () => {
    console.log('Navigating to new project...');  // Debug log
    navigate('/development/sandbox/new');
  };

  const handleOpenProject = (projectId) => {
    navigate(`/development/sandbox/${projectId}`);
  };

  return (
    <Card>
      <CardHeader>
        <Flex justify="space-between" align="center">
          <Heading size="md">AI Project Sandbox</Heading>
          <Button 
            leftIcon={<Code size={16} />} 
            size="sm" 
            colorScheme="purple"
            onClick={handleNewProject}     // Make sure this is connected
          >
            New Project
          </Button>
        </Flex>
      </CardHeader>
      <CardBody>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {projects?.map((project, index) => {
            const IconComponent = iconMap[project.icon];
            
            return (
              <Card key={index} variant="outline">
                <CardBody>
                  <Stack spacing={4}>
                    <Flex justify="space-between">
                      <Stack>
                        <Heading size="sm">{project.name}</Heading>
                        <Text fontSize="sm" color="gray.600">
                          {project.description}
                        </Text>
                      </Stack>
                      {IconComponent && <IconComponent size={20} />}
                    </Flex>
                    <Divider />
                    <SimpleGrid columns={2} spacing={2}>
                      <Stat size="sm">
                        <StatLabel>Accuracy</StatLabel>
                        <StatNumber>{project.accuracy}%</StatNumber>
                      </Stat>
                      <Stat size="sm">
                        <StatLabel>Progress</StatLabel>
                        <Progress 
                          value={project.progress} 
                          size="sm" 
                          colorScheme="purple"
                        />
                      </Stat>
                    </SimpleGrid>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleOpenProject(project.id || index + 1)}
                    >
                      Open Project
                    </Button>
                  </Stack>
                </CardBody>
              </Card>
            );
          })}
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

export default ProjectSandbox;