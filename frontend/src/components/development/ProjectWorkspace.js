import React, { useState, useEffect } from 'react';
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import {
    Box, Card, CardHeader, CardBody, Stack, Heading, Text,
    Textarea, Button, VStack, HStack, Tabs, TabList, TabPanels,
    Tab, TabPanel, FormControl, FormLabel, Input, Select,
    Table, Thead, Tbody, Tr, Th, Td, useToast, Switch,
    Progress, IconButton
} from '@chakra-ui/react';
import { DeleteIcon, AddIcon } from '@chakra-ui/icons';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize API clients
const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

const anthropic = new Anthropic({
    apiKey: process.env.REACT_APP_CLAUDE_API_KEY,
    dangerouslyAllowBrowser: true
});

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

const ProjectWorkspace = () => {
    const [userInput, setUserInput] = useState('');
    const [conversation, setConversation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [learningProgress, setLearningProgress] = useState(0);
    
    const [trainingData, setTrainingData] = useState([
        { input: 'Hello', response: 'Hi! How can I help you today?' },
        { input: 'How are you?', response: "I'm doing well, thank you for asking! How may I assist you?" }
    ]);
    
    const [newTrainingPair, setNewTrainingPair] = useState({ input: '', response: '' });
    const toast = useToast();

    const [settings, setSettings] = useState({
        useContext: true,
        memorizePatterns: true,
        learningRate: 0.1,
        maxContextLength: 50,
        useEmbeddings: true,
        useKnowledgeGraph: true,
        usePinecone: true,
        aiProvider: 'gemini'
    });

    const handleAddTrainingPair = () => {
        if (newTrainingPair.input.trim() && newTrainingPair.response.trim()) {
            setIsLoading(true);
            setTimeout(() => {
                setTrainingData([...trainingData, newTrainingPair]);
                setNewTrainingPair({ input: '', response: '' });
                toast({
                    title: 'Training pair added',
                    status: 'success',
                    duration: 2000,
                });
                setIsLoading(false);
            }, 500);
        }
    };

    const handleDeleteTrainingPair = (index) => {
        setIsLoading(true);
        setTimeout(() => {
            const newData = trainingData.filter((_, i) => i !== index);
            setTrainingData(newData);
            toast({
                title: 'Training pair deleted',
                status: 'success',
                duration: 2000,
            });
            setIsLoading(false);
        }, 500);
    };

    class KnowledgeGraph {
        constructor() {
            this.nodes = new Set();
            this.edges = new Map();
        }
    
        addNode(node) {
            this.nodes.add(node);
        }
    
        addEdge(source, target, relationship) {
            this.addNode(source);
            this.addNode(target);
            
            if (!this.edges.has(source)) {
                this.edges.set(source, new Map());
            }
            
            const sourceEdges = this.edges.get(source);
            if (!sourceEdges.has(target)) {
                sourceEdges.set(target, new Set());
            }
            
            sourceEdges.get(target).add(relationship);
        }
    
        getRelatedNodes(node, maxDepth = 2) {
            const visited = new Set();
            const result = new Map();
    
            const traverse = (currentNode, depth) => {
                if (depth > maxDepth || visited.has(currentNode)) return;
                visited.add(currentNode);
    
                const connections = this.edges.get(currentNode);
                if (connections) {
                    connections.forEach((relationships, target) => {
                        result.set(target, Array.from(relationships));
                        traverse(target, depth + 1);
                    });
                }
            };
    
            traverse(node, 0);
            return result;
        }
    
        findPath(start, end, maxDepth = 3) {
            const visited = new Set();
            const paths = new Map();
            paths.set(start, [start]);
            const queue = [start];
    
            while (queue.length > 0) {
                const current = queue.shift();
                if (current === end) {
                    return paths.get(current);
                }
    
                if (visited.has(current) || paths.get(current).length > maxDepth) {
                    continue;
                }
    
                visited.add(current);
                const connections = this.edges.get(current);
                if (connections) {
                    connections.forEach((_, target) => {
                        if (!visited.has(target)) {
                            queue.push(target);
                            paths.set(target, [...paths.get(current), target]);
                        }
                    });
                }
            }
            return null;
        }
    }

    const analyzeIntent = (input) => {
        const intents = {
            greeting: ['hello', 'hi', 'hey', 'greetings'],
            farewell: ['bye', 'goodbye', 'see you'],
            question: ['what', 'how', 'why', 'when', 'where', 'who'],
            gratitude: ['thanks', 'thank you', 'appreciate'],
            request: ['can you', 'could you', 'please', 'help'],
            affirmative: ['yes', 'yeah', 'sure', 'ok', 'okay'],
            negative: ['no', 'nope', 'not', "don't"],
            preference: ['prefer', 'rather', 'like', 'want'],
        };
    
        const words = input.toLowerCase().split(/\s+/);
        let detectedIntents = new Map();
    
        for (const [intent, keywords] of Object.entries(intents)) {
            const matches = keywords.filter(keyword => {
                // Check for exact word matches
                if (words.includes(keyword)) return true;
                // Check for partial matches at word boundaries
                return words.some(word => word.startsWith(keyword + ' ') || word.endsWith(' ' + keyword));
            });
            
            if (matches.length > 0) {
                detectedIntents.set(intent, matches.length / keywords.length);
            }
        }
    
        return detectedIntents;
    };
    
    const analyzeSentiment = (input) => {
        const positiveWords = new Set([
            'good', 'great', 'awesome', 'excellent', 'happy', 'love', 'wonderful',
            'fantastic', 'amazing', 'perfect', 'best', 'glad', 'pleased', 'delighted',
            'grateful', 'impressive', 'outstanding', 'superb', 'brilliant', 'positive'
        ]);
    
        const negativeWords = new Set([
            'bad', 'awful', 'terrible', 'hate', 'angry', 'sad', 'worse',
            'horrible', 'poor', 'disappointing', 'frustrated', 'annoyed', 'unhappy',
            'upset', 'dislike', 'negative', 'wrong', 'difficult', 'impossible', 'failed'
        ]);
    
        const intensifiers = new Set([
            'very', 'really', 'extremely', 'absolutely', 'totally',
            'completely', 'utterly', 'highly', 'especially', 'particularly'
        ]);
    
        const words = input.toLowerCase().split(/\s+/);
        let score = 0;
        let multiplier = 1;
    
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            
            if (intensifiers.has(word)) {
                multiplier = 2;
                continue;
            }
    
            if (positiveWords.has(word)) {
                score += (1 * multiplier);
            } else if (negativeWords.has(word)) {
                score -= (1 * multiplier);
            }
    
            multiplier = 1; // Reset multiplier after using it
        }
    
        // Convert score to sentiment category
        if (score > 2) return 'very positive';
        if (score > 0) return 'positive';
        if (score === 0) return 'neutral';
        if (score > -2) return 'negative';
        return 'very negative';
    };
    
    const extractEntities = (text) => {
        // Basic named entity patterns
        const patterns = {
            date: /\b\d{1,2}[-/]\d{1,2}[-/]\d{2,4}\b|\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{1,2}(?:st|nd|rd|th)?,? \d{4}\b/gi,
            email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
            url: /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi,
            phone: /\b\+?1?\s*\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}\b/g,
            money: /\$\s?\d+(?:\.\d{2})?|\d+\s?(?:dollars?|USD)/gi,
            percentage: /\d+(?:\.\d+)?%/g,
            time: /\b(?:2[0-3]|[01]?[0-9]):[0-5][0-9](?::[0-5][0-9])?\s*(?:AM|PM|am|pm)?\b/g,
            person: /\b(?:Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.)\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g,
        };
    
        const entities = {};
        for (const [type, pattern] of Object.entries(patterns)) {
            const matches = text.match(pattern) || [];
            if (matches.length > 0) {
                entities[type] = matches;
            }
        }
    
        // Extract potential proper nouns (capitalized words not at the start of sentences)
        const properNouns = text.match(/(?<!\.|\?|\!)\s+[A-Z][a-z]+/g) || [];
        if (properNouns.length > 0) {
            entities.properNouns = properNouns.map(n => n.trim());
        }
    
        return entities;
    };
    
    const calculateContextRelevance = (userInput, contextMemory) => {
        return contextMemory.map(memory => {
            const relevanceScore = calculateSimilarity(userInput, memory.input);
            return {
                ...memory,
                relevance: relevanceScore
            };
        }).sort((a, b) => b.relevance - a.relevance);
    };
    
    const updateContextMemory = (contextMemory, newEntry, maxSize) => {
        const updatedMemory = [newEntry, ...contextMemory];
        
        // Remove oldest entries if exceeding maxSize
        while (updatedMemory.length > maxSize) {
            updatedMemory.pop();
        }
        
        return updatedMemory;
    };

    const generateResponse = async (input) => {
        try {
            console.log('Starting generateResponse with provider:', settings.aiProvider);
            console.log('Input:', input);
    
            let response;
    
            switch(settings.aiProvider) {
                case 'gemini':
    try {
        console.log('Starting Gemini request...');
        console.log('API Key:', process.env.REACT_APP_GEMINI_API_KEY); // Will show first few chars
        
        const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
        console.log('Gemini client created');
        
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        console.log('Model selected');
        
        const chat = model.startChat({
            generationConfig: {
                maxOutputTokens: 2048,
            },
        });
        console.log('Chat started');

        const result = await chat.sendMessage(input);
        console.log('Message sent, getting response...');
        
        const response = await result.response.text();
        console.log('Response received:', response);
        
        return response;
    } catch (geminiError) {
        console.error('Full Gemini Error:', geminiError);
        console.error('Error message:', geminiError.message);
        console.error('Error name:', geminiError.name);
        console.error('Error stack:', geminiError.stack);
        
        return `Debug Info - Gemini Error: ${geminiError.message}`;
    }
    
                case 'claude':
                    try {
                        const message = await anthropic.messages.create({
                            model: 'claude-instant-1.2',
                            max_tokens: 1024,
                            messages: [{
                                role: 'user',
                                content: input
                            }]
                        });
                        response = message.content[0].text;
                    } catch (claudeError) {
                        console.error('Claude Error:', claudeError);
                        return `Claude Error: ${claudeError.message}. Consider switching providers or checking your credits.`;
                    }
                    break;
    
                case 'openai':
                    try {
                        const completion = await openai.chat.completions.create({
                            model: "gpt-3.5-turbo",
                            messages: [{ role: "user", content: input }],
                            temperature: 0.7,
                            max_tokens: 500
                        });
                        response = completion.choices[0].message.content;
                    } catch (openaiError) {
                        console.error('OpenAI Error:', openaiError);
                        return `OpenAI Error: ${openaiError.message}. Consider switching providers or checking your API key.`;
                    }
                    break;
    
                default:
                    return "Invalid AI provider selected";
            }
    
            // If we have embeddings and Pinecone enabled, update the knowledge base
            if (settings.useEmbeddings && settings.usePinecone && response) {
                try {
                    // Still use OpenAI for embeddings as it's most reliable
                    const embeddingResponse = await openai.embeddings.create({
                        model: "text-embedding-ada-002",
                        input: input,
                        encoding_format: "float"
                    });
    
                    if (embeddingResponse?.data?.[0]?.embedding) {
                        const pinecone = new Pinecone({
                            apiKey: process.env.REACT_APP_PINECONE_API_KEY,
                            environment: process.env.REACT_APP_PINECONE_ENV
                        });
    
                        const index = pinecone.Index(process.env.REACT_APP_PINECONE_INDEX);
    
                        await index.upsert({
                            vectors: [{
                                id: Date.now().toString(),
                                values: embeddingResponse.data[0].embedding,
                                metadata: {
                                    text: input,
                                    response: response,
                                    timestamp: new Date().toISOString(),
                                    provider: settings.aiProvider
                                }
                            }]
                        });
                    }
                } catch (error) {
                    console.error('Knowledge base update error:', error);
                    // Continue even if knowledge base update fails
                }
            }
    
            return response;
    
        } catch (error) {
            console.error('Top level error in generateResponse:', error);
            return `Error: ${error.message}. Please try again or switch providers.`;
        }
    };

    const handleSendMessage = async () => {
        if (!userInput.trim()) return;
        
        setIsProcessing(true);
        const newMessage = { role: 'user', content: userInput };
        setConversation([...conversation, newMessage]);
        setUserInput('');
        
        try {
            const response = await generateResponse(userInput);
            setConversation(prev => [...prev, { role: 'assistant', content: response }]);
        } catch (error) {
            console.error('Error in handleSendMessage:', error);
            toast({
                title: 'Error',
                description: 'Failed to generate response',
                status: 'error',
                duration: 3000,
            });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Box p={8}>
            <Card maxW="1200px" mx="auto">
                <CardHeader>
                    <Stack spacing={4}>
                        <Heading size="lg">Advanced Chatbot Builder</Heading>
                        <Text>AI-Powered Chat Assistant with Learning Capabilities</Text>
                        {isProcessing && (
                            <Box>
                                <Text mb={2}>Processing Response...</Text>
                                <Progress value={learningProgress} size="sm" colorScheme="purple" />
                            </Box>
                        )}
                    </Stack>
                </CardHeader>
                <CardBody>
                    <Tabs>
                        <TabList>
                            <Tab>Chat</Tab>
                            <Tab>Settings</Tab>
                            <Tab>Knowledge Base</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <VStack h="600px" spacing={4}>
                                    <Box flex="1" w="full" overflowY="auto" bg="gray.50" p={4} borderRadius="md">
                                        {conversation.map((msg, index) => (
                                            <Box
                                                key={index}
                                                bg={msg.role === 'user' ? 'blue.50' : 'green.50'}
                                                p={3}
                                                borderRadius="md"
                                                mb={2}
                                            >
                                                <Text fontWeight="bold">
                                                    {msg.role === 'user' ? 'You' : 'Assistant'}
                                                </Text>
                                                <Text>{msg.content}</Text>
                                            </Box>
                                        ))}
                                    </Box>
                                    <HStack w="full">
                                        <Textarea
                                            value={userInput}
                                            onChange={(e) => setUserInput(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder="Type your message..."
                                            rows={3}
                                        />
                                        <Button
                                            colorScheme="purple"
                                            onClick={handleSendMessage}
                                            isLoading={isProcessing}
                                        >
                                            Send
                                        </Button>
                                    </HStack>
                                </VStack>
                            </TabPanel>

                            <TabPanel>
                                <VStack spacing={4} align="stretch">
                                    <FormControl display='flex' alignItems='center'>
                                        <FormLabel htmlFor='ai-provider'>AI Provider</FormLabel>
                                        <Select
                                            id='ai-provider'
                                            value={settings.aiProvider}
                                            onChange={(e) => setSettings({ ...settings, aiProvider: e.target.value })}
                                        >
                                            <option value="claude">Claude (Free)</option>
                                            <option value="openai">OpenAI (Paid)</option>
                                        </Select>
                                    </FormControl>
                                    
                                    <FormControl display='flex' alignItems='center'>
                                        <FormLabel htmlFor='context-memory'>Use Context Memory</FormLabel>
                                        <Switch
                                            id='context-memory'
                                            isChecked={settings.useContext}
                                            onChange={(e) => setSettings({ ...settings, useContext: e.target.checked })}
                                        />
                                    </FormControl>

                                    <FormControl display='flex' alignItems='center'>
                                        <FormLabel htmlFor='embeddings'>Use Embeddings</FormLabel>
                                        <Switch
                                            id='embeddings'
                                            isChecked={settings.useEmbeddings}
                                            onChange={(e) => setSettings({ ...settings, useEmbeddings: e.target.checked })}
                                        />
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Max Context Length</FormLabel>
                                        <Select
                                            value={settings.maxContextLength}
                                            onChange={(e) => setSettings({ ...settings, maxContextLength: parseInt(e.target.value) })}
                                        >
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                            <option value="200">200</option>
                                        </Select>
                                    </FormControl>
                                </VStack>
                            </TabPanel>

                            <TabPanel>
                                <VStack spacing={4} align="stretch">
                                    <Card variant="outline">
                                        <CardBody>
                                            <Stack spacing={4}>
                                                <Heading size="md">Add Training Pair</Heading>
                                                <FormControl>
                                                    <FormLabel>User Input</FormLabel>
                                                    <Input
                                                        value={newTrainingPair.input}
                                                        onChange={(e) => setNewTrainingPair({
                                                            ...newTrainingPair,
                                                            input: e.target.value
                                                        })}
                                                        placeholder="What the user might say..."
                                                    />
                                                </FormControl>
                                                <FormControl>
                                                    <FormLabel>Bot Response</FormLabel>
                                                    <Input
                                                        value={newTrainingPair.response}
                                                        onChange={(e) => setNewTrainingPair({
                                                            ...newTrainingPair,
                                                            response: e.target.value
                                                        })}
                                                        placeholder="How the bot should respond..."
                                                    />
                                                </FormControl>
                                                <Button
                                                    leftIcon={<AddIcon />}
                                                    colorScheme="purple"
                                                    onClick={handleAddTrainingPair}
                                                    isLoading={isLoading}
                                                >
                                                    Add Training Pair
                                                </Button>
                                            </Stack>
                                        </CardBody>
                                    </Card>

                                    <Table variant="simple">
                                        <Thead>
                                            <Tr>
                                                <Th>User Input</Th>
                                                <Th>Bot Response</Th>
                                                <Th width="100px">Actions</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {trainingData.map((pair, index) => (
                                                <Tr key={index}>
                                                    <Td>{pair.input}</Td>
                                                    <Td>{pair.response}</Td>
                                                    <Td>
                                                        <IconButton
                                                            icon={<DeleteIcon />}
                                                            colorScheme="red"
                                                            variant="ghost"
                                                            onClick={() => handleDeleteTrainingPair(index)}
                                                            isLoading={isLoading}
                                                        />
                                                    </Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </VStack>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </CardBody>
            </Card>
        </Box>
    );
};

export default ProjectWorkspace;