const express = require('express');
const router = express.Router();
const auth = require('../middleware/authmiddleware');
const successmetricscontroller = require('../controllers/successmetricscontroller');

router.get('/dashboard', auth, async (req, res) => {
   try {
       const metrics = await successmetricscontroller.getDashboardMetrics();
       res.json({
           peaklearningtimes: metrics.peaklearningtimes || [],
           preferredcontenttypes: metrics.preferredcontenttypes || [],
           learningstyles: metrics.learningstyles || [],
           interventiontypes: metrics.interventiontypes || [],
           recommendationsuccess: metrics.recommendationsuccess || { rate: 0, total: 0 },
           atriskstudents: metrics.atriskstudents || [],
           successpredictions: metrics.successpredictions || []
       });
   } catch (error) {
       console.error('Error getting dashboard metrics:', error);
       res.status(500).json({
           error: 'Server error',
           message: error.message
       });
   }
});

router.get('/transformation', auth, async (req, res) => {
   try {
       const transformationMetrics = await successmetricscontroller.getTransformationMetrics();
       res.json(transformationMetrics);
   } catch (error) {
       console.error('Error getting transformation metrics:', error);
       res.status(500).json({
           error: 'Server error',
           message: error.message
       });
   }
});

router.get('/transformation/:userId', auth, async (req, res) => {
   try {
       const { userId } = req.params;
       const transformationMetrics = await successmetricscontroller.getTransformationMetrics(userId);
       res.json(transformationMetrics);
   } catch (error) {
       console.error('Error getting transformation metrics:', error);
       res.status(500).json({
           error: 'Server error',
           message: error.message
       });
   }
});

router.post('/update/:userId', auth, async (req, res) => {
   try {
       const { userId } = req.params;
       const { pathId } = req.body;
       const metrics = await successmetricscontroller.updateSuccessMetrics(userId, pathId || null);
       res.json(metrics);
   } catch (error) {
       console.error('Error updating metrics:', error);
       res.status(500).json({
           error: 'Server error',
           message: error.message
       });
   }
});

router.get('/analytics/dashboard', auth, async (req, res) => {
   try {
       const analytics = await successmetricscontroller.getAnalyticsDashboard();
       res.json(analytics);
   } catch (error) {
       console.error('Error getting analytics dashboard:', error);
       res.status(500).json({
           error: 'Server error',
           message: error.message
       });
   }
});

module.exports = router;