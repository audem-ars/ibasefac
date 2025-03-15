// src/App.js

import React, { useState } from 'react';
import { ChakraProvider, CSSReset, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardView from './components/dashboard/DashboardView';
import { Login } from './components/auth/login';
import LearningModule from './components/Education/LearningModule';
import SandboxStart from './components/development/SandboxStart';
import { NewProject } from './components/development/NewProject';
import ProjectTemplate from './components/development/ProjectTemplate';
import ProjectWorkspace from './components/development/ProjectWorkspace';
import LearningPathView from './components/learning/LearningPathView';
import { VisionProvider } from './context/VisionContext'; // Add this import

// Import route configurations
import { quizRoutes } from './routes/quizRoutes';
import { regulationRoutes } from './routes/regulationRoutes';

// Components for regulations
import CaseStudyDetail from './components/regulations/CaseStudyDetail';
import RegulationDetail from './components/regulations/RegulationDetail';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const handleLoginSuccess = () => {
        console.log('Login success');
        setIsAuthenticated(true);
    };
    
    const ProtectedRoute = ({ children }) => {
        if (!isAuthenticated) {
            return <Navigate to="/" replace />;
        }
        return children;
    };

    // Separate case studies routes from other regulation routes
    const caseStudiesRoutes = regulationRoutes.filter(route => 
        route.path.includes('case-studies')
    );
    
    const otherRegulationRoutes = regulationRoutes.filter(route => 
        !route.path.includes('case-studies')
    );
    
    return (
        <ChakraProvider>
            <VisionProvider> {/* Add this wrapper */}
                <CSSReset />
                <Router>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                isAuthenticated ? (
                                    <Navigate to="/dashboard" replace />
                                ) : (
                                    <Box p={8}>
                                        <Login onLoginSuccess={handleLoginSuccess} />
                                    </Box>
                                )
                            }
                        />
                        
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <DashboardView />
                                </ProtectedRoute>
                            }
                        />
                        
                        {/* Learning Path Routes */}
                        <Route
                            path="/learning-path"
                            element={
                                <ProtectedRoute>
                                    <LearningPathView />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/learning-path/:pathId"
                            element={
                                <ProtectedRoute>
                                    <LearningPathView />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/learning-path/:pathId/milestone/:milestoneId"
                            element={
                                <ProtectedRoute>
                                    <LearningPathView />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/learn/:id"
                            element={
                                <ProtectedRoute>
                                    <LearningModule />
                                </ProtectedRoute>
                            }
                        />

                        {/* Development Routes */}
                        <Route
                            path="/development/sandbox/new"
                            element={
                                <ProtectedRoute>
                                    <NewProject />
                                </ProtectedRoute>
                            }
                        />
                        
                        <Route
                            path="/development/sandbox/:projectId"
                            element={
                                <ProtectedRoute>
                                    <SandboxStart />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/development/sandbox/:projectId/template"
                            element={
                                <ProtectedRoute>
                                    <ProjectTemplate />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/development/sandbox/:projectId/workspace"
                            element={
                                <ProtectedRoute>
                                    <ProjectWorkspace />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/development/sandbox/new/workspace"
                            element={
                                <ProtectedRoute>
                                    <ProjectWorkspace />
                                </ProtectedRoute>
                            }
                        />

                        {/* Quiz Routes */}
                        {quizRoutes.map((route, index) => (
                            <Route
                                key={`quiz-${index}`}
                                path={route.path}
                                element={
                                    <ProtectedRoute>
                                        <route.element />
                                    </ProtectedRoute>
                                }
                            />
                        ))}

                        {/* Case Studies Routes - More specific routes first */}
                        {caseStudiesRoutes.map((route, index) => (
                            <Route
                                key={`case-study-${index}`}
                                path={route.path}
                                element={
                                    <ProtectedRoute>
                                        <route.element />
                                    </ProtectedRoute>
                                }
                            />
                        ))}

                        {/* Other Regulation Routes */}
                        {otherRegulationRoutes.map((route, index) => (
                            <Route
                                key={`regulation-${index}`}
                                path={route.path}
                                element={
                                    <ProtectedRoute>
                                        <route.element />
                                    </ProtectedRoute>
                                }
                            />
                        ))}
                        
                        <Route
                            path="*"
                            element={
                                <Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />
                            }
                        />
                    </Routes>
                </Router>
            </VisionProvider>
        </ChakraProvider>
    );
}

export default App;