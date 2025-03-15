const mongoose = require('mongoose');

const codeTestCaseSchema = new mongoose.Schema({
    input: String,
    expectedOutput: String,
    description: String
});

const codeSnippetSchema = new mongoose.Schema({
    startingCode: String,
    testCases: [codeTestCaseSchema],
    language: {
        type: String,
        enum: ['javascript', 'python', 'java'],
        default: 'javascript'
    }
});

const matchingPairSchema = new mongoose.Schema({
    left: String,
    right: String
});

const fillInBlankSchema = new mongoose.Schema({
    text: String,
    blanks: [{
        id: String,
        acceptableAnswers: [String],
        hint: String
    }]
});

const analyticsSchema = new mongoose.Schema({
    totalAttempts: {
        type: Number,
        default: 0
    },
    averageScore: {
        type: Number,
        default: 0
    },
    averageTimeSpent: {
        type: Number,
        default: 0
    },
    questionStats: [{
        questionId: mongoose.Schema.Types.ObjectId,
        timesAttempted: Number,
        timesCorrect: Number,
        averageTimeSpent: Number,
        difficultyRating: Number
    }],
    successRate: {
        type: Number,
        default: 0
    },
    dateAnalytics: [{
        date: Date,
        attempts: Number,
        averageScore: Number
    }]
});

const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    questionType: {
        type: String,
        enum: ['multiple-choice', 'true-false', 'short-answer', 'coding', 'fill-in-blanks', 'matching'],
        required: true
    },
    options: [{
        text: String,
        isCorrect: Boolean
    }],
    codeSnippet: codeSnippetSchema,
    matchingPairs: [matchingPairSchema],
    fillInBlanks: fillInBlankSchema,
    correctAnswer: String,
    points: {
        type: Number,
        default: 1
    },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true
    },
    adaptiveWeight: {
        type: Number,
        default: 1.0
    },
    performanceMetrics: {
        timesAttempted: {
            type: Number,
            default: 0
        },
        timesCorrect: {
            type: Number,
            default: 0
        },
        averageTimeSpent: {
            type: Number,
            default: 0
        },
        difficultyRating: {
            type: Number,
            default: 0
        }
    },
    category: String,
    explanation: String,
    hints: [{
        text: String,
        pointsPenalty: Number
    }]
});

const quizSchema = new mongoose.Schema({
    randomization: {
        enabled: {
            type: Boolean,
            default: true
        },
        questionOrder: {
            type: Boolean,
            default: true
        },
        optionOrder: {
            type: Boolean,
            default: true
        },
        questionSelection: {
            enabled: {
                type: Boolean,
                default: false
            },
            count: {
                type: Number,
                default: null
            }
        }
    },
    adaptiveSettings: {
        enabled: {
            type: Boolean,
            default: true
        },
        initialDifficulty: {
            type: String,
            enum: ['beginner', 'intermediate', 'advanced'],
            default: 'beginner'
        },
        progressionThreshold: {
            type: Number,
            default: 0.8
        },
        regressionThreshold: {
            type: Number,
            default: 0.4
        }
    },
    lessonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course.modules.lessons',
        required: true
    },
    moduleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course.modules',
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    timeLimit: Number,
    passingScore: {
        type: Number,
        default: 70
    },
    questions: [questionSchema],
    analytics: analyticsSchema,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Quiz', quizSchema);