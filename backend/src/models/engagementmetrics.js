const mongoose = require('mongoose');

const engagementMetricsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    completionRate: {
        type: Number,
        default: 0
    },
    averageTimeEngaged: {
        type: Number,
        default: 0
    },
    returnRate: {
        type: Number,
        default: 0
    },
    strugglePoints: [{
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Quiz.questions'
        },
        timeSpent: Number,
        attempts: {
            type: Number,
            default: 0
        },
        hintsUsed: {
            type: Number,
            default: 0
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    sessionData: [{
        startTime: Date,
        endTime: Date,
        questionsAttempted: Number,
        questionsCompleted: Number,
        averageTimePerQuestion: Number
    }],
    overallProgress: {
        totalQuizzesTaken: {
            type: Number,
            default: 0
        },
        totalTimeSpent: {
            type: Number,
            default: 0
        },
        completionTrend: [{
            date: Date,
            completionRate: Number
        }]
    }
});

module.exports = mongoose.model('EngagementMetrics', engagementMetricsSchema);