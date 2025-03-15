import React from 'react';
import {
  Card, CardHeader, CardBody,
  Flex, Stack, Text, Heading,
  Button, Progress, SimpleGrid,
  Badge, CircularProgress,
  CircularProgressLabel,
  Box
} from '@chakra-ui/react';
import { PlayCircle, FileText, Command, Shield, GitBranch } from 'lucide-react';

const iconMap = {
  Command: Command,
  Shield: Shield,
  GitBranch: GitBranch
};

const AILearningPaths = ({ paths }) => (
  <Card>
    <CardHeader>
      <Flex justify="space-between" align="center">
        <Heading size="md">AI Learning Paths</Heading>
        <Button size="sm" colorScheme="purple" variant="outline">
          View All Paths
        </Button>
      </Flex>
    </CardHeader>
    <CardBody>
      <Stack spacing={6}>
        {paths.map((path, index) => {
          const IconComponent = iconMap[path.icon];
          
          return (
            <Box key={index}>
              <Flex justify="space-between" align="center" mb={2}>
                <Stack spacing={1}>
                  <Flex align="center" gap={2}>
                    {IconComponent && <IconComponent size={20} />}
                    <Text fontWeight="medium">{path.name}</Text>
                  </Flex>
                  <Text fontSize="sm" color="gray.600">
                    {path.completedModules} of {path.totalModules} modules completed
                  </Text>
                </Stack>
                <Stack align="end" spacing={1}>
                  <CircularProgress 
                    value={(path.completedModules/path.totalModules) * 100} 
                    color="purple.400"
                    size="50px"
                  >
                    <CircularProgressLabel>
                      {Math.round((path.completedModules/path.totalModules) * 100)}%
                    </CircularProgressLabel>
                  </CircularProgress>
                  <Badge colorScheme={path.difficulty === 'Advanced' ? 'red' : path.difficulty === 'Intermediate' ? 'purple' : 'green'}>
                    {path.difficulty}
                  </Badge>
                </Stack>
              </Flex>
              <Progress 
                value={(path.completedModules/path.totalModules) * 100}
                size="sm" 
                colorScheme="purple" 
                mb={4}
              />
              <SimpleGrid columns={2} spacing={4}>
                <Button 
                  leftIcon={<PlayCircle size={16} />}
                  size="sm"
                  variant="solid"
                  colorScheme="purple"
                >
                  Continue Path
                </Button>
                <Button
                  leftIcon={<FileText size={16} />}
                  size="sm"
                  variant="outline"
                >
                  Path Details
                </Button>
              </SimpleGrid>
            </Box>
          );
        })}
      </Stack>
    </CardBody>
  </Card>
);

export default AILearningPaths;