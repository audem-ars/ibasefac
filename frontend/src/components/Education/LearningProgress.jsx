// src/components/education/LearningProgress.jsx
import React from 'react';
import {
    Box,
    Progress,
    Text,
    Stack,
    HStack
} from '@chakra-ui/react';
import { CheckCircle, Circle } from 'lucide-react';

const LearningProgress = ({ completed, total }) => {
    const percentage = (completed / total) * 100;

    return (
        <Stack spacing={2}>
            <HStack justify="space-between">
                <Text fontSize="sm" fontWeight="medium">Progress</Text>
                <Text fontSize="sm" color="gray.600">{completed}/{total} sections</Text>
            </HStack>
            <Progress value={percentage} size="sm" colorScheme="green" />
            <HStack spacing={4}>
                {Array.from({ length: total }).map((_, i) => (
                    i < completed ? (
                        <CheckCircle key={i} size={16} color="green" />
                    ) : (
                        <Circle key={i} size={16} color="gray" />
                    )
                ))}
            </HStack>
        </Stack>
    );
};

export default LearningProgress;