const Intervention = require('../models/intervention');
const LearningPattern = require('../models/learningpattern');
const EngagementMetrics = require('../models/engagementmetrics');

exports.detectStrugglePoints = async (attemptData, userId, quizId) => {
    try {
        const learningPattern = await LearningPattern.findOne({ userId });
        const engagementMetrics = await EngagementMetrics.findOne({ userId, quizId });

        // Calculate thresholds based on user's patterns
        const timeThreshold = learningPattern.timePatterns.averageTimePerQuestion[attemptData.difficulty] * 1.5;
        const errorThreshold = 0.4;
        const hintThreshold = 0.5;

        // Check for triggers
        const triggers = {
            timeThreshold: attemptData.timeSpent > timeThreshold,
            errorRate: (attemptData.answers.filter(a => !a.isCorrect).length / attemptData.answers.length) > errorThreshold,
            hintOveruse: (attemptData.answers.reduce((total, ans) => total + (ans.hintsUsed?.length || 0), 0) / attemptData.answers.length) > hintThreshold
        };

        if (Object.values(triggers).some(trigger => trigger)) {
            return generateInterventionStrategy(triggers, attemptData, learningPattern);
        }

        return null;
    } catch (err) {
        console.error('Error detecting struggle points:', err);
        throw err;
    }
};

const generateInterventionStrategy = async (triggers, attemptData, learningPattern) => {
    try {
        const triggerType = Object.keys(triggers).find(key => triggers[key]);
        
        const intervention = new Intervention({
            userId: attemptData.student,
            quizId: attemptData.quiz,
            triggerType,
            interventionData: await createInterventionPlan(triggerType, attemptData, learningPattern)
        });

        await intervention.save();
        return intervention;
    } catch (err) {
        console.error('Error generating intervention strategy:', err);
        throw err;
    }
};

const createInterventionPlan = async (triggerType, attemptData, learningPattern) => {
    const plans = {
        timeThreshold: {
            recommendedAction: 'Take a short break and review prerequisite concepts',
            resources: [
                { type: 'video', url: '/resources/concept-review', format: 'video/mp4' },
                { type: 'summary', url: '/resources/quick-guide', format: 'text/html' }
            ],
            adaptiveHints: [
                'Break down the problem into smaller steps',
                'Try working backwards from the solution'
            ]
        },
        errorRate: {
            recommendedAction: 'Review fundamental concepts and practice with simpler examples',
            resources: [
                { type: 'practice', url: '/resources/practice-set', format: 'application/json' },
                { type: 'guide', url: '/resources/error-analysis', format: 'text/html' }
            ],
            adaptiveHints: [
                'Look for patterns in your errors',
                'Focus on understanding why each step works'
            ]
        },
        hintOveruse: {
            recommendedAction: 'Work on building confidence with guided practice',
            resources: [
                { type: 'tutorial', url: '/resources/guided-practice', format: 'video/mp4' },
                { type: 'worksheet', url: '/resources/confidence-building', format: 'application/pdf' }
            ],
            adaptiveHints: [
                'Try solving without hints first',
                'Make educated guesses before checking hints'
            ]
        }
    };

    return plans[triggerType];
};

// Correct way to export at the bottom of interventioncontroller.js
const interventionController = {
    detectStrugglePoints: exports.detectStrugglePoints,
    generateInterventionStrategy,
    createInterventionPlan
};

module.exports = interventionController;