const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['course', 'skill', 'path', 'specialization'],
        required: true
    },
    level: {
        type: String,
        enum: ['foundational', 'intermediate', 'advanced', 'expert'],
        required: true
    },
    requirements: {
        skills: [{
            skillId: mongoose.Schema.Types.ObjectId,
            requiredLevel: Number,
            weightage: Number
        }],
        assessments: [{
            type: {
                type: String,
                enum: ['quiz', 'project', 'practical', 'interview']
            },
            passingScore: Number,
            attempts: {
                type: Number,
                default: 3
            }
        }],
        prerequisites: [{
            certificateId: mongoose.Schema.Types.ObjectId,
            minimumScore: Number
        }]
    },
    validation: {
        method: {
            type: String,
            enum: ['automated', 'peer-review', 'expert-review', 'hybrid'],
            required: true
        },
        verifiers: [{
            userId: mongoose.Schema.Types.ObjectId,
            role: String,
            verifiedAt: Date
        }],
        expiryPeriod: Number // in months
    },
    marketValue: {
        industries: [String],
        roles: [String],
        companies: [String],
        averageSalaryImpact: Number,
        demandLevel: {
            type: String,
            enum: ['low', 'medium', 'high', 'very-high']
        }
    },
    earners: [{
        userId: mongoose.Schema.Types.ObjectId,
        earnedAt: Date,
        score: Number,
        verificationHash: String,
        status: {
            type: String,
            enum: ['active', 'expired', 'revoked'],
            default: 'active'
        },
        validUntil: Date
    }]
});

// Virtual for checking if a certificate has expired
certificationSchema.virtual('isExpired').get(function() {
    return this.validation.expiryPeriod && 
           this.earnedAt && 
           new Date() > new Date(this.earnedAt.getTime() + this.validation.expiryPeriod * 30 * 24 * 60 * 60 * 1000);
});

module.exports = mongoose.model('Certification', certificationSchema);