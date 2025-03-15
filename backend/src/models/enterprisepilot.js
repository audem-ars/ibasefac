const mongoose = require('mongoose');

const learningPathSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
});

const organizationDetailsSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    industry: String,
    employeeCount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        default: 'Enterprise'
    }
});

const enterprisePilotSchema = new mongoose.Schema({
    organizationDetails: {
        type: organizationDetailsSchema,
        required: true
    },
    stakeholders: [{
        name: {
            type: String,
            required: true
        },
        role: String,
        email: String
    }],
    customization: {
        learningPaths: [learningPathSchema],
        competencyLevels: [String]
    },
    pilotSize: {
        type: Number,
        default: function() {
            return this.organizationDetails ? 
                Math.min(25, Math.ceil(this.organizationDetails.employeeCount * 0.05)) : 25;
        }
    },
    contractTier: {
        type: String,
        enum: ['small', 'medium', 'large'],
        default: function() {
            if (!this.organizationDetails) return 'small';
            const count = this.organizationDetails.employeeCount;
            if (count <= 500) return 'small';
            if (count <= 2000) return 'medium';
            return 'large';
        }
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    metrics: {
        userAdoption: {
            active_users: { type: Number, default: 0 },
            engagement_rate: { type: Number, default: 0 },
            retention_rate: { type: Number, default: 0 }
        },
        transformationMetrics: {
            skill_growth: { type: Number, default: 0 },
            team_velocity: { type: Number, default: 0 },
            breakthrough_rate: { type: Number, default: 0 },
            innovation_index: { type: Number, default: 0 }
        },
        businessImpact: {
            revenue: {
                newRevenue: { type: Number, default: 0 },
                revenueGrowth: { type: Number, default: 0 },
                marketExpansion: { type: Number, default: 0 },
                customerRetention: { type: Number, default: 0 }
            },
            innovation: {
                newProducts: { type: Number, default: 0 },
                patentsFiled: { type: Number, default: 0 },
                researchOutput: { type: Number, default: 0 },
                innovationVelocity: { type: Number, default: 0 }
            },
            operational: {
                costReduction: { type: Number, default: 0 },
                processEfficiency: { type: Number, default: 0 },
                errorReduction: { type: Number, default: 0 },
                automationLevel: { type: Number, default: 0 }
            },
            workforce: {
                promotionRate: { type: Number, default: 0 },
                salaryGrowth: { type: Number, default: 0 },
                retentionRate: { type: Number, default: 0 },
                recruitmentQuality: { type: Number, default: 0 }
            },
            market: {
                marketShare: { type: Number, default: 0 },
                brandValue: { type: Number, default: 0 },
                competitiveAdvantage: { type: Number, default: 0 },
                industryLeadership: { type: Number, default: 0 }
            }
        }
    },
    phases: {
        preparation: {
            duration: { type: Number, default: 2 },
            activities: [String],
            milestones: [String]
        },
        initial_rollout: {
            duration: { type: Number, default: 4 },
            activities: [String],
            milestones: [String]
        },
        department_expansion: {
            duration: { type: Number, default: 6 },
            activities: [String],
            milestones: [String]
        },
        full_deployment: {
            duration: { type: Number, default: 12 },
            activities: [String],
            milestones: [String]
        }
    }
});

module.exports = mongoose.model('EnterprisePilot', enterprisePilotSchema);