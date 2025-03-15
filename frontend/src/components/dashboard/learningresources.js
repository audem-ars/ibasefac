import React, { useState, useEffect } from 'react';
import {
  Box, Stack, Flex, Grid, Text, Heading,
  Card, CardHeader, CardBody, Button,
  Input, InputGroup, InputLeftElement,
  SimpleGrid, Badge, IconButton, Image,
  Tabs, TabList, Tab, TabPanels, TabPanel,
  Progress, Avatar, Tooltip, LinkBox,
  LinkOverlay, Menu, MenuButton, MenuList,
  MenuItem, Tag, TagLabel, TagLeftIcon
} from '@chakra-ui/react';
import {
  Search, Book, Video, FileText, BookOpen,
  Play, Clock, Star, Download, Filter,
  Plus, BarChart2, Award, Users, Brain,
  CheckCircle, BookMarked, PlayCircle
} from 'lucide-react';

const SearchBar = ({ onSearch }) => (
  <InputGroup maxW="600px">
    <InputLeftElement>
      <Search size={20} className="text-gray-400" />
    </InputLeftElement>
    <Input
      placeholder="Search courses, videos, or resources..."
      onChange={(e) => onSearch(e.target.value)}
    />
  </InputGroup>
);

const CourseCard = ({ course }) => (
  <LinkBox as="article">
    <Card h="100%" _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }} transition="all 0.2s">
      <CardBody>
        <Image
          src={course.thumbnail}
          alt={course.title}
          borderRadius="md"
          mb={4}
        />
        <Stack spacing={2}>
          <Flex justify="space-between" align="center">
            <Badge colorScheme={course.level === 'Beginner' ? 'green' : 
                             course.level === 'Intermediate' ? 'blue' : 'purple'}>
              {course.level}
            </Badge>
            <Flex align="center" gap={1}>
              <Star size={16} className="text-yellow-400" />
              <Text fontSize="sm">{course.rating}</Text>
            </Flex>
          </Flex>
          <Heading size="sm">{course.title}</Heading>
          <Text fontSize="sm" color="gray.600" noOfLines={2}>
            {course.description}
          </Text>
          <Flex align="center" gap={2}>
            <Avatar size="sm" name={course.instructor} src={course.instructorAvatar} />
            <Text fontSize="sm">{course.instructor}</Text>
          </Flex>
          <Flex justify="space-between" align="center" mt={2}>
            <Flex align="center" gap={2}>
              <Clock size={16} className="text-gray-500" />
              <Text fontSize="sm">{course.duration}</Text>
            </Flex>
            <Button
              size="sm"
              colorScheme="blue"
              leftIcon={<Play size={16} />}
            >
              Start
            </Button>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  </LinkBox>
);

const VideoLibrary = ({ videos }) => (
  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
    {videos.map((video, index) => (
      <Card key={index} _hover={{ transform: 'translateY(-4px)' }} transition="all 0.2s">
        <CardBody>
          <Box position="relative" mb={4}>
            <Image
              src={video.thumbnail}
              alt={video.title}
              borderRadius="md"
            />
            <IconButton
              icon={<PlayCircle size={40} />}
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              variant="ghost"
              colorScheme="white"
              size="lg"
            />
            <Progress
              value={video.progress}
              size="xs"
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              colorScheme="blue"
            />
          </Box>
          <Stack spacing={2}>
            <Heading size="sm">{video.title}</Heading>
            <Text fontSize="sm" color="gray.600" noOfLines={2}>
              {video.description}
            </Text>
            <Flex justify="space-between" align="center">
              <Text fontSize="sm">{video.duration}</Text>
              <Badge colorScheme={video.watched ? 'green' : 'blue'}>
                {video.watched ? 'Completed' : 'New'}
              </Badge>
            </Flex>
          </Stack>
        </CardBody>
      </Card>
    ))}
  </SimpleGrid>
);

const ResourceMaterials = ({ resources }) => (
  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
    {resources.map((resource, index) => (
      <Card key={index}>
        <CardBody>
          <Flex gap={4}>
            <Box
              p={3}
              bg="blue.50"
              borderRadius="md"
              color="blue.500"
              height="fit-content"
            >
              {resource.type === 'PDF' ? <FileText size={24} /> :
               resource.type === 'Guide' ? <BookOpen size={24} /> :
               <BookMarked size={24} />}
            </Box>
            <Stack spacing={2} flex={1}>
              <Heading size="sm">{resource.title}</Heading>
              <Text fontSize="sm" color="gray.600">
                {resource.description}
              </Text>
              <Flex gap={2}>
                {resource.tags.map((tag, i) => (
                  <Tag key={i} size="sm" variant="subtle" colorScheme="blue">
                    <TagLabel>{tag}</TagLabel>
                  </Tag>
                ))}
              </Flex>
              <Flex justify="space-between" align="center">
                <Text fontSize="sm" color="gray.500">
                  Last updated: {resource.lastUpdated}
                </Text>
                <Button
                  size="sm"
                  leftIcon={<Download size={16} />}
                  variant="outline"
                >
                  Download
                </Button>
              </Flex>
            </Stack>
          </Flex>
        </CardBody>
      </Card>
    ))}
  </SimpleGrid>
);

const AssessmentTools = ({ assessments }) => (
  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
    {assessments.map((assessment, index) => (
      <Card key={index}>
        <CardBody>
          <Stack spacing={4}>
            <Flex justify="space-between" align="start">
              <Stack spacing={1}>
                <Heading size="sm">{assessment.title}</Heading>
                <Text fontSize="sm" color="gray.600">
                  {assessment.description}
                </Text>
              </Stack>
              <Badge colorScheme={assessment.status === 'Available' ? 'green' : 'orange'}>
                {assessment.status}
              </Badge>
            </Flex>
            <Flex wrap="wrap" gap={2}>
              <Flex align="center" gap={1}>
                <Clock size={16} className="text-gray-500" />
                <Text fontSize="sm">{assessment.duration}</Text>
              </Flex>
              <Flex align="center" gap={1}>
                <CheckCircle size={16} className="text-gray-500" />
                <Text fontSize="sm">{assessment.questions} Questions</Text>
              </Flex>
              <Flex align="center" gap={1}>
                <Award size={16} className="text-gray-500" />
                <Text fontSize="sm">{assessment.points} Points</Text>
              </Flex>
            </Flex>
            <Button
              colorScheme="blue"
              isDisabled={assessment.status !== 'Available'}
            >
              Start Assessment
            </Button>
          </Stack>
        </CardBody>
      </Card>
    ))}
  </SimpleGrid>
);

const LearningResources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [resources] = useState({
    courses: [
      {
        title: "Advanced Business Strategy",
        description: "Master strategic planning and execution in modern business environments",
        level: "Advanced",
        rating: 4.8,
        instructor: "Dr. Sarah Johnson",
        instructorAvatar: "https://bit.ly/sage-adebayo",
        duration: "12 hours",
        thumbnail: "/api/placeholder/600/300"
      },
      // Add more courses...
    ],
    videos: [
      {
        title: "Leadership in Digital Age",
        description: "Understanding modern leadership challenges and solutions",
        duration: "45 mins",
        progress: 75,
        watched: false,
        thumbnail: "/api/placeholder/600/300"
      },
      // Add more videos...
    ],
    materials: [
      {
        title: "Digital Transformation Guide",
        description: "Comprehensive guide for enterprise digital transformation",
        type: "Guide",
        tags: ["Strategy", "Digital", "Enterprise"],
        lastUpdated: "2 days ago"
      },
      // Add more materials...
    ],
    assessments: [
      {
        title: "Business Strategy Certification",
        description: "Test your knowledge of advanced business strategies",
        duration: "2 hours",
        questions: 50,
        points: 100,
        status: "Available"
      },
      // Add more assessments...
    ]
  });

  return (
    <Stack spacing={6}>
      <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
        <Stack>
          <Heading size="lg">Learning Resources</Heading>
          <Text color="gray.600">Access courses, videos, and learning materials</Text>
        </Stack>
        <SearchBar onSearch={setSearchQuery} />
      </Flex>

      <Tabs>
        <TabList>
          <Tab>Courses</Tab>
          <Tab>Video Library</Tab>
          <Tab>Resources</Tab>
          <Tab>Assessments</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {resources.courses.map((course, index) => (
                <CourseCard key={index} course={course} />
              ))}
            </SimpleGrid>
          </TabPanel>

          <TabPanel>
            <VideoLibrary videos={resources.videos} />
          </TabPanel>

          <TabPanel>
            <ResourceMaterials resources={resources.materials} />
          </TabPanel>

          <TabPanel>
            <AssessmentTools assessments={resources.assessments} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
};

export default LearningResources;