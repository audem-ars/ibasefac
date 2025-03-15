const express = require('express');
const router = express.Router();
const auth = require('../middleware/authmiddleware');
const { 
    createCourse, 
    getCourses, 
    getCourseById, 
    updateCourse,
    enrollInCourse,
    getCourseProgress,
    completedLesson,
    cleanupProgress,
    startLesson,
    updateLessonProgress
} = require('../controllers/courseController');

// Create course
router.post('/', auth, createCourse);

// Get all courses
router.get('/', getCourses);

// Get course by ID
router.get('/:id', getCourseById);

// Update course
router.put('/:id', auth, updateCourse);

// Enroll in course
router.post('/:id/enroll', auth, enrollInCourse);

// Get course progress
router.get('/:id/progress', auth, getCourseProgress);

// Mark lesson as completed
router.post('/:id/complete-lesson', auth, completedLesson);

// Clean up progress
router.post('/:id/cleanup-progress', auth, cleanupProgress);

// Start lesson attempt
router.post('/:id/modules/:moduleId/lessons/:lessonId/start', auth, startLesson);

// Update lesson progress
router.put('/:id/modules/:moduleId/lessons/:lessonId/progress', auth, updateLessonProgress);

module.exports = router;