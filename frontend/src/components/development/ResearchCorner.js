import React from 'react';
import {
  Card, CardHeader, CardBody,
  Flex, Stack, Text, Heading,
  Button, SimpleGrid, Badge
} from '@chakra-ui/react';
import { FlaskConical, FileText, Users, Brain } from 'lucide-react';

const ResearchCorner = ({ papers }) => (
  <Card>
    <CardHeader>
      <Flex justify="space-between" align="center">
        <Heading size="md">Research Corner</Heading>
        <Button leftIcon={<FlaskConical size={16} />} size="sm" colorScheme="purple">
          Browse Papers
        </Button>
      </Flex>
    </CardHeader>
    <CardBody>
      <Stack spacing={4}>
        {papers.map((paper, index) => (
          <Card key={index} variant="outline">
            <CardBody>
              <Stack spacing={3}>
                <Flex justify="space-between" align="start">
                  <Stack spacing={1}>
                    <Heading size="sm">{paper.title}</Heading>
                    <Text fontSize="sm" color="gray.600">
                      {paper.authors.join(', ')}
                    </Text>
                  </Stack>
                  <Badge colorScheme={paper.completed ? 'green' : 'purple'}>
                    {paper.completed ? 'Completed' : 'In Progress'}
                  </Badge>
                </Flex>
                <Text fontSize="sm">{paper.summary}</Text>
                <SimpleGrid columns={3} spacing={2}>
                  <Button size="sm" variant="ghost" leftIcon={<FileText size={16} />}>
                    Read
                  </Button>
                  <Button size="sm" variant="ghost" leftIcon={<Users size={16} />}>
                    Discuss
                  </Button>
                  <Button size="sm" variant="ghost" leftIcon={<Brain size={16} />}>
                    Quiz
                  </Button>
                </SimpleGrid>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </Stack>
    </CardBody>
  </Card>
);

export default ResearchCorner;