const express = require('express');
const router = express.Router();
const auth = require('../middleware/authmiddleware');
const progressAnalyticsController = require('../controllers/progressanalyticscontroller');

// Get progress analytics
router.get('/', auth, async (req, res) => {
    try {
        const analytics = await progressAnalyticsController.updateProgressAnalytics(req.user.id);
        res.json(analytics);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;