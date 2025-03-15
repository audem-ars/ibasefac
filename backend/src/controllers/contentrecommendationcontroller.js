const ContentRecommendation = require('../models/contentrecommendation');
const LearningPattern = require('../models/learningpattern');
const EngagementMetrics = require('../models/engagementmetrics');
const Intervention = require('../models/intervention');

exports.generateRecommendations = async (userId) => {
    try {
        const [learningPattern, engagementMetrics, interventions] = await Promise.all([
            LearningPattern.findOne({ userId }),
            EngagementMetrics.findOne({ userId }),
            Intervention.find({ userId }).sort({ timestamp: -1 }).limit(5)
        ]);

        // Calculate content preferences
        const preferences = await analyzeUserPreferences(userId, learningPattern, engagementMetrics);
        
        // Generate personalized recommendations
        const recommendations = await createPersonalizedRecommendations(preferences, interventions);

        // Save recommendations
        await ContentRecommendation.insertMany(recommendations.map(rec => ({
            userId,
            ...rec
        })));

        return recommendations;
    } catch (err) {
        console.error('Error generating recommendations:', err);
        throw err;
    }
};

const analyzeUserPreferences = async (userId, learningPattern, engagementMetrics) => {
    // Analyze learning velocity
    const learningVelocity = learningPattern?.learningProfile?.learningVelocity || new Map();
    
    // Determine optimal content types
    const contentPreferences = {
        preferredTypes: [],
        optimalDuration: 0,
        topicPreferences: [],
        skillGaps: []
    };

    // Calculate preferred content types based on engagement
    if (learningPattern?.timePatterns?.averageTimePerQuestion) {
        contentPreferences.optimalDuration = 
            Object.values(learningPattern.timePatterns.averageTimePerQuestion).reduce((a, b) => a + b, 0) / 
            Object.keys(learningPattern.timePatterns.averageTimePerQuestion).length;
    }

    // Determine skill gaps from engagement metrics
    if (engagementMetrics?.strugglePoints) {
        contentPreferences.skillGaps = engagementMetrics.strugglePoints
            .filter(point => point.attempts > 2)
            .map(point => point.questionId);
    }

    return contentPreferences;
};

const createPersonalizedRecommendations = async (preferences, interventions) => {
    const recommendations = [];

    // Generate recommendations for skill gaps
    for (const skillGap of preferences.skillGaps) {
        recommendations.push({
            contentType: 'practice',
            relevanceScore: 0.9,
            metadata: {
                title: `Practice Set: ${skillGap}`,
                difficulty: 'intermediate',
                topics: [skillGap],
                duration: preferences.optimalDuration
            },
            recommendationReason: {
                primary: 'Addressing identified skill gap',
                factors: [
                    { name: 'skillGap', weight: 0.7 },
                    { name: 'userPreference', weight: 0.3 }
                ]
            }
        });
    }

    // Generate recommendations based on interventions
    interventions.forEach(intervention => {
        if (intervention.triggerType === 'error_rate') {
            recommendations.push({
                contentType: 'video',
                relevanceScore: 0.85,
                metadata: {
                    title: `Concept Review: ${intervention.interventionData.conceptBreakdown.mainConcept}`,
                    difficulty: 'beginner',
                    topics: intervention.interventionData.conceptBreakdown.subConcepts,
                    duration: Math.min(preferences.optimalDuration, 15)
                },
                recommendationReason: {
                    primary: 'Based on recent learning challenges',
                    factors: [
                        { name: 'recentIntervention', weight: 0.6 },
                        { name: 'conceptDifficulty', weight: 0.4 }
                    ]
                }
            });
        }
    });

    return recommendations;
};

exports.trackEngagement = async (userId, recommendationId, engagementType, data) => {
    try {
        const recommendation = await ContentRecommendation.findById(recommendationId);
        
        switch(engagementType) {
            case 'impression':
                recommendation.engagement.impressions++;
                break;
            case 'click':
                recommendation.engagement.clicks++;
                break;
            case 'completion':
                recommendation.engagement.completionRate = data.completionRate;
                recommendation.engagement.timeSpent = data.timeSpent;
                break;
            case 'rating':
                recommendation.engagement.userRating = data.rating;
                break;
        }

        await recommendation.save();
        return recommendation;
    } catch (err) {
        console.error('Error tracking engagement:', err);
        throw err;
    }
};