const mongoose = require('mongoose');

const TransformationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pathId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ailearningpath', required: true },
    metrics: {
        technicalMastery: {
            skillLevel: { type: Number, default: 0 },
            implementationSpeed: { type: Number, default: 0 },
            problemSolving: { type: Number, default: 0 },
            innovationCapacity: { type: Number, default: 0 }
        },
        mindsetTransformation: {
            identityShift: { type: Number, default: 0 },
            creativePotential: { type: Number, default: 0 },
            visionaryCapacity: { type: Number, default: 0 },
            purposeAlignment: { type: Number, default: 0 }
        },
        breakthroughMetrics: {
            technicalBreakthroughs: [{ 
                type: { type: String },
                description: String,
                impact: Number,
                timestamp: { type: Date, default: Date.now }
            }],
            mindsetBreakthroughs: [{
                category: String,
                insight: String,
                impact: Number,
                timestamp: { type: Date, default: Date.now }
            }]
        },
        valueCreation: {
            immediateValue: { type: Number, default: 0 },
            projectedValue: { type: Number, default: 0 },
            legacyValue: { type: Number, default: 0 },
            transformationMultiplier: { type: Number, default: 1 }
        }
    },
    timeline: [{
        type: String,
        category: String,
        value: Number,
        description: String,
        timestamp: { type: Date, default: Date.now }
    }],
    interventions: [{
        type: String,
        trigger: String,
        content: String,
        effectiveness: Number,
        timestamp: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Transformation', TransformationSchema);