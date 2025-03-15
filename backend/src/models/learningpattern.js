const mongoose = require('mongoose');

const learningPatternSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    timePatterns: {
        averageTimePerQuestion: {
            beginner: { type: Number, default: 0 },
            intermediate: { type: Number, default: 0 },
            advanced: { type: Number, default: 0 }
        },
        timeOfDayPreference: [{ 
            hour: Number, 
            frequency: Number 
        }]
    },
    retryPatterns: [{
        questionId: mongoose.Schema.Types.ObjectId,
        attemptCount: { type: Number, default: 0 },
        successRate: { type: Number, default: 0 },
        difficultyLevel: String
    }],
    hintUsage: {
        frequency: { type: Number, default: 0 },
        effectivenessRate: { type: Number, default: 0 },
        averageHintsPerQuestion: { type: Number, default: 0 }
    },
    errorPatterns: [{
        errorType: String,
        frequency: { type: Number, default: 0 },
        relatedTopics: [String]
    }],
    learningProfile: {
        preferredDifficulty: {
            type: String,
            enum: ['beginner', 'intermediate', 'advanced'],
            default: 'beginner'
        },
        optimalQuestionTypes: [{
            type: String,
            enum: ['multiple-choice', 'true-false', 'short-answer', 'coding', 'fill-in-blanks', 'matching']
        }],
        strengthAreas: [String],
        challengeAreas: [String],
        learningVelocity: {
            type: Map,
            of: Number,
            default: new Map()
        }
    }
});

module.exports = mongoose.model('LearningPattern', learningPatternSchema);