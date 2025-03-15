import React, { useState, useEffect } from 'react';
import {
  Box, Stack, Flex, Grid, Text, Heading,
  Card, CardHeader, CardBody, Button,
  Progress, SimpleGrid, Badge, IconButton,
  Menu, MenuButton, MenuList, MenuItem,
  Table, Thead, Tbody, Tr, Th, Td,
  Avatar, AvatarGroup, Tooltip, Input,
  Tabs, TabList, Tab, TabPanels, TabPanel
} from '@chakra-ui/react';
import {
  PlusCircle, Clock, CheckCircle, AlertCircle,
  ChevronDown, Filter, Calendar, Users,
  FileText, BarChart2, Flag, MessageSquare,
  Link as LinkIcon, MoreVertical, Star
} from 'lucide-react';

const ProjectOverview = ({ projects }) => (
  <Card>
    <CardHeader>
      <Flex justify="space-between" align="center">
        <Heading size="md">Active Projects</Heading>
        <Button leftIcon={<PlusCircle size={16} />} colorScheme="blue" size="sm">
          New Project
        </Button>
      </Flex>
    </CardHeader>
    <CardBody>
      <Stack spacing={4}>
        {projects.map((project, index) => (
          <Card key={index} variant="outline">
            <CardBody>
              <Stack spacing={4}>
                <Flex justify="space-between" align="center">
                  <Stack>
                    <Heading size="sm">{project.name}</Heading>
                    <Text fontSize="sm" color="gray.500">
                      {project.description}
                    </Text>
                  </Stack>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<MoreVertical size={16} />}
                      variant="ghost"
                      size="sm"
                    />
                    <MenuList>
                      <MenuItem>View Details</MenuItem>
                      <MenuItem>Edit Project</MenuItem>
                      <MenuItem>Share</MenuItem>
                      <MenuItem>Archive</MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>

                <Flex align="center" gap={2}>
                  <Text fontSize="sm" fontWeight="medium">
                    Progress:
                  </Text>
                  <Progress
                    value={project.progress}
                    size="sm"
                    colorScheme="blue"
                    flex={1}
                  />
                  <Text fontSize="sm" fontWeight="medium">
                    {project.progress}%
                  </Text>
                </Flex>

                <Flex justify="space-between" align="center">
                  <AvatarGroup size="sm" max={3}>
                    {project.team.map((member, i) => (
                      <Avatar
                        key={i}
                        name={member.name}
                        src={member.avatar}
                      />
                    ))}
                  </AvatarGroup>
                  <Badge
                    colorScheme={
                      project.status === 'On Track' ? 'green' :
                      project.status === 'At Risk' ? 'yellow' : 'red'
                    }
                  >
                    {project.status}
                  </Badge>
                </Flex>

                <Flex gap={4}>
                  <Flex align="center" gap={2}>
                    <Clock size={16} className="text-gray-500" />
                    <Text fontSize="sm">Due {project.dueDate}</Text>
                  </Flex>
                  <Flex align="center" gap={2}>
                    <CheckCircle size={16} className="text-gray-500" />
                    <Text fontSize="sm">{project.completedTasks}/{project.totalTasks} Tasks</Text>
                  </Flex>
                </Flex>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </Stack>
    </CardBody>
  </Card>
);

const TaskBoard = ({ tasks }) => (
  <Card>
    <CardHeader>
      <Flex justify="space-between" align="center">
        <Heading size="md">Task Board</Heading>
        <Flex gap={2}>
          <Button leftIcon={<Filter size={16} />} size="sm" variant="ghost">
            Filter
          </Button>
          <Button leftIcon={<PlusCircle size={16} />} size="sm" colorScheme="blue">
            Add Task
          </Button>
        </Flex>
      </Flex>
    </CardHeader>
    <CardBody>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        <Card variant="outline">
          <CardHeader bg="gray.50">
            <Text fontWeight="medium">To Do ({tasks.todo.length})</Text>
          </CardHeader>
          <CardBody>
            <Stack spacing={3}>
              {tasks.todo.map((task, index) => (
                <Card key={index} size="sm">
                  <CardBody>
                    <Stack spacing={2}>
                      <Text fontSize="sm" fontWeight="medium">{task.title}</Text>
                      <Flex align="center" gap={2}>
                        <Badge colorScheme="blue">{task.priority}</Badge>
                        <Text fontSize="xs" color="gray.500">Due {task.dueDate}</Text>
                      </Flex>
                      <Avatar name={task.assignee} src={task.avatar} size="sm" />
                    </Stack>
                  </CardBody>
                </Card>
              ))}
            </Stack>
          </CardBody>
        </Card>

        <Card variant="outline">
          <CardHeader bg="gray.50">
            <Text fontWeight="medium">In Progress ({tasks.inProgress.length})</Text>
          </CardHeader>
          <CardBody>
            <Stack spacing={3}>
              {tasks.inProgress.map((task, index) => (
                <Card key={index} size="sm">
                  <CardBody>
                    <Stack spacing={2}>
                      <Text fontSize="sm" fontWeight="medium">{task.title}</Text>
                      <Flex align="center" gap={2}>
                        <Badge colorScheme="yellow">{task.priority}</Badge>
                        <Text fontSize="xs" color="gray.500">Due {task.dueDate}</Text>
                      </Flex>
                      <Avatar name={task.assignee} src={task.avatar} size="sm" />
                    </Stack>
                  </CardBody>
                </Card>
              ))}
            </Stack>
          </CardBody>
        </Card>

        <Card variant="outline">
          <CardHeader bg="gray.50">
            <Text fontWeight="medium">Completed ({tasks.completed.length})</Text>
          </CardHeader>
          <CardBody>
            <Stack spacing={3}>
              {tasks.completed.map((task, index) => (
                <Card key={index} size="sm">
                  <CardBody>
                    <Stack spacing={2}>
                      <Text fontSize="sm" fontWeight="medium">{task.title}</Text>
                      <Flex align="center" gap={2}>
                        <Badge colorScheme="green">{task.priority}</Badge>
                        <Text fontSize="xs" color="gray.500">Completed {task.completedDate}</Text>
                      </Flex>
                      <Avatar name={task.assignee} src={task.avatar} size="sm" />
                    </Stack>
                  </CardBody>
                </Card>
              ))}
            </Stack>
          </CardBody>
        </Card>
      </Grid>
    </CardBody>
  </Card>
);

const ProjectMetrics = ({ metrics }) => (
  <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
    {metrics.map((metric, index) => (
      <Card key={index}>
        <CardBody>
          <Stack>
            <Flex justify="space-between" align="center">
              <Text color="gray.500">{metric.label}</Text>
              {metric.icon}
            </Flex>
            <Text fontSize="2xl" fontWeight="bold">
              {metric.value}
            </Text>
            <Badge
              colorScheme={metric.trend > 0 ? 'green' : 'red'}
              alignSelf="flex-start"
            >
              {metric.trend > 0 ? '↑' : '↓'} {Math.abs(metric.trend)}%
            </Badge>
          </Stack>
        </CardBody>
      </Card>
    ))}
  </SimpleGrid>
);

const ProjectManagement = () => {
  const [projectData] = useState({
    projects: [
      {
        name: 'Enterprise Platform Launch',
        description: 'Launching our new enterprise learning platform',
        progress: 75,
        status: 'On Track',
        dueDate: 'Dec 15',
        completedTasks: 15,
        totalTasks: 20,
        team: [
          { name: 'John Doe', avatar: 'https://bit.ly/dan-abramov' },
          { name: 'Sarah Smith', avatar: 'https://bit.ly/sage-adebayo' },
        ]
      },
      // Add more projects...
    ],
    tasks: {
      todo: [
        {
          title: 'Update user documentation',
          priority: 'High',
          dueDate: 'Nov 30',
          assignee: 'John Doe',
          avatar: 'https://bit.ly/dan-abramov'
        },
        // Add more tasks...
      ],
      inProgress: [
        {
          title: 'Implement analytics dashboard',
          priority: 'Medium',
          dueDate: 'Dec 5',
          assignee: 'Sarah Smith',
          avatar: 'https://bit.ly/sage-adebayo'
        },
        // Add more tasks...
      ],
      completed: [
        {
          title: 'User authentication system',
          priority: 'High',
          completedDate: 'Nov 25',
          assignee: 'John Doe',
          avatar: 'https://bit.ly/dan-abramov'
        },
        // Add more tasks...
      ]
    },
    metrics: [
      {
        label: 'Total Projects',
        value: '12',
        trend: 15,
        icon: <FileText size={20} className="text-blue-500" />
      },
      {
        label: 'On Track',
        value: '85%',
        trend: 5,
        icon: <CheckCircle size={20} className="text-green-500" />
      },
      {
        label: 'At Risk',
        value: '2',
        trend: -10,
        icon: <AlertCircle size={20} className="text-red-500" />
      },
      {
        label: 'Team Velocity',
        value: '94',
        trend: 12,
        icon: <BarChart2 size={20} className="text-purple-500" />
      }
    ]
  });

  return (
    <Stack spacing={6}>
      <Flex justify="space-between" align="center">
        <Stack>
          <Heading size="lg">Project Management</Heading>
          <Text color="gray.600">Track and manage your projects</Text>
        </Stack>
        <Flex gap={4}>
          <Button leftIcon={<Calendar size={16} />} variant="outline">
            Timeline
          </Button>
          <Button leftIcon={<Users size={16} />} colorScheme="blue">
            Team View
          </Button>
        </Flex>
      </Flex>

      <ProjectMetrics metrics={projectData.metrics} />
      
      <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={6}>
        <ProjectOverview projects={projectData.projects} />
        <TaskBoard tasks={projectData.tasks} />
      </SimpleGrid>
    </Stack>
  );
};

export default ProjectManagement;