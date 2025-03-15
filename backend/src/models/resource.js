const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['video', 'article', 'document', 'quiz', 'exercise', 'code', 'project'],
        required: true
    },
    format: {
        type: String,
        enum: ['text/markdown', 'text/html', 'video/mp4', 'application/pdf', 'application/code', 'interactive'],
        required: true
    },
    content: {
        url: String,
        markdown: String,
        code: String,
        data: mongoose.Schema.Types.Mixed
    },
    metadata: {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        createDate: {
            type: Date,
            default: Date.now
        },
        updateDate: Date,
        duration: Number,
        skillLevel: {
            type: String,
            enum: ['beginner', 'intermediate', 'advanced'],
            required: true
        },
        tags: [String],
        prerequisites: [{
            skillId: mongoose.Schema.Types.ObjectId,
            level: Number
        }]
    },
    accessibility: {
        isPublic: {
            type: Boolean,
            default: true
        },
        allowedUsers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        allowedGroups: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group'
        }]
    },
    engagement: {
        views: { type: Number, default: 0 },
        likes: { type: Number, default: 0 },
        shares: { type: Number, default: 0 },
        averageRating: { type: Number, default: 0 },
        completions: { type: Number, default: 0 }
    },
    quality: {
        reviews: [{
            userId: mongoose.Schema.Types.ObjectId,
            rating: Number,
            comment: String,
            date: Date
        }],
        verificationStatus: {
            type: String,
            enum: ['pending', 'verified', 'rejected'],
            default: 'pending'
        },
        verifiedBy: mongoose.Schema.Types.ObjectId
    },
    versions: [{
        number: Number,
        changes: String,
        date: Date,
        author: mongoose.Schema.Types.ObjectId
    }]
});

resourceSchema.index({ title: 'text', 'metadata.tags': 'text' });

module.exports = mongoose.model('Resource', resourceSchema);