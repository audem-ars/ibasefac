// src/components/dashboard/learningpathprogress.js
import React from 'react';
import {
    Card, CardBody, Box, Text, Progress,
    Stack, Flex, Button,
    SimpleGrid
} from '@chakra-ui/react';
import { PlayCircle } from 'lucide-react';

const LearningPathProgress = ({ paths = [] }) => (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {paths.map((path, index) => (
            <Card key={index}>
                <CardBody>
                    <Stack spacing={3}>
                        <Text fontWeight="medium">{path.name}</Text>
                        <Progress 
                            value={(path.completedCourses/path.totalCourses) * 100}
                            size="sm"
                            colorScheme="blue"
                        />
                        <Flex justify="space-between" fontSize="sm" color="gray.600">
                            <Text>{path.completedCourses} of {path.totalCourses} courses</Text>
                            <Text>{Math.round((path.completedCourses/path.totalCourses) * 100)}%</Text>
                        </Flex>
                        <Button
                            leftIcon={<PlayCircle size={16} />}
                            size="sm"
                            colorScheme="blue"
                        >
                            Continue Learning
                        </Button>
                    </Stack>
                </CardBody>
            </Card>
        ))}
    </SimpleGrid>
);

export default LearningPathProgress;