const mongoose = require('mongoose');

const marketplaceSchema = new mongoose.Schema({
    listings: [{
        type: {
            type: String,
            enum: ['certification', 'course', 'job', 'mentorship'],
            required: true
        },
        partnerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'IndustryPartnership'
        },
        title: String,
        description: String,
        price: Number,
        discounts: [{
            discountType: { // Changed from type to discountType to avoid confusion with Schema type
                type: String,
                enum: ['early-bird', 'bulk', 'seasonal', 'special']
            },
            amount: {
                type: Number,
                required: true
            },
            validUntil: {
                type: Date,
                required: true
            }
        }],
        popularity: {
            views: { type: Number, default: 0 },
            purchases: { type: Number, default: 0 },
            rating: { type: Number, default: 0 },
            reviews: [{
                userId: mongoose.Schema.Types.ObjectId,
                rating: Number,
                review: String,
                verified: Boolean
            }]
        },
        featured: {
            isFeatured: Boolean,
            startDate: Date,
            endDate: Date,
            position: Number
        }
    }],
    transactions: [{
        userId: mongoose.Schema.Types.ObjectId,
        listingId: mongoose.Schema.Types.ObjectId,
        amount: Number,
        status: {
            type: String,
            enum: ['pending', 'completed', 'refunded'],
            default: 'pending'
        },
        date: { type: Date, default: Date.now },
        revenueShare: {
            platform: Number,
            partner: Number
        }
    }],
    promotions: [{
        title: String,
        description: String,
        discount: Number,
        validFrom: Date,
        validTo: Date,
        eligibility: {
            userTypes: [String],
            minPurchaseAmount: Number,
            maxUses: Number,
            currentUses: { type: Number, default: 0 }
        }
    }]
});

module.exports = mongoose.model('Marketplace', marketplaceSchema);