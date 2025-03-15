const express = require('express');
const router = express.Router();
const auth = require('../middleware/authmiddleware');

router.get('/:userId', auth, async (req, res) => {
   try {
       const { userId } = req.params;
       const outcomes = await careeroutcomescontroller.getUserOutcomes(userId);
       res.json(outcomes);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
});

router.post('/update', auth, async (req, res) => {
   try {
       const outcomes = await careeroutcomescontroller.updateOutcomes(req.user.id, req.body);
       res.json(outcomes);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
});

router.get('/metrics/:userId', auth, async (req, res) => {
   try {
       const metrics = await careeroutcomescontroller.getCareerMetrics(req.params.userId);
       res.json(metrics);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
});

module.exports = router;