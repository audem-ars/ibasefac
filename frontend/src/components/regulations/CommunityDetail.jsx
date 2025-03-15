// CommunityDetail.jsx
import React, { useState } from 'react';
import {
    Box,
    Card,
    CardHeader,
    CardBody,
    Stack,
    Heading,
    Text,
    Button,
    Flex,
    Badge,
    List,
    ListItem,
    ListIcon,
    Divider,
    Avatar,
    Input,
    Textarea,
    SimpleGrid,
    useToast
} from '@chakra-ui/react';
import { 
    ArrowLeft,
    MessageSquare,
    AlertTriangle,
    ThumbsUp,
    Users,
    Calendar,
    Send,
    Heart
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const CommunityDetail = () => {
    const { topicId } = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    const [newComment, setNewComment] = useState('');

    const topicDetails = {
        'closed-ai-truth': {
            title: 'The Truth About "Open" AI',
            type: 'Fact Check',
            description: `A deep dive into OpenAI's transition from its original non-profit, open-source mission to its current closed-source, 
                        commercial model. Understanding the implications for AI transparency and industry development.`,
            keyFacts: [
                {
                    title: 'Original Mission',
                    content: 'Founded in 2015 as a non-profit with commitment to open-source AI development'
                },
                {
                    title: 'Transition',
                    content: 'Shifted to "capped-profit" model in 2019, limiting investor returns'
                },
                {
                    title: 'Current Status',
                    content: 'Operates as a closed-source, commercial entity with proprietary technology'
                },
                {
                    title: 'Industry Impact',
                    content: 'Set precedent for commercialization of AI research organizations'
                }
            ],
            discussions: [
                {
                    author: 'Dr. Sarah Chen',
                    role: 'AI Ethics Researcher',
                    content: 'The transition raises important questions about the balance between commercial viability and open science.',
                    timestamp: '2 hours ago',
                    likes: 45
                },
                {
                    author: 'Mark Thompson',
                    role: 'Tech Policy Analyst',
                    content: 'We need to consider how this shift affects smaller organizations and researchers in the field.',
                    timestamp: '3 hours ago',
                    likes: 32
                }
            ],
            upcomingEvents: [
                {
                    title: 'Expert Panel: Future of AI Transparency',
                    date: 'March 15, 2024',
                    type: 'Virtual Event'
                },
                {
                    title: 'Community Discussion: Open Source AI',
                    date: 'March 20, 2024',
                    type: 'Live Stream'
                }
            ]
        },
        'expert-connect': {
            title: 'Connect with AI Ethics Experts',
            type: 'Networking',
            description: 'Direct access to AI ethics professionals for guidance and mentorship.',
            keyFacts: [
                {
                    title: 'Mentorship Program',
                    content: 'One-on-one guidance from experienced professionals'
                },
                {
                    title: 'Office Hours',
                    content: 'Regular sessions with AI ethics experts'
                },
                {
                    title: 'Research Collaboration',
                    content: 'Opportunities to participate in ongoing research'
                }
            ],
            discussions: [
                {
                    author: 'Prof. Lisa Wang',
                    role: 'AI Ethics Professor',
                    content: 'Looking forward to mentoring the next generation of AI ethicists.',
                    timestamp: '1 hour ago',
                    likes: 28
                }
            ],
            upcomingEvents: [
                {
                    title: 'AI Ethics Office Hours',
                    date: 'Weekly',
                    type: 'Virtual Meeting'
                }
            ]
        },
        'discussion-forum': {
            title: 'AI Development Forum',
            type: 'Discussion',
            description: 'Open forum for discussing latest AI developments, challenges, and best practices.',
            keyFacts: [
                {
                    title: 'Community Guidelines',
                    content: 'Fostering constructive discussions on AI development'
                },
                {
                    title: 'Expert Moderation',
                    content: 'Discussions moderated by AI professionals'
                },
                {
                    title: 'Knowledge Sharing',
                    content: 'Platform for sharing experiences and insights'
                }
            ],
            discussions: [
                {
                    author: 'Dr. Michael Ross',
                    role: 'AI Researcher',
                    content: 'Let us discuss the latest developments in responsible AI deployment.',
                    timestamp: '30 minutes ago',
                    likes: 15
                }
            ],
            upcomingEvents: [
                {
                    title: 'AI Development Roundtable',
                    date: 'Monthly',
                    type: 'Hybrid Event'
                }
            ]
        },
        'resource-library': {
            title: 'AI Risk & Benefits Library',
            type: 'Resources',
            description: 'Comprehensive collection of materials on AI risks, benefits, and responsible implementation.',
            keyFacts: [
                {
                    title: 'Curated Content',
                    content: 'Verified resources from leading institutions'
                },
                {
                    title: 'Regular Updates',
                    content: 'New materials added weekly'
                },
                {
                    title: 'Expert Reviews',
                    content: 'All resources reviewed by field experts'
                }
            ],
            discussions: [
                {
                    author: 'Dr. Robert Kim',
                    role: 'Research Director',
                    content: 'Check out our latest collection on AI safety frameworks.',
                    timestamp: '4 hours ago',
                    likes: 42
                }
            ],
            upcomingEvents: [
                {
                    title: 'Library Workshop',
                    date: 'Bi-weekly',
                    type: 'Virtual Event'
                }
            ]
        }
    };

    const topic = topicDetails[topicId];

    const handlePostComment = () => {
        if (!newComment.trim()) {
            toast({
                title: 'Comment cannot be empty',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        toast({
            title: 'Comment posted',
            description: 'Your comment has been added to the discussion.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });

        setNewComment('');
    };

    if (!topic) {
        return (
            <Box p={6}>
                <Button 
                    leftIcon={<ArrowLeft size={16} />}
                    onClick={() => navigate('/regulations/community')}
                >
                    Back to Community
                </Button>
                <Text mt={4}>Topic not found</Text>
            </Box>
        );
    }

    return (
        <Box p={6}>
            <Stack spacing={6}>
                <Flex justify="space-between" align="center">
                    <Button
                        leftIcon={<ArrowLeft size={16} />}
                        variant="ghost"
                        onClick={() => navigate('/regulations/community')}
                    >
                        Back to Community
                    </Button>
                    <Badge colorScheme={topic.type === 'Fact Check' ? 'orange' : 'blue'} p={2}>
                        {topic.type}
                    </Badge>
                </Flex>

                <Card>
                    <CardHeader>
                        <Stack spacing={4}>
                            <Heading size="lg">{topic.title}</Heading>
                            <Text>{topic.description}</Text>
                        </Stack>
                    </CardHeader>
                    <CardBody>
                        <Stack spacing={6}>
                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                                {topic.keyFacts.map((fact, index) => (
                                    <Card key={index} variant="outline">
                                        <CardBody>
                                            <Stack>
                                                <Heading size="sm">{fact.title}</Heading>
                                                <Text>{fact.content}</Text>
                                            </Stack>
                                        </CardBody>
                                    </Card>
                                ))}
                            </SimpleGrid>

                            <Divider />

                            <Box>
                                <Heading size="md" mb={4}>Upcoming Events</Heading>
                                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                                    {topic.upcomingEvents.map((event, index) => (
                                        <Card key={index} variant="outline">
                                            <CardBody>
                                                <Stack>
                                                    <Flex align="center" gap={2}>
                                                        <Calendar size={16} />
                                                        <Heading size="sm">{event.title}</Heading>
                                                    </Flex>
                                                    <Text color="gray.600">{event.date}</Text>
                                                    <Badge width="fit-content">{event.type}</Badge>
                                                </Stack>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </SimpleGrid>
                            </Box>

                            <Divider />

                            <Box>
                                <Heading size="md" mb={4}>Discussion</Heading>
                                <Stack spacing={4}>
                                    {topic.discussions.map((discussion, index) => (
                                        <Card key={index} variant="outline">
                                            <CardBody>
                                                <Stack spacing={3}>
                                                    <Flex align="center" gap={2}>
                                                        <Avatar size="sm" name={discussion.author} />
                                                        <Box>
                                                            <Text fontWeight="medium">{discussion.author}</Text>
                                                            <Text fontSize="sm" color="gray.600">{discussion.role}</Text>
                                                        </Box>
                                                    </Flex>
                                                    <Text>{discussion.content}</Text>
                                                    <Flex justify="space-between" align="center">
                                                        <Text fontSize="sm" color="gray.500">{discussion.timestamp}</Text>
                                                        <Flex align="center" gap={1}>
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                leftIcon={<Heart size={14} />}
                                                                colorScheme="red"
                                                            >
                                                                {discussion.likes}
                                                            </Button>
                                                        </Flex>
                                                    </Flex>
                                                </Stack>
                                            </CardBody>
                                        </Card>
                                    ))}

                                    {/* New Discussion Input */}
                                    <Card variant="outline">
                                        <CardBody>
                                            <Stack spacing={4}>
                                                <Textarea
                                                    placeholder="Share your thoughts..."
                                                    rows={3}
                                                    value={newComment}
                                                    onChange={(e) => setNewComment(e.target.value)}
                                                />
                                                <Flex justify="flex-end">
                                                    <Button
                                                        leftIcon={<Send size={16} />}
                                                        colorScheme="blue"
                                                        onClick={handlePostComment}
                                                    >
                                                        Post Comment
                                                    </Button>
                                                </Flex>
                                            </Stack>
                                        </CardBody>
                                    </Card>
                                </Stack>
                            </Box>
                        </Stack>
                    </CardBody>
                </Card>
            </Stack>
        </Box>
    );
};

export default CommunityDetail;