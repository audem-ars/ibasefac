const express = require('express');
const router = express.Router();
const auth = require('../middleware/authmiddleware');
const gamificationController = require('../controllers/gamificationcontroller');

// Get user's gamification status
router.get('/status', auth, async (req, res) => {
    try {
        const userGame = await Gamification.findOne({ userId: req.user.id });
        res.json(userGame);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update experience
router.post('/experience', auth, async (req, res) => {
    try {
        const { actionType, value } = req.body;
        const updatedGame = await gamificationController.updateExperience(
            req.user.id,
            actionType,
            value
        );
        res.json(updatedGame);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Check achievements
router.post('/check-achievements', auth, async (req, res) => {
    try {
        const { action } = req.body;
        const newAchievements = await gamificationController.checkAchievements(
            req.user.id,
            action
        );
        res.json(newAchievements);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update streak
router.post('/streak', auth, async (req, res) => {
    try {
        const streak = await gamificationController.updateStreak(req.user.id);
        res.json(streak);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get active challenges
router.get('/challenges', auth, async (req, res) => {
    try {
        const challenges = await gamificationController.updateChallenges(req.user.id);
        res.json(challenges);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;