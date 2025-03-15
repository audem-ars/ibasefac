const { check, validationResult } = require('express-validator');
const { Quiz, QuizAttempt } = require('../models');

exports.quizvalidation = {
    createQuiz: [
        check('title').trim().notEmpty().withMessage('Quiz title is required')
            .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),
        check('questions').isArray({ min: 1 }).withMessage('Quiz must have at least one question'),
        check('questions.*.questionText').trim().notEmpty().withMessage('Question text is required'),
        check('questions.*.options').if(body => body.questionType === 'multiple-choice')
            .isArray({ min: 2 }).withMessage('Multiple choice questions must have at least 2 options'),
        check('timeLimit').optional().isInt({ min: 1 }).withMessage('Time limit must be a positive number'),
        check('passingScore').isFloat({ min: 0, max: 100 }).withMessage('Passing score must be between 0 and 100')
    ],

    submitQuiz: [
        check('answers').isArray().withMessage('Answers must be provided'),
        check('answers.*.questionId').notEmpty().withMessage('Question ID is required for each answer'),
        check('answers.*.selectedOption').optional(),
        check('answers.*.providedAnswer').optional()
    ]
};

exports.handleQuizErrors = async (req, res, next) => {
    try {
        const attempt = await QuizAttempt.findById(req.params.attemptId);
        if (!attempt) {
            return res.status(404).json({ error: 'Quiz attempt not found' });
        }

        const quiz = await Quiz.findById(attempt.quiz);
        if (quiz.timeLimit) {
            const timeElapsed = (Date.now() - attempt.startedAt) / 1000 / 60;
            if (timeElapsed > quiz.timeLimit) {
                return res.status(400).json({ error: 'Quiz time limit exceeded' });
            }
        }

        if (attempt.completedAt) {
            return res.status(400).json({ error: 'Quiz already submitted' });
        }

        next();
    } catch (error) {
        next(error);
    }
};