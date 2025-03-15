const mongoose = require('mongoose');

const successMetricsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pathId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ailearningpath',
        required: true
    },
    metrics: {
        skillGrowth: {
            type: Number,
            default: 0.5
        },
        conceptMastery: {
            type: Number,
            default: 0.5
        },
        learningVelocity: {
            type: Number,
            default: 0.5
        },
        practicalApplication: {
            type: Number,
            default: 0.5
        },
        breakthroughMoments: {
            type: Number,
            default: 0
        }
    },
    timelineMetrics: [{
        timestamp: Date,
        metricType: String,
        value: Number,
        context: String
    }],
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('successmetrics', successMetricsSchema);