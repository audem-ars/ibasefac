const mongoose = require('mongoose');

const socialLearningSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    studyGroup: {
        groupId: mongoose.Schema.Types.ObjectId,
        name: String,
        members: [{
            userId: mongoose.Schema.Types.ObjectId,
            role: {
                type: String,
                enum: ['leader', 'member', 'mentor'],
                default: 'member'
            }
        }],
        topics: [String],
        level: String
    },
    collaborations: [{
        type: {
            type: String,
            enum: ['discussion', 'peerReview', 'groupProject', 'questionAnswer'],
            required: true
        },
        participants: [{
            userId: mongoose.Schema.Types.ObjectId,
            contribution: Number
        }],
        content: {
            title: String,
            description: String,
            attachments: [String],
            status: {
                type: String,
                enum: ['active', 'completed', 'archived'],
                default: 'active'
            }
        },
        metrics: {
            engagement: Number,
            quality: Number,
            helpfulness: Number
        },
        timestamps: {
            created: { type: Date, default: Date.now },
            lastActive: Date,
            completed: Date
        }
    }],
    peerAssessments: [{
        assessorId: mongoose.Schema.Types.ObjectId,
        assesseeId: mongoose.Schema.Types.ObjectId,
        quizId: mongoose.Schema.Types.ObjectId,
        feedback: String,
        rating: Number,
        helpfulVotes: Number,
        timestamp: { type: Date, default: Date.now }
    }],
    achievements: [{
        type: String,
        level: Number,
        earnedAt: Date,
        sharedWith: [mongoose.Schema.Types.ObjectId]
    }]
});

module.exports = mongoose.model('SocialLearning', socialLearningSchema);