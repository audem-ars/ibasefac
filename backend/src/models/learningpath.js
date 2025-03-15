const mongoose = require('mongoose');

const learningPathSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    currentLevel: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
    },
    skillGraph: {
        nodes: [{
            skillId: mongoose.Schema.Types.ObjectId,
            name: String,
            level: Number,
            mastery: Number,
            prerequisites: [mongoose.Schema.Types.ObjectId],
            nextSteps: [mongoose.Schema.Types.ObjectId]
        }],
        edges: [{
            from: mongoose.Schema.Types.ObjectId,
            to: mongoose.Schema.Types.ObjectId,
            weight: Number
        }]
    },
    predictedPath: [{
        skillId: mongoose.Schema.Types.ObjectId,
        recommendedOrder: Number,
        estimatedTimeToMastery: Number,
        confidence: Number
    }],
    adaptiveMetrics: {
        learningVelocity: {
            type: Map,
            of: Number
        },
        retentionRates: {
            type: Map,
            of: Number
        },
        skillDependencies: [{
            primarySkill: mongoose.Schema.Types.ObjectId,
            dependentSkills: [{
                skillId: mongoose.Schema.Types.ObjectId,
                correlationStrength: Number
            }]
        }]
    },
    milestones: [{
        skillId: mongoose.Schema.Types.ObjectId,
        target: Number,
        achieved: {
            type: Boolean,
            default: false
        },
        estimatedCompletion: Date
    }]
});

module.exports = mongoose.model('LearningPath', learningPathSchema);