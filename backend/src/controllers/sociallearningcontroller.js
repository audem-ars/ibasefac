const SocialLearning = require('../models/sociallearning');
const QuizAttempt = require('../models/quizattempt');
const LearningPattern = require('../models/learningpattern');

exports.createOrJoinStudyGroup = async (userId, groupData) => {
    try {
        let socialLearning = await SocialLearning.findOne({ userId });
        
        if (!socialLearning) {
            socialLearning = new SocialLearning({ userId });
        }

        socialLearning.studyGroup = {
            ...groupData,
            members: [...(groupData.members || []), { userId, role: 'member' }]
        };

        await socialLearning.save();
        return socialLearning.studyGroup;
    } catch (err) {
        console.error('Error in study group operation:', err);
        throw err;
    }
};

exports.startCollaboration = async (userId, collaborationType, participants, content) => {
    try {
        const socialLearning = await SocialLearning.findOne({ userId });
        
        const newCollaboration = {
            type: collaborationType,
            participants: participants.map(p => ({ userId: p, contribution: 0 })),
            content: {
                ...content,
                status: 'active'
            },
            metrics: {
                engagement: 0,
                quality: 0,
                helpfulness: 0
            },
            timestamps: {
                created: new Date(),
                lastActive: new Date()
            }
        };

        socialLearning.collaborations.push(newCollaboration);
        await socialLearning.save();

        return newCollaboration;
    } catch (err) {
        console.error('Error starting collaboration:', err);
        throw err;
    }
};

exports.submitPeerAssessment = async (assessorId, assesseeId, quizId, feedback, rating) => {
    try {
        const socialLearning = await SocialLearning.findOne({ userId: assessorId });
        
        const newAssessment = {
            assessorId,
            assesseeId,
            quizId,
            feedback,
            rating,
            helpfulVotes: 0,
            timestamp: new Date()
        };

        socialLearning.peerAssessments.push(newAssessment);
        await socialLearning.save();

        // Update learner's metrics
        await updateLearnerMetrics(assesseeId, rating, feedback);

        return newAssessment;
    } catch (err) {
        console.error('Error submitting peer assessment:', err);
        throw err;
    }
};

const updateLearnerMetrics = async (userId, rating, feedback) => {
    try {
        const learningPattern = await LearningPattern.findOne({ userId });
        
        // Update learning metrics based on peer feedback
        learningPattern.learningProfile.peerFeedback = {
            lastRating: rating,
            feedbackCount: (learningPattern.learningProfile.peerFeedback?.feedbackCount || 0) + 1,
            averageRating: calculateNewAverage(
                learningPattern.learningProfile.peerFeedback?.averageRating || 0,
                learningPattern.learningProfile.peerFeedback?.feedbackCount || 0,
                rating
            )
        };

        await learningPattern.save();
    } catch (err) {
        console.error('Error updating learner metrics:', err);
        throw err;
    }
};

const calculateNewAverage = (oldAverage, count, newValue) => {
    return ((oldAverage * count) + newValue) / (count + 1);
};

exports.unlockAchievement = async (userId, achievementType, level) => {
    try {
        const socialLearning = await SocialLearning.findOne({ userId });
        
        const newAchievement = {
            type: achievementType,
            level,
            earnedAt: new Date(),
            sharedWith: []
        };

        socialLearning.achievements.push(newAchievement);
        await socialLearning.save();

        return newAchievement;
    } catch (err) {
        console.error('Error unlocking achievement:', err);
        throw err;
    }
};