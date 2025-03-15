import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Box, ChakraProvider, Spinner } from '@chakra-ui/react';
import App from './app';

// Loading component
const LoadingFallback = () => (
  <Box 
    height="100vh" 
    width="100vw" 
    display="flex" 
    alignItems="center" 
    justifyContent="center"
  >
    <Spinner size="xl" color="blue.500" />
  </Box>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Suspense fallback={<LoadingFallback />}>
      <App />
    </Suspense>
  </React.StrictMode>
);