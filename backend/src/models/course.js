const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
    },
    modules: [{
        title: String,
        description: String,
        content: String,
        order: Number,
        lessons: [{
            title: String,
            content: String,
            order: Number,
            type: {
                type: String,
                enum: ['video', 'text', 'quiz', 'exercise'],
                default: 'text'
            },
            duration: Number, // in minutes
            resources: [{
                title: String,
                type: String,
                url: String
            }]
        }]
    }],
    category: {
        type: String,
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    enrolledStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Course', courseSchema);