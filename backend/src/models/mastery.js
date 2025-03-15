const mongoose = require('mongoose');

const masterySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    skills: [{
        name: String,
        category: String,
        level: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },
        progress: {
            currentXP: { type: Number, default: 0 },
            nextLevelXP: { type: Number, default: 100 }
        },
        proficiency: {
            type: String,
            enum: ['novice', 'intermediate', 'advanced', 'expert', 'master'],
            default: 'novice'
        },
        history: [{
            date: Date,
            score: Number,
            activity: String
        }],
        prerequisites: [{
            skillId: mongoose.Schema.Types.ObjectId,
            requiredLevel: Number
        }],
        lastPracticed: Date,
        decayRate: Number
    }],
    learningPath: {
        currentMilestone: {
            name: String,
            completionPercentage: Number,
            deadline: Date
        },
        milestones: [{
            name: String,
            skills: [{
                skillId: mongoose.Schema.Types.ObjectId,
                requiredLevel: Number
            }],
            completedAt: Date,
            status: {
                type: String,
                enum: ['pending', 'in_progress', 'completed'],
                default: 'pending'
            }
        }]
    },
    masteryMetrics: {
        overallProgress: Number,
        weakestSkills: [{
            skillId: mongoose.Schema.Types.ObjectId,
            level: Number
        }],
        strongestSkills: [{
            skillId: mongoose.Schema.Types.ObjectId,
            level: Number
        }],
        recentImprovements: [{
            skillId: mongoose.Schema.Types.ObjectId,
            improvement: Number,
            date: Date
        }]
    },
    practiceSchedule: [{
        skillId: mongoose.Schema.Types.ObjectId,
        recommendedDate: Date,
        priority: {
            type: String,
            enum: ['low', 'medium', 'high'],
            default: 'medium'
        }
    }]
});

module.exports = mongoose.model('Mastery', masterySchema);