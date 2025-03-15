const Marketplace = require('../models/marketplace');

// Process transaction
exports.processTransaction = async (req, res) => {
    try {
        const { listingId, amount, revenueShare } = req.body;

        const marketplace = await Marketplace.findOne({
            'listings._id': listingId
        });

        if (!marketplace) {
            return res.status(404).json({ msg: 'Listing not found' });
        }

        // Create new transaction
        const transaction = {
            userId: req.user.id,
            listingId,
            amount,
            status: 'completed',
            date: new Date(),
            revenueShare
        };

        marketplace.transactions.push(transaction);

        // Update listing popularity
        const listing = marketplace.listings.id(listingId);
        listing.popularity.purchases += 1;

        await marketplace.save();
        res.json(transaction);
    } catch (err) {
        console.error('Error processing transaction:', err);
        res.status(500).send('Server Error');
    }
};

// Add review
exports.addReview = async (req, res) => {
    try {
        const { listingId, rating, review } = req.body;

        const marketplace = await Marketplace.findOne({
            'listings._id': listingId
        });

        if (!marketplace) {
            return res.status(404).json({ msg: 'Listing not found' });
        }

        const listing = marketplace.listings.id(listingId);
        
        // Check if user has purchased the listing
        const hasPurchased = marketplace.transactions.some(
            t => t.userId.toString() === req.user.id && 
                t.listingId.toString() === listingId
        );

        if (!hasPurchased) {
            return res.status(403).json({ msg: 'Must purchase before reviewing' });
        }

        // Add review
        listing.popularity.reviews.push({
            userId: req.user.id,
            rating,
            review,
            verified: true
        });

        // Update average rating
        const reviews = listing.popularity.reviews;
        listing.popularity.rating = 
            reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

        await marketplace.save();
        res.json(listing);
    } catch (err) {
        console.error('Error adding review:', err);
        res.status(500).send('Server Error');
    }
};

// Create promotion
exports.createPromotion = async (req, res) => {
    try {
        const { title, description, discount, validFrom, validTo, eligibility } = req.body;

        const marketplace = await Marketplace.findOne();
        if (!marketplace) {
            return res.status(404).json({ msg: 'Marketplace not found' });
        }

        marketplace.promotions.push({
            title,
            description,
            discount,
            validFrom,
            validTo,
            eligibility: {
                ...eligibility,
                currentUses: 0
            }
        });

        await marketplace.save();
        res.json(marketplace.promotions[marketplace.promotions.length - 1]);
    } catch (err) {
        console.error('Error creating promotion:', err);
        res.status(500).send('Server Error');
    }
};