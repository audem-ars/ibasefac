import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { dashboardview } from './DashboardView';
import { enterprisemetrics } from '../../components/dashboard/enterprisemetrics';
import { learningoptimization } from '../../components/dashboard/learningoptimization';
import { gameelements } from '../../components/dashboard/gameelements';
import { teamcollaboration } from '../../components/dashboard/teamcollaboration';

// Sample test data
const testData = {
    user: {
        id: '123',
        name: 'Test User',
        level: 5,
        points: 1500,
        streak: 7,
        teamRank: 3
    },
    metrics: {
        valueMetrics: {
            currentValue: 150000,
            projectedValue: 250000,
            optimizationPotential: 350000
        },
        learningMetrics: {
            skillGrowth: 0.75,
            conceptMastery: 0.8,
            learningVelocity: 0.85
        },
        enterpriseMetrics: {
            innovationScore: 82,
            teamEfficiency: 78,
            valueCreated: 175000
        }
    },
    achievements: [
        {
            id: 1,
            name: "Quick Learner",
            description: "Complete 5 courses in a week",
            progress: 80,
            unlocked: false
        },
        // Add more achievements
    ]
};

describe('Dashboard Integration Tests', () => {
    // Test Main Dashboard View
    describe('Dashboard View', () => {
        beforeEach(() => {
            render(<dashboardview {...testData} />);
        });

        test('renders main metrics', async () => {
            expect(screen.getByText('Total Business Impact')).toBeInTheDocument();
            expect(screen.getByText('$150,000')).toBeInTheDocument();
            expect(screen.getByText('Breakthrough Rate')).toBeInTheDocument();
        });

        test('handles tab switching', () => {
            fireEvent.click(screen.getByText('Analytics'));
            expect(screen.getByText('Learning Analytics')).toBeInTheDocument();
            
            fireEvent.click(screen.getByText('Transformation'));
            expect(screen.getByText('Transformation Progress')).toBeInTheDocument();
        });
    });

    // Test Enterprise Metrics
    describe('Enterprise Metrics', () => {
        beforeEach(() => {
            render(<enterprisemetrics metrics={testData.metrics} />);
        });

        test('displays ROI data', () => {
            expect(screen.getByText('ROI Analytics')).toBeInTheDocument();
            expect(screen.getByText('Value Creation')).toBeInTheDocument();
        });

        test('handles time range selection', () => {
            fireEvent.click(screen.getByText('Monthly'));
            // Verify data updates
        });
    });

    // Test Learning Optimization
    describe('Learning Optimization', () => {
        beforeEach(() => {
            render(<learningoptimization learningData={testData.metrics.learningMetrics} />);
        });

        test('shows personalized recommendations', () => {
            expect(screen.getByText('Personalized Learning Path')).toBeInTheDocument();
        });

        test('displays skill progression', () => {
            expect(screen.getByText('Skill Mastery Tracking')).toBeInTheDocument();
        });
    });

    // Test Gamification Elements
    describe('Gamification Features', () => {
        beforeEach(() => {
            render(<gameelements {...testData} />);
        });

        test('shows achievements', () => {
            expect(screen.getByText('Quick Learner')).toBeInTheDocument();
            expect(screen.getByText('80%')).toBeInTheDocument();
        });

        test('handles reward claims', async () => {
            const claimButton = screen.getByText('Claim Reward');
            fireEvent.click(claimButton);
            await waitFor(() => {
                expect(screen.getByText('Reward Unlocked!')).toBeInTheDocument();
            });
        });
    });

    // Test Team Collaboration
    describe('Team Collaboration', () => {
        beforeEach(() => {
            render(<teamcollaboration team={testData.team} />);
        });

        test('displays team projects', () => {
            expect(screen.getByText('Team Projects')).toBeInTheDocument();
        });

        test('handles project interactions', async () => {
            const projectCard = screen.getByText('Project Details');
            fireEvent.click(projectCard);
            await waitFor(() => {
                expect(screen.getByText('Project Timeline')).toBeInTheDocument();
            });
        });
    });
});

// API Integration Tests
describe('API Integration Tests', () => {
    test('fetches dashboard data', async () => {
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        expect(data).toBeDefined();
        expect(data.metrics).toBeDefined();
    });

    test('updates metrics', async () => {
        const response = await fetch('/api/success-metrics/update', {
            method: 'POST',
            body: JSON.stringify({
                skillGrowth: 0.8,
                conceptMastery: 0.85
            })
        });
        const data = await response.json();
        expect(data.success).toBe(true);
    });

    test('tracks achievements', async () => {
        const response = await fetch('/api/gamification/achievement/unlock', {
            method: 'POST',
            body: JSON.stringify({
                achievementId: 1
            })
        });
        const data = await response.json();
        expect(data.unlocked).toBe(true);
    });
});

// Performance Tests
describe('Performance Tests', () => {
    test('loads dashboard within threshold', async () => {
        const startTime = performance.now();
        render(<dashboardview {...testData} />);
        const endTime = performance.now();
        expect(endTime - startTime).toBeLessThan(1000); // 1 second threshold
    });

    test('handles large datasets', () => {
        const largeData = generateLargeDataset(); // Helper function to generate large dataset
        render(<dashboardview {...largeData} />);
        expect(screen.getByText('Total Business Impact')).toBeInTheDocument();
    });
});

// User Flow Tests
describe('User Flow Tests', () => {
    test('complete learning path flow', async () => {
        render(<dashboardview {...testData} />);
        
        // Start learning path
        fireEvent.click(screen.getByText('Continue Learning'));
        
        // Complete course
        await waitFor(() => {
            expect(screen.getByText('Course Completed')).toBeInTheDocument();
        });
        
        // Check achievements
        expect(screen.getByText('New Achievement Unlocked')).toBeInTheDocument();
    });

    test('team collaboration flow', async () => {
        render(<teamcollaboration team={testData.team} />);
        
        // Join project
        fireEvent.click(screen.getByText('Join Project'));
        
        // Submit contribution
        await waitFor(() => {
            expect(screen.getByText('Contribution Added')).toBeInTheDocument();
        });
    });
});

// Helper Functions
const generateLargeDataset = () => {
    // Generate large test dataset
    return {
        // Large dataset structure
    };
};

// Export test utilities
export const testUtils = {
    generateLargeDataset,
    testData
};