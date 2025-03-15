const express = require('express');
const router = express.Router();
const transformationcontroller = require('../controllers/transformationcontroller');
const successmetricscontroller = require('../controllers/successmetricscontroller');
const analyticdashboardcontroller = require('../controllers/analyticdashboardcontroller');
const auth = require('../middleware/authmiddleware');

// Track student transformation
router.post('/track', auth, async (req, res) => {
  try {
    const result = await transformationcontroller.trackBreakthrough(
      req.user.id,
      req.body
    );
    res.json(result);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Add this new route for dashboard metrics
router.get('/metrics', async (req, res) => {
  try {
    const metrics = await successmetricscontroller.getTransformationMetrics(req.user?.id);
    const dashboardData = await analyticdashboardcontroller.getDashboardData(req.user?.id);
    
    res.json({
      score: metrics.transformation?.currentState?.technicalGrowth || 0,
      previousscore: metrics.relatedMetrics?.skillGrowth || 0,
      metrics: {
        ...metrics.transformation?.metrics || {},
        ...dashboardData?.overallMetrics || {}
      }
    });
  } catch (error) {
    console.error('Error fetching transformation metrics:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get transformation report
router.get('/report', auth, async (req, res) => {
  try {
    const report = await transformationcontroller.generateTransformationReport(
      req.user.id
    );
    res.json(report);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Update transformation goals
router.put('/goals', auth, async (req, res) => {
  try {
    const updated = await transformationcontroller.updateTransformationGoals(
      req.user.id,
      req.body
    );
    res.json(updated);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get intervention recommendations
router.get('/interventions', auth, async (req, res) => {
  try {
    const interventions = await transformationcontroller.getInterventions(
      req.user.id
    );
    res.json(interventions);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get breakthrough metrics for a specific user
router.get('/breakthrough/:userid', auth, async (req, res) => {
  try {
    const transformationMetrics = await successmetricscontroller.getTransformationMetrics(req.params.userid);
    res.json({
      score: transformationMetrics.transformation?.impact?.technicalGrowth || 0,
      previousscore: transformationMetrics.relatedMetrics?.skillGrowth || 0
    });
  } catch (error) {
    console.error('Error fetching breakthrough metrics:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;