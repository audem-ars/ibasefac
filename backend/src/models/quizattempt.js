const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    selectedOption: String,
    providedAnswer: String,
    matchingAnswers: [{
        left: String,
        right: String
    }],
    blanks: [String],
    isCorrect: Boolean,
    pointsEarned: Number,
    hintPenalty: Number,
    hintsUsed: [Number]
});

const quizAttemptSchema = new mongoose.Schema({
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    answers: [answerSchema],
    startedAt: {
        type: Date,
        default: Date.now
    },
    completedAt: Date,
    timeSpent: Number,
    totalPoints: Number,
    earnedPoints: Number,
    score: Number,
    passed: Boolean,
    feedback: String,
    questionOrder: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz.questions'
    }]
});

module.exports = mongoose.model('QuizAttempt', quizAttemptSchema);