import React from 'react';
import {
  Card, CardHeader, CardBody,
  Flex, Stack, Text, Heading,
  Button, Progress, SimpleGrid,
  Badge, Stat, StatLabel,
  StatNumber, StatHelpText,
  StatArrow
} from '@chakra-ui/react';
import { Command, Network, Workflow } from 'lucide-react';

const iconMap = {
  Command: Command,
  Network: Network,
  Workflow: Workflow
};

const AISkillProgress = ({ skills }) => (
  <Card>
    <CardHeader>
      <Flex justify="space-between" align="center">
        <Heading size="md">AI Skill Development</Heading>
        <Button size="sm" colorScheme="purple" variant="outline">
          Add Skill
        </Button>
      </Flex>
    </CardHeader>
    <CardBody>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {skills.map((skill, index) => {
          const IconComponent = iconMap[skill.icon];
          
          return (
            <Card key={index} variant="outline">
              <CardBody>
                <Stack spacing={4}>
                  <Flex justify="space-between" align="center">
                    <Flex align="center" gap={2}>
                      {IconComponent && <IconComponent size={20} />}
                      <Text fontWeight="medium">{skill.name}</Text>
                    </Flex>
                    <Badge colorScheme="purple">Level {skill.level}</Badge>
                  </Flex>
                  <Progress 
                    value={skill.progress} 
                    size="sm" 
                    colorScheme="purple"
                  />
                  <Text fontSize="sm" color="gray.600">
                    {skill.description}
                  </Text>
                  <SimpleGrid columns={2} spacing={2}>
                    <Stat size="sm">
                      <StatLabel>Practice Hours</StatLabel>
                      <StatNumber>{skill.hoursSpent}</StatNumber>
                      <StatHelpText>
                        <StatArrow type="increase" />
                        {skill.improvement}% growth
                      </StatHelpText>
                    </Stat>
                    <Flex direction="column" align="flex-end" justify="center">
                      <Button size="sm" colorScheme="purple" variant="ghost">
                        Practice Now
                      </Button>
                    </Flex>
                  </SimpleGrid>
                </Stack>
              </CardBody>
            </Card>
          );
        })}
      </SimpleGrid>
    </CardBody>
  </Card>
);

export default AISkillProgress;