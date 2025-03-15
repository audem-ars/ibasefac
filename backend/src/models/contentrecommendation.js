const mongoose = require('mongoose');

const contentRecommendationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    contentType: {
        type: String,
        enum: ['video', 'article', 'practice', 'quiz', 'interactive', 'project'],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'viewed', 'completed', 'skipped'],
        default: 'pending'
    },
    relevanceScore: {
        type: Number,
        min: 0,
        max: 1,
        required: true
    },
    metadata: {
        title: String,
        description: String,
        duration: Number,
        difficulty: {
            type: String,
            enum: ['beginner', 'intermediate', 'advanced']
        },
        topics: [String],
        skills: [{
            skillId: mongoose.Schema.Types.ObjectId,
            relevance: Number
        }]
    },
    recommendationReason: {
        primary: String,
        factors: [{
            name: String,
            weight: Number
        }]
    },
    engagement: {
        impressions: { type: Number, default: 0 },
        clicks: { type: Number, default: 0 },
        timeSpent: { type: Number, default: 0 },
        completionRate: { type: Number, default: 0 },
        userRating: { type: Number, min: 1, max: 5 }
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ContentRecommendation', contentRecommendationSchema);