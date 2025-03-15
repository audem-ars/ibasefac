// backend/src/models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['student', 'teacher', 'admin'],
        default: 'student'
    },
    progress: {
        type: Map,
        of: Number,
        default: {}
    },
    lastActive: {
        type: Date,
        default: Date.now
    },
    preferences: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
        default: {}
    },
    analytics: {
        totalTimeSpent: { type: Number, default: 0 },
        coursesCompleted: { type: Number, default: 0 },
        averageScore: { type: Number, default: 0 }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Add an index for better query performance
userSchema.index({ email: 1 });

// Add a method to update last active timestamp
userSchema.methods.updateLastActive = function() {
    this.lastActive = new Date();
    return this.save();
};

module.exports = mongoose.model('User', userSchema);