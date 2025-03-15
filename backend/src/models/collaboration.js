const mongoose = require('mongoose');

const collaborationSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: ['studyRoom', 'peerProgramming', 'groupDiscussion', 'problemSolving'],
        required: true
    },
    participants: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        role: {
            type: String,
            enum: ['host', 'participant', 'observer'],
            default: 'participant'
        },
        joinedAt: {
            type: Date,
            default: Date.now
        },
        activeStatus: {
            type: String,
            enum: ['active', 'idle', 'offline'],
            default: 'active'
        }
    }],
    content: {
        title: String,
        description: String,
        resources: [{
            type: String,
            url: String,
            sharedBy: mongoose.Schema.Types.ObjectId
        }],
        messages: [{
            senderId: mongoose.Schema.Types.ObjectId,
            content: String,
            timestamp: Date,
            type: {
                type: String,
                enum: ['text', 'code', 'file', 'question']
            }
        }],
        sharedCode: {
            language: String,
            content: String,
            lastEditor: mongoose.Schema.Types.ObjectId,
            version: Number
        }
    },
    status: {
        type: String,
        enum: ['active', 'paused', 'ended'],
        default: 'active'
    },
    settings: {
        maxParticipants: Number,
        isPrivate: Boolean,
        allowObservers: Boolean,
        recordSession: Boolean
    },
    metrics: {
        duration: Number,
        participantCount: Number,
        messageCount: Number,
        resourcesShared: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    endedAt: Date
});

module.exports = mongoose.model('Collaboration', collaborationSchema);