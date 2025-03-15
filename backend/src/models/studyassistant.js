const mongoose = require('mongoose');

const studyAssistantSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    learningContext: {
        currentTopic: String,
        studyGoals: [String],
        preferredLearningStyle: String,
        currentStrengths: [String],
        areasForImprovement: [String]
    },
    interactions: [{
        type: {
            type: String,
            enum: ['question', 'explanation', 'hint', 'recommendation', 'feedback'],
            required: true
        },
        content: {
            query: String,
            response: String,
            relatedTopics: [String],
            resources: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Resource'
            }]
        },
        context: {
            topic: String,
            difficulty: String,
            previousInteractions: [mongoose.Schema.Types.ObjectId]
        },
        effectiveness: {
            helpful: Boolean,
            followUpNeeded: Boolean,
            timeSpent: Number
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    studySession: {
        active: Boolean,
        startTime: Date,
        duration: Number,
        topics: [String],
        goals: [String],
        progress: {
            completed: [String],
            remaining: [String]
        }
    },
    adaptiveSettings: {
        explanationDetail: {
            type: String,
            enum: ['basic', 'detailed', 'comprehensive'],
            default: 'detailed'
        },
        questionStyle: {
            type: String,
            enum: ['direct', 'socratic', 'guided'],
            default: 'guided'
        },
        interventionFrequency: {
            type: String,
            enum: ['low', 'medium', 'high'],
            default: 'medium'
        }
    }
});

module.exports = mongoose.model('StudyAssistant', studyAssistantSchema);