const express = require('express');
const router = express.Router();
const auth = require('../middleware/authmiddleware');
const EnterpriseOnboarding = require('../controllers/enterpriseonboardingcontroller');
const enterpriseController = require('../controllers/enterprisecontroller');
const enterpriseAnalytics = require('../controllers/enterpriseanalyticscontroller');

// Pilot routes
router.post('/pilot/initialize', auth, async (req, res) => {
    try {
        const pilot = await EnterpriseOnboarding.initializePilot(req.body);
        res.json(pilot);
    } catch (error) {
        console.error('Error initializing pilot:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/pilot/:pilotId/progress', auth, async (req, res) => {
    try {
        const progress = await EnterpriseOnboarding.trackPilotProgress(req.params.pilotId);
        res.json(progress);
    } catch (error) {
        console.error('Error tracking pilot progress:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/pilot/:pilotId/dashboard', auth, async (req, res) => {
    try {
        const dashboard = await EnterpriseOnboarding.generateCustomerDashboard(req.params.pilotId);
        res.json(dashboard);
    } catch (error) {
        console.error('Error generating dashboard:', error);
        res.status(500).json({ error: error.message });
    }
});

// Enterprise onboarding and management routes
router.post('/onboard', auth, enterpriseController.onboardEnterprise);

// Generic analytics impact route (must come before parameterized route)
router.get('/analytics/impact', async (req, res) => {
    try {
        res.json({
            totalimpact: 1000000,
            previoustotalimpact: 900000,
            activeusers: 5000,
            previousactiveusers: 4500,
            impacttrend: [
                {
                    date: '2024-01',
                    revenue: 100000,
                    innovation: 50000,
                    operational: 30000
                }
            ]
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Specific enterprise analytics route
router.get('/analytics/impact/:enterpriseId', auth, async (req, res) => {
    try {
        const impact = await enterpriseAnalytics.calculateEnhancedBusinessImpact(
            await enterpriseAnalytics.getTeamMetrics(req.params.enterpriseId),
            await enterpriseAnalytics.getMarketValueData()
        );
        res.json(impact);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Team management routes
router.post('/teams', auth, async (req, res) => {
    try {
        const { teamName, members, objectives } = req.body;
        const team = await enterpriseController.createTeam({
            name: teamName,
            members,
            objectives,
            enterpriseId: req.enterprise.id
        });
        res.json(team);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Enterprise reporting routes
router.get('/report/:enterpriseId', auth, enterpriseController.generateEnterpriseReport);
router.post('/sync/:enterpriseId', auth, enterpriseController.synchronizeEnterpriseData);
router.put('/framework/:enterpriseId', auth, enterpriseController.updateCompetencyFramework);

module.exports = router;