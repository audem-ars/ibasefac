const mongoose = require('mongoose');

const enterpriseSchema = new mongoose.Schema({
    organization: {
        name: String,
        industry: String,
        size: Number,
        contractValue: Number,
        contractStart: Date,
        contractEnd: Date,
        status: {
            type: String,
            enum: ['active', 'pending', 'expired'],
            default: 'active'
        }
    },
    customization: {
        branding: {
            logo: String,
            colors: Map,
            domain: String
        },
        learningPaths: [{
            name: String,
            description: String,
            skills: [String],
            requiredCertifications: [mongoose.Schema.Types.ObjectId],
            timeline: Number, // in weeks
            priority: {
                type: String,
                enum: ['low', 'medium', 'high', 'critical']
            }
        }],
        competencyFramework: {
            levels: [{
                name: String,
                requiredSkills: Map,
                assessmentCriteria: [String]
            }],
            roles: [{
                title: String,
                level: String,
                skills: [String],
                certifications: [mongoose.Schema.Types.ObjectId]
            }]
        }
    },
    analytics: {
        overview: {
            activeUsers: Number,
            completionRate: Number,
            averageEngagement: Number,
            roi: Number
        },
        departmentMetrics: [{
            department: String,
            participationRate: Number,
            skillGrowth: Number,
            topPerformers: [mongoose.Schema.Types.ObjectId]
        }],
        skillGaps: [{
            department: String,
            criticalSkills: [String],
            currentLevel: Number,
            targetLevel: Number,
            estimatedTimeToTarget: Number
        }],
        reports: [{
            type: String,
            generatedAt: Date,
            data: mongoose.Schema.Types.Mixed,
            insights: [String]
        }]
    },
    integrations: {
        hrms: {
            provider: String,
            apiKey: String,
            syncFrequency: String,
            lastSync: Date
        },
        lms: {
            provider: String,
            apiKey: String,
            syncedCourses: [String],
            lastSync: Date
        },
        sso: {
            provider: String,
            configuration: Map,
            enabled: Boolean
        }
    }
});

module.exports = mongoose.model('Enterprise', enterpriseSchema);