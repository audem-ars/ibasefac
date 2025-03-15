const QuizAttempt = require('../models/quizattempt');
const Successmetrics = require('../models/successmetrics');
const Ailearningpath = require('../models/ailearningpath');

exports.generateBreakthroughStrategy = async (userId, pathId) => {
    try {
        const metrics = await Successmetrics.findOne({ userId, pathId });
        const learningState = await analyzeLearningState(userId);
        const breakthroughPotential = calculateBreakthroughPotential(metrics, learningState);

        return {
            optimalConditions: identifyOptimalConditions(learningState),
            nextBreakthroughPrediction: predictNextBreakthrough(metrics, learningState),
            accelerationTactics: generateAccelerationTactics(breakthroughPotential),
            probability: breakthroughPotential.probability || 0.5
        };
    } catch (error) {
        console.error('Error generating breakthrough strategy:', error);
        throw error;
    }
};

async function analyzeLearningState(userId) {
    const recentQuizzes = await QuizAttempt.find({ userId })
        .sort('-createdAt')
        .limit(10);

    return {
        performanceTrend: calculatePerformanceTrend(recentQuizzes),
        learningVelocity: calculateVelocity(recentQuizzes),
        stateIndicators: {
            focus: assessFocusLevel(recentQuizzes),
            consistency: assessConsistency(recentQuizzes),
            engagement: assessEngagement(recentQuizzes)
        }
    };
}

function calculateBreakthroughPotential(metrics, learningState) {
    const baseProgress = metrics?.metrics?.skillGrowth || 0.5;
    const velocityFactor = learningState.learningVelocity || 0.5;
    const stateFactor = Object.values(learningState.stateIndicators)
        .reduce((acc, val) => acc + val, 0) / 3;

    return {
        probability: baseProgress * velocityFactor * stateFactor,
        predictedTimeframe: calculatePredictedTimeframe(metrics, learningState),
        catalysts: identifyCatalysts(learningState)
    };
}

function calculatePredictedTimeframe(metrics, learningState) {
    const baseTime = 14; // Base timeframe in days
    const performanceFactor = metrics?.metrics?.skillGrowth || 0.5;
    const velocityFactor = learningState.learningVelocity || 0.5;
    
    return Math.round(baseTime * (2 - (performanceFactor * velocityFactor)));
}

function calculatePerformanceTrend(quizzes) {
    if (quizzes.length < 2) return { trend: 'stable', value: 0 };
    
    const scores = quizzes.map(q => q.score);
    const trend = scores[0] > scores[scores.length - 1] ? 'improving' : 'declining';
    const value = (scores[0] - scores[scores.length - 1]) / scores.length;
    
    return { trend, value };
}

function calculateVelocity(quizzes) {
    if (quizzes.length < 2) return 0.5;
    
    return quizzes.reduce((acc, quiz, idx, arr) => {
        if (idx === 0) return acc;
        const timeDiff = new Date(arr[idx-1].createdAt) - new Date(quiz.createdAt);
        const scoreDiff = arr[idx-1].score - quiz.score;
        return acc + (scoreDiff / (timeDiff / (1000 * 60 * 60))); // hourly rate
    }, 0) / (quizzes.length - 1) || 0.5;
}

function assessFocusLevel(quizzes) {
    if (quizzes.length === 0) return 0.5;
    return quizzes.reduce((acc, quiz) => 
        acc + (quiz.timeTaken < quiz.expectedTime ? 1 : 0), 0) / quizzes.length;
}

function assessConsistency(quizzes) {
    if (quizzes.length < 2) return 0.5;
    
    const intervals = [];
    for (let i = 1; i < quizzes.length; i++) {
        intervals.push(new Date(quizzes[i-1].createdAt) - new Date(quizzes[i].createdAt));
    }
    
    const avgInterval = intervals.reduce((a,b) => a + b, 0) / intervals.length;
    const variance = intervals.reduce((acc, int) => 
        acc + Math.pow(int - avgInterval, 2), 0) / intervals.length;
        
    return 1 / (1 + variance/Math.pow(avgInterval, 2)) || 0.5;
}

function assessEngagement(quizzes) {
    if (quizzes.length === 0) return 0.5;
    return quizzes.reduce((acc, quiz) => 
        acc + (quiz.score > 0.7 ? 1 : 0), 0) / quizzes.length;
}

function identifyOptimalConditions(learningState) {
    const focusLevel = learningState.stateIndicators.focus;
    return {
        timeOfDay: focusLevel > 0.7 ? 'morning' : 'evening',
        sessionDuration: calculateOptimalSessionDuration(learningState),
        environmentFactors: [
            'Quiet environment',
            'Regular breaks',
            'Active recall practice'
        ]
    };
}

function calculateOptimalSessionDuration(learningState) {
    const baseDuration = 45; // minutes
    const focusFactor = learningState.stateIndicators.focus;
    return Math.round(baseDuration * (1 + focusFactor));
}

function identifyCatalysts(learningState) {
    return {
        primaryFactors: [
            {
                type: 'focus',
                impact: learningState.stateIndicators.focus > 0.7 ? 'high' : 'moderate'
            },
            {
                type: 'consistency',
                impact: learningState.stateIndicators.consistency > 0.7 ? 'high' : 'moderate'
            }
        ],
        recommendedTriggers: [
            'Intensive practice sessions',
            'Peer review sessions',
            'Real-world applications'
        ]
    };
}

function predictNextBreakthrough(metrics, learningState) {
    const baseTimeframe = 14; // days
    const accelerationFactor = metrics?.metrics?.learningVelocity || 0.5;
    const stateFactor = learningState.stateIndicators.consistency;
    
    return {
        estimatedTimeframe: Math.round(baseTimeframe * (1 - accelerationFactor * stateFactor)),
        triggerConditions: ['Consistent practice', 'Active engagement', 'Challenge acceptance'],
        probabilityScore: accelerationFactor * stateFactor
    };
}

function generateAccelerationTactics(potential) {
    return {
        focusAreas: [
            {
                type: 'skill',
                action: 'Intensive practice',
                duration: '2 hours',
                expected_impact: 0.2
            },
            {
                type: 'concept',
                action: 'Deep dive study',
                duration: '1 hour',
                expected_impact: 0.15
            }
        ],
        recommended_schedule: {
            frequency: 'daily',
            duration: '3 hours',
            intensity: potential.probability > 0.7 ? 'high' : 'moderate'
        }
    };
}