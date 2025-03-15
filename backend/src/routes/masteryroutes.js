const express = require('express');
const router = express.Router();
const auth = require('../middleware/authmiddleware');
const masteryController = require('../controllers/masterycontroller');

// Update skill mastery
router.post('/skill/update', auth, async (req, res) => {
    try {
        const mastery = await masteryController.updateMastery(
            req.user.id,
            req.body
        );
        res.json(mastery);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update milestone progress
router.post('/milestone/update', auth, async (req, res) => {
    try {
        const milestone = await masteryController.updateMilestone(
            req.user.id,
            req.body
        );
        res.json(milestone);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get practice schedule
router.get('/practice-schedule', auth, async (req, res) => {
    try {
        const schedule = await masteryController.generatePracticeSchedule(
            req.user.id
        );
        res.json(schedule);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;