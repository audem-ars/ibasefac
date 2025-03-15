const mongoose = require('mongoose');

const gamificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    level: {
        current: { type: Number, default: 1 },
        experience: { type: Number, default: 0 },
        nextLevelAt: { type: Number, default: 100 }
    },
    achievements: [{
        name: String,
        description: String,
        category: {
            type: String,
            enum: ['learning', 'social', 'challenge', 'milestone']
        },
        progress: {
            current: Number,
            required: Number
        },
        reward: {
            type: String,
            points: Number
        },
        unlockedAt: Date,
        icon: String
    }],
    rewards: [{
        type: {
            type: String,
            enum: ['badge', 'title', 'powerup', 'customization']
        },
        name: String,
        description: String,
        rarity: {
            type: String,
            enum: ['common', 'rare', 'epic', 'legendary']
        },
        unlockCondition: String,
        unlockedAt: Date,
        isEquipped: Boolean
    }],
    streaks: {
        currentStreak: { type: Number, default: 0 },
        longestStreak: { type: Number, default: 0 },
        lastActive: Date,
        multiplier: { type: Number, default: 1 }
    },
    challenges: [{
        name: String,
        description: String,
        type: {
            type: String,
            enum: ['daily', 'weekly', 'special']
        },
        requirements: [{
            type: String,
            progress: Number,
            target: Number
        }],
        reward: {
            experience: Number,
            items: [{
                type: String,
                quantity: Number
            }]
        },
        startDate: Date,
        endDate: Date,
        status: {
            type: String,
            enum: ['active', 'completed', 'failed', 'expired'],
            default: 'active'
        }
    }],
    inventory: [{
        itemId: String,
        name: String,
        type: String,
        quantity: Number,
        attributes: Map
    }]
});

module.exports = mongoose.model('Gamification', gamificationSchema);