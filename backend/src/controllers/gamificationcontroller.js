const Gamification = require('../models/gamification');
const QuizAttempt = require('../models/quizattempt');

exports.updateExperience = async (userId, actionType, value) => {
    try {
        let userGame = await Gamification.findOne({ userId });
        if (!userGame) {
            userGame = new Gamification({ userId });
        }

        // Calculate experience gain with multipliers
        const baseExperience = calculateExperience(actionType, value);
        const multiplier = userGame.streaks.multiplier;
        const totalExperience = Math.round(baseExperience * multiplier);

        // Update experience and check for level up
        userGame.level.experience += totalExperience;
        while (userGame.level.experience >= userGame.level.nextLevelAt) {
            userGame.level.experience -= userGame.level.nextLevelAt;
            userGame.level.current += 1;
            userGame.level.nextLevelAt = calculateNextLevelExperience(userGame.level.current);
        }

        await userGame.save();
        return userGame;
    } catch (err) {
        console.error('Error updating experience:', err);
        throw err;
    }
};

exports.checkAchievements = async (userId, action) => {
    try {
        const userGame = await Gamification.findOne({ userId });
        const newAchievements = [];

        // Check different achievement types based on action
        switch (action.type) {
            case 'quiz_completion':
                await checkQuizAchievements(userGame, action.data);
                break;
            case 'streak_update':
                await checkStreakAchievements(userGame);
                break;
            case 'social_interaction':
                await checkSocialAchievements(userGame, action.data);
                break;
            case 'learning_progress':
                await checkProgressAchievements(userGame, action.data);
                break;
        }

        await userGame.save();
        return newAchievements;
    } catch (err) {
        console.error('Error checking achievements:', err);
        throw err;
    }
};

exports.updateStreak = async (userId) => {
    try {
        const userGame = await Gamification.findOne({ userId });
        const now = new Date();
        const lastActive = userGame.streaks.lastActive;

        if (lastActive) {
            const daysSinceLastActive = Math.floor((now - lastActive) / (1000 * 60 * 60 * 24));
            
            if (daysSinceLastActive === 1) {
                // Maintain streak
                userGame.streaks.currentStreak += 1;
                if (userGame.streaks.currentStreak > userGame.streaks.longestStreak) {
                    userGame.streaks.longestStreak = userGame.streaks.currentStreak;
                }
            } else if (daysSinceLastActive > 1) {
                // Break streak
                userGame.streaks.currentStreak = 1;
            }
        } else {
            // First activity
            userGame.streaks.currentStreak = 1;
        }

        userGame.streaks.lastActive = now;
        userGame.streaks.multiplier = calculateStreakMultiplier(userGame.streaks.currentStreak);

        await userGame.save();
        return userGame.streaks;
    } catch (err) {
        console.error('Error updating streak:', err);
        throw err;
    }
};

exports.updateChallenges = async (userId) => {
    try {
        const userGame = await Gamification.findOne({ userId });
        const now = new Date();

        // Update expired challenges
        userGame.challenges = userGame.challenges.map(challenge => {
            if (challenge.status === 'active' && challenge.endDate < now) {
                challenge.status = 'expired';
            }
            return challenge;
        });

        // Generate new challenges if needed
        if (userGame.challenges.filter(c => c.status === 'active').length < 3) {
            const newChallenges = generateDailyChallenges(userGame.level.current);
            userGame.challenges.push(...newChallenges);
        }

        await userGame.save();
        return userGame.challenges.filter(c => c.status === 'active');
    } catch (err) {
        console.error('Error updating challenges:', err);
        throw err;
    }
};

// Helper functions
const calculateExperience = (actionType, value) => {
    const baseValues = {
        quiz_completion: 50,
        streak_day: 10,
        challenge_completion: 100,
        help_others: 25
    };
    return baseValues[actionType] || 0;
};

const calculateNextLevelExperience = (level) => {
    return Math.floor(100 * Math.pow(1.1, level));
};

const calculateStreakMultiplier = (streakDays) => {
    return Math.min(1 + (streakDays * 0.1), 2.0);
};

const generateDailyChallenges = (userLevel) => {
    // Generate appropriate challenges based on user level
    return [];
};

const checkQuizAchievements = async (userGame, quizData) => {
    // Implement quiz-related achievement checks
};

const checkStreakAchievements = async (userGame) => {
    // Implement streak-related achievement checks
};

const checkSocialAchievements = async (userGame, socialData) => {
    // Implement social interaction achievement checks
};

const checkProgressAchievements = async (userGame, progressData) => {
    // Implement learning progress achievement checks
};