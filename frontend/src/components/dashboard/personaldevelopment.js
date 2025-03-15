// src/components/dashboard/personaldevelopment.js
import React, { useState } from 'react';
import {
  Box, Stack, Flex, Grid, Text, Heading,
  Card, CardHeader, CardBody, Button,
  Progress, SimpleGrid, Badge, IconButton,
  CircularProgress, CircularProgressLabel,
  Tabs, TabList, Tab, TabPanels, TabPanel,
  Avatar, Stat, StatLabel, StatNumber,
  StatHelpText, StatArrow, Tooltip
} from '@chakra-ui/react';
import {
  Brain, Target, Star, Trophy, Heart,
  Book, TrendingUp, CheckCircle, Calendar,
  Zap, Globe, Users, BarChart2,
  PlayCircle, FileText
} from 'lucide-react';

// Rest of your components stay exactly the same, just change the Button in LearningPathProgress to use PlayCircle
const LearningPathProgress = ({ paths }) => (
  <Card>
    <CardHeader>
      <Heading size="md">Learning Paths</Heading>
    </CardHeader>
    <CardBody>
      <Stack spacing={6}>
        {paths.map((path, index) => (
          <Box key={index}>
            <Flex justify="space-between" align="center" mb={2}>
              <Stack spacing={1}>
                <Text fontWeight="medium">{path.name}</Text>
                <Text fontSize="sm" color="gray.600">
                  {path.completedCourses} of {path.totalCourses} courses completed
                </Text>
              </Stack>
              <CircularProgress 
                value={(path.completedCourses/path.totalCourses) * 100} 
                color="green.400"
                size="50px"
              >
                <CircularProgressLabel>
                  {Math.round((path.completedCourses/path.totalCourses) * 100)}%
                </CircularProgressLabel>
              </CircularProgress>
            </Flex>
            <Progress 
              value={(path.completedCourses/path.totalCourses) * 100}
              size="sm" 
              colorScheme="green" 
              mb={4}
            />
            <SimpleGrid columns={2} spacing={4}>
              <Button 
                leftIcon={<PlayCircle size={16} />}
                size="sm"
                variant="solid"
                colorScheme="blue"
              >
                Continue Learning
              </Button>
              <Button
                leftIcon={<FileText size={16} />}
                size="sm"
                variant="outline"
              >
                View Details
              </Button>
            </SimpleGrid>
          </Box>
        ))}
      </Stack>
    </CardBody>
  </Card>
);

const SkillProgress = ({ skills }) => (
  <Card>
    <CardHeader>
      <Flex justify="space-between" align="center">
        <Heading size="md">Skill Development</Heading>
        <Button size="sm" colorScheme="blue" variant="outline">
          Add Skill
        </Button>
      </Flex>
    </CardHeader>
    <CardBody>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {skills.map((skill, index) => (
          <Card key={index} variant="outline">
            <CardBody>
              <Stack spacing={4}>
                <Flex justify="space-between" align="center">
                  <Text fontWeight="medium">{skill.name}</Text>
                  <Badge colorScheme="blue">Level {skill.level}</Badge>
                </Flex>
                <Progress 
                  value={skill.progress} 
                  size="sm" 
                  colorScheme="blue"
                />
                <Text fontSize="sm" color="gray.600">
                  {skill.description}
                </Text>
                <SimpleGrid columns={2} spacing={2}>
                  <Stat size="sm">
                    <StatLabel>Hours Practiced</StatLabel>
                    <StatNumber>{skill.hoursSpent}</StatNumber>
                    <StatHelpText>
                      <StatArrow type="increase" />
                      {skill.improvement}%
                    </StatHelpText>
                  </Stat>
                  <Flex direction="column" align="flex-end" justify="center">
                    <Button size="sm" colorScheme="blue" variant="ghost">
                      Practice Now
                    </Button>
                  </Flex>
                </SimpleGrid>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </CardBody>
  </Card>
);

const AchievementsSection = ({ achievements }) => (
  <Card>
    <CardHeader>
      <Heading size="md">Achievements & Certifications</Heading>
    </CardHeader>
    <CardBody>
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
        {achievements.map((achievement, index) => (
          <Card key={index} variant="outline">
            <CardBody>
              <Stack align="center" spacing={3}>
                <Box 
                  p={3} 
                  bg="blue.50" 
                  borderRadius="full"
                  color="blue.500"
                >
                  {achievement.icon}
                </Box>
                <Text fontWeight="medium" textAlign="center">
                  {achievement.name}
                </Text>
                <Badge colorScheme={achievement.completed ? 'green' : 'blue'}>
                  {achievement.completed ? 'Completed' : 'In Progress'}
                </Badge>
                {!achievement.completed && (
                  <Progress 
                    value={achievement.progress} 
                    size="xs" 
                    width="100%" 
                    colorScheme="blue" 
                  />
                )}
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </CardBody>
  </Card>
);

const WellnessTracker = ({ wellnessData }) => (
  <Card>
    <CardHeader>
      <Heading size="md">Wellness Tracking</Heading>
    </CardHeader>
    <CardBody>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
        {wellnessData.map((metric, index) => (
          <Card key={index} variant="outline">
            <CardBody>
              <Stack spacing={3} align="center">
                <CircularProgress
                  value={metric.value}
                  size="100px"
                  thickness="8px"
                  color={metric.color}
                >
                  <CircularProgressLabel>
                    {metric.value}%
                  </CircularProgressLabel>
                </CircularProgress>
                <Text fontWeight="medium">{metric.label}</Text>
                <Text fontSize="sm" color="gray.600">
                  {metric.description}
                </Text>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </CardBody>
  </Card>
);

const PersonalDevelopment = () => {
  const [personalData] = useState({
    skills: [
      {
        name: "Technical Leadership",
        level: 4,
        progress: 75,
        description: "Leading technical teams and projects",
        hoursSpent: 120,
        improvement: 15
      },
      {
        name: "Strategic Planning",
        level: 3,
        progress: 60,
        description: "Business strategy and planning",
        hoursSpent: 85,
        improvement: 12
      }
    ],
    learningPaths: [
      {
        name: "Executive Leadership",
        completedCourses: 3,
        totalCourses: 5,
        currentCourse: "Strategic Decision Making"
      },
      {
        name: "Digital Transformation",
        completedCourses: 2,
        totalCourses: 4,
        currentCourse: "Change Management"
      }
    ],
    achievements: [
      {
        name: "Leadership Excellence",
        icon: <Trophy size={24} />,
        completed: true,
        progress: 100
      },
      {
        name: "Innovation Master",
        icon: <Brain size={24} />,
        completed: false,
        progress: 75
      }
    ],
    wellness: [
      {
        label: "Work-Life Balance",
        value: 85,
        description: "Maintaining healthy balance",
        color: "green.400"
      },
      {
        label: "Stress Management",
        value: 72,
        description: "Managing work pressure",
        color: "blue.400"
      }
    ]
  });

  return (
    <Stack spacing={6}>
      <Flex justify="space-between" align="center">
        <Stack>
          <Heading size="lg">Personal Development</Heading>
          <Text color="gray.600">Track your growth and achievements</Text>
        </Stack>
        <Flex gap={4}>
          <Button leftIcon={<Calendar size={16} />} variant="outline">
            Set Goals
          </Button>
          <Button leftIcon={<Brain size={16} />} colorScheme="blue">
            Skill Assessment
          </Button>
        </Flex>
      </Flex>

      <Tabs>
        <TabList>
          <Tab>Skills & Learning</Tab>
          <Tab>Achievements</Tab>
          <Tab>Wellness</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Stack spacing={6}>
              <SkillProgress skills={personalData.skills} />
              <LearningPathProgress paths={personalData.learningPaths} />
            </Stack>
          </TabPanel>

          <TabPanel>
            <AchievementsSection achievements={personalData.achievements} />
          </TabPanel>

          <TabPanel>
            <WellnessTracker wellnessData={personalData.wellness} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
};

export default PersonalDevelopment;