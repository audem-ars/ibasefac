const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'dropped'],
        default: 'active'
    },
    progress: {
        completed: [{
            moduleId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course.modules'
            },
            lessonId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course.modules.lessons'
            },
            completedAt: {
                type: Date,
                default: Date.now
            },
            timeSpent: Number, // in minutes
            attempts: [{
                startedAt: Date,
                completedAt: Date,
                timeSpent: Number,
                required: {
                    minTimeSpent: Number,
                    contentViewed: Boolean,
                    quizScore: Number
                },
                achieved: {
                    timeSpent: Number,
                    contentViewed: Boolean,
                    quizScore: Number
                },
                status: {
                    type: String,
                    enum: ['started', 'completed', 'failed'],
                    default: 'started'
                }
            }]
        }],
        lastAccessed: {
            type: Date,
            default: Date.now
        }
    },
    enrolledAt: {
        type: Date,
        default: Date.now
    },
    completedAt: Date,
    certificate: {
        issued: Boolean,
        issuedAt: Date,
        certificateId: String
    }
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);