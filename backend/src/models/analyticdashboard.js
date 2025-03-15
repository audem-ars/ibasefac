const mongoose = require('mongoose');

const analyticDashboardSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    overallMetrics: {
        totalStudents: { type: Number, default: 0 },
        averageCompletion: { type: Number, default: 0 },
        averageScore: { type: Number, default: 0 },
        studentEngagement: { type: Number, default: 0 },
        retentionRate: { type: Number, default: 0 }
    },
    performanceMetrics: {
        skillDistribution: [{
            skill: String,
            proficiencyLevel: Number,
            studentCount: Number
        }],
        difficultyAnalysis: {
            beginner: {
                averageScore: Number,
                completionRate: Number,
                attemptCount: Number
            },
            intermediate: {
                averageScore: Number,
                completionRate: Number,
                attemptCount: Number
            },
            advanced: {
                averageScore: Number,
                completionRate: Number,
                attemptCount: Number
            }
        },
        timeAnalysis: {
            averageCompletionTime: Number,
            timeDistribution: [{
                range: String,
                count: Number
            }]
        }
    },
    learningPatterns: {
        peakLearningTimes: [{
            hour: Number,
            activity: Number
        }],
        preferredContentTypes: [{
            type: String,
            usage: Number
        }],
        learningStyles: [{
            style: String,
            percentage: Number
        }]
    },
    interventionEffectiveness: {
        interventionTypes: [{
            type: String,
            successRate: Number,
            usageCount: Number
        }],
        recommendationSuccess: {
            acceptanceRate: Number,
            completionRate: Number,
            improvementRate: Number
        }
    },
    predictiveMetrics: {
        atRiskStudents: [{
            studentId: mongoose.Schema.Types.ObjectId,
            riskLevel: Number,
            factors: [String]
        }],
        successPredictions: [{
            metric: String,
            prediction: Number,
            confidence: Number
        }]
    }
});

module.exports = mongoose.model('AnalyticDashboard', analyticDashboardSchema);