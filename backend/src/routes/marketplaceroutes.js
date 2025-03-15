const express = require('express');
const router = express.Router();
const auth = require('../middleware/authmiddleware');
const Marketplace = require('../models/marketplace');
const { 
    processTransaction, 
    addReview, 
    createPromotion 
} = require('../controllers/marketplacecontroller');

// Get all listings
router.get('/listings', auth, async (req, res) => {
    try {
        const marketplace = await Marketplace.find();
        res.json(marketplace);
    } catch (err) {
        console.error('Error getting marketplace listings:', err);
        res.status(500).send('Server Error');
    }
});

// Process transaction
router.post('/transaction', auth, processTransaction);

// Add review
router.post('/review', auth, addReview);

// Create promotion
router.post('/promotion', auth, createPromotion);

// Get featured listings
router.get('/featured', auth, async (req, res) => {
    try {
        const marketplace = await Marketplace.find({
            'listings.featured.isFeatured': true
        });
        res.json(marketplace);
    } catch (err) {
        console.error('Error getting featured listings:', err);
        res.status(500).send('Server Error');
    }
});

// Create listing
router.post('/create-listing', auth, async (req, res) => {
    try {
        const marketplace = await Marketplace.findOne() || new Marketplace();
        marketplace.listings.push({
            ...req.body,
            popularity: {
                views: 0,
                purchases: 0,
                rating: 0,
                reviews: []
            }
        });
        await marketplace.save();
        res.json(marketplace);
    } catch (err) {
        console.error('Error creating listing:', err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;