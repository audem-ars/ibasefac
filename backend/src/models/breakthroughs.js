const mongoose = require('mongoose');

const breakthroughSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        enum: ['practice', 'theory', 'application'],
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    impactScore: {
        type: Number,
        default: 0
    },
    description: String,
    relatedSkills: [{
        type: String
    }],
    context: {
        type: String,
        enum: ['quiz', 'project', 'practice', 'discussion'],
        required: true
    },
    metrics: {
        beforeLevel: Number,
        afterLevel: Number,
        timeToAchieve: Number
    }
});

module.exports = mongoose.model('Breakthrough', breakthroughSchema);