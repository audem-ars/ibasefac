const mongoose = require('mongoose');

const industryPartnershipSchema = new mongoose.Schema({
    partner: {
        name: String,
        type: {
            type: String,
            enum: ['tech_company', 'industry_leader', 'certification_provider', 'employer'],
            required: true
        },
        tier: {
            type: String,
            enum: ['platinum', 'gold', 'silver'],
            required: true
        },
        contractValue: {
            annual: Number,
            revenueShare: Number
        },
        status: {
            type: String,
            enum: ['active', 'pending', 'terminated'],
            default: 'active'
        }
    },
    offerings: {
        certifications: [{
            name: String,
            type: String,
            price: Number,
            validity: Number, // in months
            demandScore: Number, // 0-100
            marketValue: Number,
            prerequisites: [String]
        }],
        courses: [{
            name: String,
            level: String,
            duration: Number,
            price: Number,
            skills: [String]
        }],
        jobPlacements: [{
            role: String,
            company: String,
            salary: {
                min: Number,
                max: Number
            },
            locations: [String],
            requiredCertifications: [String]
        }]
    },
    revenue: {
        certificationSales: [{
            month: Date,
            revenue: Number,
            certifications: Map
        }],
        courseSales: [{
            month: Date,
            revenue: Number,
            courses: Map
        }],
        placementFees: [{
            month: Date,
            revenue: Number,
            placements: Number
        }]
    },
    marketingData: {
        targetAudience: [String],
        promotionalContent: [{
            type: String,
            content: String,
            url: String,
            startDate: Date,
            endDate: Date
        }],
        conversionMetrics: {
            views: Number,
            clicks: Number,
            conversions: Number,
            revenue: Number
        }
    },
    qualityMetrics: {
        studentSatisfaction: Number,
        employerSatisfaction: Number,
        placementRate: Number,
        certificationPassRate: Number,
        roi: Number
    }
});

module.exports = mongoose.model('IndustryPartnership', industryPartnershipSchema);