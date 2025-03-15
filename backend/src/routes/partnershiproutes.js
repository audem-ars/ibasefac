const express = require('express');
const router = express.Router();
const auth = require('../middleware/authmiddleware');
const partnershipController = require('../controllers/partnershipcontroller');
const marketplaceController = require('../controllers/marketplacecontroller');

// Partnership routes
router.post('/create', auth, partnershipController.createPartnership);
router.get('/:partnerId/report', auth, partnershipController.generatePartnershipReport);
router.put('/:partnerId/offerings', auth, partnershipController.updatePartnershipOfferings);

// Marketplace routes
router.post('/marketplace/transaction', auth, marketplaceController.processTransaction);

module.exports = router;