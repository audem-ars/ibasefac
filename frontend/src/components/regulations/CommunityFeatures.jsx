// CommunityFeatures.jsx
import React from 'react';
import {
    Box,
    Card,
    CardHeader,
    CardBody,
    Stack,
    Heading,
    Text,
    Button,
    SimpleGrid,
    Flex,
    Badge,
    List,
    ListItem,
    ListIcon,
    Divider,
    Avatar
} from '@chakra-ui/react';
import { 
    Users,
    MessageSquare,
    Book,
    AlertTriangle,
    ThumbsUp,
    Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CommunityFeatures = () => {
    const navigate = useNavigate();

    const communityTopics = [
        {
            id: 'closed-ai-truth',
            title: 'The Truth About "Open" AI',
            type: 'Fact Check',
            engagement: '2.4k discussions',
            lastActive: '2 hours ago',
            description: 'Understanding OpenAI\'s transition from non-profit to closed-source model and its implications for AI transparency.',
            keyPoints: [
                'Transition from open-source principles',
                'Impact on AI accessibility',
                'Industry repercussions',
                'Future of AI transparency'
            ],
            experts: [
                { name: 'Dr. Sarah Chen', role: 'AI Ethics Researcher' },
                { name: 'Mark Thompson', role: 'Tech Policy Analyst' }
            ]
        },
        {
            id: 'expert-connect',
            title: 'Connect with AI Ethics Experts',
            type: 'Networking',
            engagement: '1.8k connections',
            lastActive: '5 hours ago',
            description: 'Direct access to AI ethics professionals for guidance and mentorship.',
            keyPoints: [
                'One-on-one mentorship',
                'Group discussions',
                'Career guidance',
                'Research collaboration'
            ],
            experts: [
                { name: 'Prof. Lisa Wang', role: 'AI Ethics Professor' },
                { name: 'James Miller', role: 'Industry Expert' }
            ]
        },
        {
            id: 'discussion-forum',
            title: 'AI Development Forum',
            type: 'Discussion',
            engagement: '3.2k topics',
            lastActive: '1 hour ago',
            description: 'Open forum for discussing latest AI developments, challenges, and best practices.',
            keyPoints: [
                'Technical discussions',
                'Implementation challenges',
                'Success stories',
                'Risk management'
            ],
            experts: [
                { name: 'Dr. Michael Ross', role: 'AI Researcher' },
                { name: 'Emma Davis', role: 'Ethics Board Member' }
            ]
        },
        {
            id: 'resource-library',
            title: 'AI Risk & Benefits Library',
            type: 'Resources',
            engagement: '5k resources',
            lastActive: '3 hours ago',
            description: 'Comprehensive collection of materials on AI risks, benefits, and responsible implementation.',
            keyPoints: [
                'Case studies',
                'Research papers',
                'Implementation guides',
                'Risk assessment tools'
            ],
            experts: [
                { name: 'Dr. Robert Kim', role: 'Research Director' },
                { name: 'Amanda Chen', role: 'Content Curator' }
            ]
        }
    ];

    return (
        <Box p={6}>
            <Stack spacing={6}>
                <Flex justify="space-between" align="center" mb={4}>
                    <Stack>
                        <Heading size="lg">Community Hub</Heading>
                        <Text color="gray.600">
                            Connect, learn, and share experiences with the AI ethics community
                        </Text>
                    </Stack>
                </Flex>

                <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                    {communityTopics.map((topic) => (
                        <Card 
                            key={topic.id}
                            variant="outline"
                            _hover={{ shadow: 'md' }}
                            transition="all 0.2s"
                        >
                            <CardHeader>
                                <Stack spacing={3}>
                                    <Flex justify="space-between" align="center">
                                        <Heading size="md">{topic.title}</Heading>
                                        <Badge 
                                            colorScheme={topic.type === 'Fact Check' ? 'orange' : 'blue'}
                                        >
                                            {topic.type}
                                        </Badge>
                                    </Flex>
                                    <Flex gap={4}>
                                        <Text fontSize="sm" color="gray.500">
                                            <Eye size={14} style={{ display: 'inline', marginRight: '4px' }} />
                                            {topic.engagement}
                                        </Text>
                                        <Text fontSize="sm" color="gray.500">
                                            <MessageSquare size={14} style={{ display: 'inline', marginRight: '4px' }} />
                                            {topic.lastActive}
                                        </Text>
                                    </Flex>
                                    <Text>{topic.description}</Text>
                                </Stack>
                            </CardHeader>
                            <CardBody>
                                <Stack spacing={4}>
                                    <Box>
                                        <Text fontWeight="medium" mb={2}>Key Topics:</Text>
                                        <List spacing={1}>
                                            {topic.keyPoints.map((point, index) => (
                                                <ListItem 
                                                    key={index}
                                                    display="flex"
                                                    alignItems="center"
                                                >
                                                    <ListIcon as={AlertTriangle} color="blue.500" />
                                                    {point}
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                    
                                    <Divider />
                                    
                                    <Box>
                                        <Text fontWeight="medium" mb={2}>Featured Experts:</Text>
                                        <Stack spacing={2}>
                                            {topic.experts.map((expert, index) => (
                                                <Flex key={index} align="center" gap={2}>
                                                    <Avatar size="sm" name={expert.name} />
                                                    <Box>
                                                        <Text fontWeight="medium">{expert.name}</Text>
                                                        <Text fontSize="sm" color="gray.600">{expert.role}</Text>
                                                    </Box>
                                                </Flex>
                                            ))}
                                        </Stack>
                                    </Box>

                                    <Button
                                        leftIcon={<MessageSquare size={16} />}
                                        colorScheme="blue"
                                        onClick={() => navigate(`/regulations/community/${topic.id}`)}
                                    >
                                        Join Discussion
                                    </Button>
                                </Stack>
                            </CardBody>
                        </Card>
                    ))}
                </SimpleGrid>
            </Stack>
        </Box>
    );
};

export default CommunityFeatures;