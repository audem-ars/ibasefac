const express = require('express');
const router = express.Router();
const auth = require('../middleware/authmiddleware');
const socialLearningController = require('../controllers/sociallearningcontroller');

// Create or join study group
router.post('/group', auth, async (req, res) => {
    try {
        const group = await socialLearningController.createOrJoinStudyGroup(
            req.user.id,
            req.body
        );
        res.json(group);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Start collaboration
router.post('/collaborate', auth, async (req, res) => {
    try {
        const collaboration = await socialLearningController.startCollaboration(
            req.user.id,
            req.body.type,
            req.body.participants,
            req.body.content
        );
        res.json(collaboration);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Submit peer assessment
router.post('/assess', auth, async (req, res) => {
    try {
        const assessment = await socialLearningController.submitPeerAssessment(
            req.user.id,
            req.body.assesseeId,
            req.body.quizId,
            req.body.feedback,
            req.body.rating
        );
        res.json(assessment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;  // This is crucial - make sure it exports the router