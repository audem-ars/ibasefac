const mongoose = require('mongoose');

const customerSuccessSchema = new mongoose.Schema({
    pilotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EnterprisePilot',
        required: true
    },
    checkPoints: [{
        date: Date,
        type: String,
        completed: Boolean,
        notes: String
    }],
    interventions: [{
        date: Date,
        type: String,
        description: String,
        outcome: String
    }],
    successMetrics: {
        userAdoption: {
            active_users: { type: Number, default: 0 },
            engagement_rate: { type: Number, default: 0 },
            feature_adoption: mongoose.Schema.Types.Mixed,
            retention_rate: { type: Number, default: 0 }
        },
        transformationMetrics: {
            skill_growth: { type: Number, default: 0 },
            team_velocity: { type: Number, default: 0 },
            breakthrough_rate: { type: Number, default: 0 },
            innovation_index: { type: Number, default: 0 }
        }
    },
    engagementHistory: [{
        date: Date,
        type: String,
        description: String
    }]
});

module.exports = mongoose.model('CustomerSuccess', customerSuccessSchema);