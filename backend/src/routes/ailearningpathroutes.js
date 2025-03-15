const express = require('express');
const router = express.Router();
const ailearningpathcontroller = require('../controllers/ailearningpathcontroller');
const auth = require('../middleware/authmiddleware');

router.post('/generate', auth, ailearningpathcontroller.generatePersonalizedPath);
router.put('/update/:pathId', auth, ailearningpathcontroller.updatePath);
router.get('/:pathId', auth, ailearningpathcontroller.getPath);

router.get('/optimize-speed/:userId', auth, async (req, res) => {
    try {
        const { userId } = req.params;
        const optimizationPlan = await ailearningpathController.optimizeSpeed(userId);
        res.json(optimizationPlan);
    } catch (error) {
        console.error('Error in speed optimization:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;