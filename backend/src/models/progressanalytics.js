const mongoose = require('mongoose');

const progressAnalyticsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    overallProgress: {
        completionRate: Number,
        averageScore: Number,
        studyTime: Number,
        skillsMastered: Number,
        topicsCompleted: Number,
        lastActivity: Date
    },
    skillProgress: [{
        skillId: mongoose.Schema.Types.ObjectId,
        name: String,
        progress: Number,
        strengthScore: Number,
        weaknesses: [String],
        lastPracticed: Date,
        history: [{
            date: Date,
            score: Number,
            activity: String
        }]
    }],
    learningVelocity: {
        overallRate: Number,
        byTopic: [{
            topic: String,
            rate: Number,
            timeSpent: Number
        }],
        trend: [{
            date: Date,
            rate: Number
        }]
    },
    timeAnalytics: {
        totalStudyTime: Number,
        averageSessionLength: Number,
        peakPerformanceTime: {
            dayOfWeek: String,
            timeOfDay: String
        },
        sessions: [{
            date: Date,
            duration: Number,
            productivity: Number,
            topics: [String]
        }]
    },
    predictiveMetrics: {
        estimatedCompletion: Date,
        projectedGrowth: [{
            skill: String,
            currentLevel: Number,
            projectedLevel: Number,
            timeframe: Number
        }],
        recommendedFocus: [{
            topic: String,
            reason: String,
            priority: Number
        }]
    }
});

module.exports = mongoose.model('ProgressAnalytics', progressAnalyticsSchema);