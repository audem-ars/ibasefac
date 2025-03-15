const mongoose = require('mongoose');

const interventionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    },
    triggerType: {
        type: String,
        enum: ['time_threshold', 'error_rate', 'hint_overuse', 'pattern_detected'],
        required: true
    },
    status: {
        type: String,
        enum: ['triggered', 'delivered', 'completed', 'ignored'],
        default: 'triggered'
    },
    interventionData: {
        recommendedAction: String,
        resources: [{
            type: String,
            url: String,
            format: String
        }],
        adaptiveHints: [String],
        conceptBreakdown: {
            mainConcept: String,
            subConcepts: [String],
            prerequisites: [String]
        }
    },
    timing: {
        triggeredAt: {
            type: Date,
            default: Date.now
        },
        deliveredAt: Date,
        completedAt: Date
    },
    effectiveness: {
        preInterventionScore: Number,
        postInterventionScore: Number,
        timeSpentOnIntervention: Number,
        userFeedback: {
            helpful: Boolean,
            comments: String
        }
    }
});

module.exports = mongoose.model('Intervention', interventionSchema);