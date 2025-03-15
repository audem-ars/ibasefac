const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['quiz', 'practice', 'social'],
        required: true
    },
    requiredScore: Number,
    requiredTime: Number,
    requiredInteractions: Number,
    completed: {
        type: Boolean,
        default: false
    },
    breakthroughMoment: {
        type: Boolean,
        default: false
    }
});

const interventionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['adaptive', 'social', 'resource'],
        required: true
    },
    timestamp: Date,
    action: String,
    details: String
});

const peerGroupSchema = new mongoose.Schema({
    peers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    mentors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const pathComponentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    difficulty: {
        type: Number,
        required: true,
        min: 0,
        max: 1
    },
    estimatedTime: {
        type: Number,
        required: true
    },
    prerequisites: [{
        type: String
    }],
    milestones: [milestoneSchema]
});

const ailearningpathSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pathComponents: [pathComponentSchema],
    difficulty: {
        type: Number,
        required: true,
        min: 0,
        max: 1
    },
    estimatedTimeToComplete: {
        type: Number,
        required: true
    },
    prerequisites: [{
        type: String
    }],
    adaptivityRules: {
        progressionThreshold: Number,
        difficultyAdjustmentRate: Number,
        minimumMasteryRequired: Number
    },
    interventions: [interventionSchema],
    peerGroup: peerGroupSchema,
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ailearningpath', ailearningpathSchema);