import React, { useState, useEffect } from 'react';
import {
  Box, Stack, Flex, Grid, Text, Heading,
  Card, CardHeader, CardBody, Button,
  Avatar, AvatarGroup, Badge, IconButton,
  Table, Thead, Tbody, Tr, Th, Td,
  Progress, SimpleGrid, Tooltip, Input,
  Menu, MenuButton, MenuList, MenuItem
} from '@chakra-ui/react';
import {
  Users, MessageSquare, Calendar, CheckCircle,
  Clock, Link as LinkIcon, PlusCircle, MoreVertical,
  Video, FileText, Star, Bell
} from 'lucide-react';

const TeamMembers = ({ members }) => (
  <Card>
    <CardHeader>
      <Flex justify="space-between" align="center">
        <Heading size="md">Team Members</Heading>
        <Button leftIcon={<PlusCircle size={16} />} colorScheme="blue" size="sm">
          Add Member
        </Button>
      </Flex>
    </CardHeader>
    <CardBody>
      <Table>
        <Thead>
          <Tr>
            <Th>Member</Th>
            <Th>Role</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {members.map((member, index) => (
            <Tr key={index}>
              <Td>
                <Flex align="center" gap={3}>
                  <Avatar name={member.name} src={member.avatar} size="sm" />
                  <Text fontWeight="medium">{member.name}</Text>
                </Flex>
              </Td>
              <Td>{member.role}</Td>
              <Td>
                <Badge colorScheme={member.online ? 'green' : 'gray'}>
                  {member.online ? 'Online' : 'Offline'}
                </Badge>
              </Td>
              <Td>
                <Flex gap={2}>
                  <IconButton
                    icon={<MessageSquare size={16} />}
                    size="sm"
                    variant="ghost"
                  />
                  <IconButton
                    icon={<Video size={16} />}
                    size="sm"
                    variant="ghost"
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </CardBody>
  </Card>
);

const ActiveProjects = ({ projects }) => (
  <Card>
    <CardHeader>
      <Heading size="md">Active Projects</Heading>
    </CardHeader>
    <CardBody>
      <Stack spacing={4}>
        {projects.map((project, index) => (
          <Card key={index} variant="outline">
            <CardBody>
              <Stack spacing={3}>
                <Flex justify="space-between" align="center">
                  <Heading size="sm">{project.name}</Heading>
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
                    </MenuList>
                  </Menu>
                </Flex>
                <Progress
                  value={project.progress}
                  size="sm"
                  colorScheme="blue"
                />
                <Flex justify="space-between" align="center">
                  <AvatarGroup size="sm" max={3}>
                    {project.team.map((member, i) => (
                      <Avatar key={i} name={member.name} src={member.avatar} />
                    ))}
                  </AvatarGroup>
                  <Text fontSize="sm" color="gray.500">
                    Due {project.dueDate}
                  </Text>
                </Flex>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </Stack>
    </CardBody>
  </Card>
);

const TeamActivities = ({ activities }) => (
  <Card>
    <CardHeader>
      <Heading size="md">Recent Activities</Heading>
    </CardHeader>
    <CardBody>
      <Stack spacing={4}>
        {activities.map((activity, index) => (
          <Flex key={index} gap={3} align="start">
            <Avatar name={activity.user} src={activity.avatar} size="sm" />
            <Box flex={1}>
              <Text fontSize="sm">
                <Text as="span" fontWeight="medium">
                  {activity.user}
                </Text>{' '}
                {activity.action}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {activity.time}
              </Text>
            </Box>
          </Flex>
        ))}
      </Stack>
    </CardBody>
  </Card>
);

const UpcomingMeetings = ({ meetings }) => (
  <Card>
    <CardHeader>
      <Flex justify="space-between" align="center">
        <Heading size="md">Upcoming Meetings</Heading>
        <Button leftIcon={<Calendar size={16} />} size="sm" colorScheme="blue">
          Schedule
        </Button>
      </Flex>
    </CardHeader>
    <CardBody>
      <Stack spacing={4}>
        {meetings.map((meeting, index) => (
          <Card key={index} variant="outline">
            <CardBody>
              <Stack spacing={3}>
                <Flex justify="space-between" align="center">
                  <Text fontWeight="medium">{meeting.title}</Text>
                  <Badge colorScheme={meeting.type === 'Team' ? 'blue' : 'green'}>
                    {meeting.type}
                  </Badge>
                </Flex>
                <Flex align="center" gap={2}>
                  <Clock size={16} className="text-gray-500" />
                  <Text fontSize="sm">{meeting.time}</Text>
                </Flex>
                <Flex justify="space-between" align="center">
                  <AvatarGroup size="sm" max={3}>
                    {meeting.participants.map((participant, i) => (
                      <Avatar
                        key={i}
                        name={participant.name}
                        src={participant.avatar}
                      />
                    ))}
                  </AvatarGroup>
                  <Button
                    leftIcon={<Video size={16} />}
                    size="sm"
                    colorScheme="blue"
                    variant="outline"
                  >
                    Join
                  </Button>
                </Flex>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </Stack>
    </CardBody>
  </Card>
);

const TeamCollaboration = () => {
  const [teamData] = useState({
    members: [
      { 
        name: 'John Doe', 
        role: 'Team Lead', 
        online: true,
        avatar: 'https://bit.ly/dan-abramov' 
      },
      { 
        name: 'Sarah Smith', 
        role: 'Developer', 
        online: true,
        avatar: 'https://bit.ly/sage-adebayo' 
      },
      // Add more team members...
    ],
    projects: [
      {
        name: 'Platform Redesign',
        progress: 75,
        team: [
          { name: 'John Doe', avatar: 'https://bit.ly/dan-abramov' },
          { name: 'Sarah Smith', avatar: 'https://bit.ly/sage-adebayo' },
        ],
        dueDate: 'Nov 30'
      },
      // Add more projects...
    ],
    activities: [
      {
        user: 'John Doe',
        action: 'completed the frontend milestone',
        time: '2 hours ago',
        avatar: 'https://bit.ly/dan-abramov'
      },
      // Add more activities...
    ],
    meetings: [
      {
        title: 'Weekly Sprint Review',
        type: 'Team',
        time: 'Today, 2:00 PM',
        participants: [
          { name: 'John Doe', avatar: 'https://bit.ly/dan-abramov' },
          { name: 'Sarah Smith', avatar: 'https://bit.ly/sage-adebayo' },
        ]
      },
      // Add more meetings...
    ]
  });

  return (
    <Stack spacing={6}>
      <Flex justify="space-between" align="center">
        <Stack>
          <Heading size="lg">Team Collaboration</Heading>
          <Text color="gray.600">Manage your team and track progress</Text>
        </Stack>
        <Flex gap={4}>
          <Button leftIcon={<Bell size={16} />} variant="outline">
            Notifications
          </Button>
          <Button leftIcon={<Video size={16} />} colorScheme="blue">
            Start Meeting
          </Button>
        </Flex>
      </Flex>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        <TeamMembers members={teamData.members} />
        <ActiveProjects projects={teamData.projects} />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        <TeamActivities activities={teamData.activities} />
        <UpcomingMeetings meetings={teamData.meetings} />
      </SimpleGrid>
    </Stack>
  );
};

export default TeamCollaboration;