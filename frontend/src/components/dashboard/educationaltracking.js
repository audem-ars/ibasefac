// src/components/dashboard/educationaltracking.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Stack,
    SimpleGrid,
    Card,
    CardHeader,
    CardBody,
    Heading,
    Text,
    Button,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel
} from '@chakra-ui/react';
import { Book, Video, ClipboardCheck, Library } from 'lucide-react';

const EducationalTracking = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={6}>
            <Tabs>
                <TabList>
                    <Tab>Courses</Tab>
                    <Tab>Video Library</Tab>
                    <Tab>Assessments</Tab>
                    <Tab>Learning Resources</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        {/* This button will navigate to our learning modules */}
                        <Card>
                            <CardHeader>
                                <Heading size="md">Learning Modules</Heading>
                            </CardHeader>
                            <CardBody>
                                <Button 
                                    leftIcon={<Book />}
                                    colorScheme="blue"
                                    onClick={() => navigate('/learning')}
                                >
                                    View Learning Modules
                                </Button>
                            </CardBody>
                        </Card>
                    </TabPanel>

                    <TabPanel>
                        <Card>
                            <CardHeader>
                                <Heading size="md">Video Resources</Heading>
                            </CardHeader>
                            <CardBody>
                                <Text>Coming soon...</Text>
                            </CardBody>
                        </Card>
                    </TabPanel>

                    <TabPanel>
                        <Card>
                            <CardHeader>
                                <Heading size="md">Quizzes</Heading>
                            </CardHeader>
                            <CardBody>
                                <Button 
                                    leftIcon={<ClipboardCheck />}
                                    colorScheme="blue"
                                    onClick={() => navigate('/quiz')}
                                >
                                    View All Quizzes
                                </Button>
                            </CardBody>
                        </Card>
                    </TabPanel>

                    <TabPanel>
                        <Card>
                            <CardHeader>
                                <Heading size="md">Learning Resources</Heading>
                            </CardHeader>
                            <CardBody>
                                <Button 
                                    leftIcon={<Library />}
                                    colorScheme="blue"
                                    onClick={() => navigate('/learning')}
                                >
                                    View Resources
                                </Button>
                            </CardBody>
                        </Card>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Stack>
    );
};

export default EducationalTracking;