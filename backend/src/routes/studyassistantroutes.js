const express = require('express');
const router = express.Router();
const auth = require('../middleware/authmiddleware');
const { 
    processQuestion,
    startStudySession,
    getRecommendations,
    updateLearningContext
} = require('../controllers/studyassistantcontroller');

// Process student question
router.post('/question', auth, processQuestion);

// Start study session
router.post('/session/start', auth, startStudySession);

// Get personalized recommendations
router.get('/recommendations', auth, getRecommendations);

// Update learning context
router.put('/context', auth, updateLearningContext);

module.exports = router;