const express = require('express');
const router = express.Router();
const auth = require('../middleware/authmiddleware');
const collaborationController = require('../controllers/collaborationcontroller');

// Create new collaboration session
router.post('/session', auth, collaborationController.createSession);

// Join existing session
router.post('/session/:sessionId/join', auth, collaborationController.joinSession);

// Send message in session
router.post('/session/:sessionId/message', auth, collaborationController.sendMessage);

// Update shared code
router.put('/session/:sessionId/code', auth, collaborationController.updateSharedCode);

// End session
router.put('/session/:sessionId/end', auth, collaborationController.endSession);

module.exports = router;