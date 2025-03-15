const express = require('express');
const router = express.Router();
const auth = require('../middleware/authmiddleware');
const certificationController = require('../controllers/certificationcontroller');

router.get('/test', (req, res) => {
    res.json({ message: 'Certification route test successful' });
});

// Check certification eligibility
router.get('/:certificationId/eligibility', auth, certificationController.verifyCertificationEligibility);

// Start certification process
router.post('/:certificationId/start', auth, certificationController.startCertificationProcess);

// Submit certification assessment
router.post('/:certificationId/assessment/:assessmentId', auth, certificationController.submitCertificationAssessment);

// Validate certificate
router.get('/validate/:verificationHash', certificationController.validateCertificate);

module.exports = router;