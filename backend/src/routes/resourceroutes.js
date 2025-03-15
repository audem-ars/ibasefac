const express = require('express');
const router = express.Router();
const auth = require('../middleware/authmiddleware');
const resourceController = require('../controllers/resourcecontroller');

// Create new resource
router.post('/', auth, resourceController.createResource);

// Get resources with filters
router.get('/', resourceController.getResources);

// Update resource
router.put('/:id', auth, resourceController.updateResource);

// Review resource
router.post('/:id/review', auth, resourceController.reviewResource);

// Track resource engagement
router.post('/:id/engage', auth, resourceController.trackEngagement);

module.exports = router;