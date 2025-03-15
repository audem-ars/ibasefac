const express = require('express');
const router = express.Router();
const auth = require('../middleware/authmiddleware');
const {
    createQuiz,
    startQuiz,
    submitQuiz,
    getQuizResults,
    getQuizAnalytics,
    deepenConceptMastery    // Add this to the destructured imports
} = require('../controllers/quizcontroller');
const { getDashboardData } = require('../controllers/analyticdashboardcontroller');

// Add this route
router.get('/analytics/dashboard/:courseId', auth, async (req, res) => {
    try {
        const dashboardData = await getDashboardData(req.params.courseId);
        res.json(dashboardData);
    } catch (err) {
        console.error('Error fetching dashboard:', err);
        res.status(500).send('Server Error');
    }
});

// Create quiz
router.post('/', auth, createQuiz);

// Start quiz attempt
router.post('/:quizId/start', auth, startQuiz);

// Submit quiz attempt
router.post('/attempt/:attemptId/submit', auth, submitQuiz);

// Get quiz results
router.get('/attempt/:attemptId', auth, getQuizResults);

// Get quiz analytics
router.get('/:quizId/analytics', auth, getQuizAnalytics);

// Add the new concept mastery route
router.get('/concept-mastery', auth, deepenConceptMastery);

module.exports = router;