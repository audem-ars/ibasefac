// src/components/auth/login.js
import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Heading,
    useToast,
    Container,
    Text,
    Code
} from '@chakra-ui/react';
import authService from '../../services/authservice';

export const Login = ({ onLoginSuccess }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [debugInfo, setDebugInfo] = useState('');
    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setDebugInfo('Starting login process...');

        try {
            // Clear any existing tokens first
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
            setDebugInfo(prev => prev + '\nCleared existing tokens');

            const response = await fetch('http://localhost:5001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: "test@example.com",
                    password: "testpassword123"
                }),
            });

            const data = await response.json();
            setDebugInfo(prev => prev + '\nReceived response: ' + JSON.stringify(data, null, 2));

            if (!response.ok) {
                throw new Error(data.msg || 'Login failed');
            }

            if (!data.token) {
                throw new Error('No token received');
            }

            // Manually set the token
            localStorage.setItem('auth_token', data.token);
            setDebugInfo(prev => prev + '\nStored token in localStorage');

            // Store user data
            if (data.user) {
                localStorage.setItem('user_data', JSON.stringify(data.user));
                setDebugInfo(prev => prev + '\nStored user data');
            }

            // Verify storage
            const storedToken = localStorage.getItem('auth_token');
            setDebugInfo(prev => prev + '\nVerified token in storage: ' + (storedToken ? 'Yes' : 'No'));

            toast({
                title: 'Login successful',
                status: 'success',
                duration: 2000,
            });

            // Call success callback after short delay
            setTimeout(() => {
                if (onLoginSuccess) {
                    setDebugInfo(prev => prev + '\nCalling onLoginSuccess');
                    onLoginSuccess();
                }
            }, 500);

        } catch (error) {
            console.error('Login error:', error);
            setDebugInfo(prev => prev + '\nError: ' + error.message);
            localStorage.clear();
            toast({
                title: 'Login failed',
                description: error.message,
                status: 'error',
                duration: 5000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxW="container.sm" py={10}>
            <VStack spacing={8}>
                <Heading>Login to Dashboard</Heading>
                <Box w="100%" as="form" onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                defaultValue="test@example.com"
                                readOnly
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                defaultValue="testpassword123"
                                readOnly
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            colorScheme="blue"
                            width="100%"
                            isLoading={isLoading}
                        >
                            Login
                        </Button>
                    </VStack>
                </Box>

                {/* Debug Information */}
                {debugInfo && (
                    <Box 
                        mt={4} 
                        p={4} 
                        bg="gray.50" 
                        borderRadius="md" 
                        w="100%"
                        overflow="auto"
                    >
                        <Text fontSize="sm" whiteSpace="pre-wrap" fontFamily="monospace">
                            {debugInfo}
                        </Text>
                    </Box>
                )}
            </VStack>
        </Container>
    );
};

export default Login;