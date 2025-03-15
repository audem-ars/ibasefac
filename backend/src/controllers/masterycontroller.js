const Mastery = require('../models/mastery');
const QuizAttempt = require('../models/quizattempt');
const LearningPattern = require('../models/learningpattern');

exports.updateMastery = async (userId, skillData) => {
    try {
        let mastery = await Mastery.findOne({ userId });
        if (!mastery) {
            mastery = new Mastery({ userId });
        }

        const { skillName, score, activity } = skillData;
        let skill = mastery.skills.find(s => s.name === skillName);

        if (!skill) {
            skill = {
                name: skillName,
                category: skillData.category,
                level: 0,
                progress: { currentXP: 0, nextLevelXP: 100 },
                proficiency: 'novice',
                history: [],
                decayRate: 0.1
            };
            mastery.skills.push(skill);
        }

        // Update skill progress
        const xpGained = calculateXPGain(score, skill.level);
        skill.progress.currentXP += xpGained;

        // Check for level up
        while (skill.progress.currentXP >= skill.progress.nextLevelXP) {
            skill.progress.currentXP -= skill.progress.nextLevelXP;
            skill.level += 1;
            skill.progress.nextLevelXP = calculateNextLevelXP(skill.level);
        }

        // Update proficiency
        skill.proficiency = calculateProficiency(skill.level);

        // Add to history
        skill.history.push({
            date: new Date(),
            score,
            activity
        });

        skill.lastPracticed = new Date();

        // Update mastery metrics
        await updateMasteryMetrics(mastery);

        await mastery.save();
        return mastery;
    } catch (err) {
        console.error('Error updating mastery:', err);
        throw err;
    }
};

exports.updateMilestone = async (userId, milestoneData) => {
    try {
        const mastery = await Mastery.findOne({ userId });
        const { milestoneName, skills } = milestoneData;

        const milestone = mastery.learningPath.milestones.find(m => m.name === milestoneName);
        if (milestone) {
            let completedSkills = 0;
            milestone.skills.forEach(skill => {
                const userSkill = mastery.skills.find(s => s._id.equals(skill.skillId));
                if (userSkill && userSkill.level >= skill.requiredLevel) {
                    completedSkills++;
                }
            });

            const completionPercentage = (completedSkills / milestone.skills.length) * 100;
            if (completionPercentage === 100) {
                milestone.status = 'completed';
                milestone.completedAt = new Date();
            } else {
                milestone.status = 'in_progress';
            }

            mastery.learningPath.currentMilestone = {
                name: milestoneName,
                completionPercentage
            };
        }

        await mastery.save();
        return milestone;
    } catch (err) {
        console.error('Error updating milestone:', err);
        throw err;
    }
};

exports.generatePracticeSchedule = async (userId) => {
    try {
        const mastery = await Mastery.findOne({ userId });
        const schedule = [];

        mastery.skills.forEach(skill => {
            const daysSinceLastPractice = calculateDaysSince(skill.lastPracticed);
            const decayedLevel = calculateDecayedLevel(skill.level, daysSinceLastPractice, skill.decayRate);
            
            if (decayedLevel < skill.level) {
                schedule.push({
                    skillId: skill._id,
                    recommendedDate: calculateRecommendedPracticeDate(daysSinceLastPractice, skill.level),
                    priority: calculatePracticePriority(skill.level, decayedLevel)
                });
            }
        });

        mastery.practiceSchedule = schedule;
        await mastery.save();
        return schedule;
    } catch (err) {
        console.error('Error generating practice schedule:', err);
        throw err;
    }
};

// Helper functions
const calculateXPGain = (score, currentLevel) => {
    return Math.round(score * (1 + currentLevel * 0.1));
};

const calculateNextLevelXP = (level) => {
    return Math.round(100 * Math.pow(1.2, level));
};

const calculateProficiency = (level) => {
    if (level >= 90) return 'master';
    if (level >= 70) return 'expert';
    if (level >= 50) return 'advanced';
    if (level >= 30) return 'intermediate';
    return 'novice';
};

const updateMasteryMetrics = async (mastery) => {
    // Calculate overall progress
    const totalLevels = mastery.skills.reduce((sum, skill) => sum + skill.level, 0);
    const maxPossibleLevel = mastery.skills.length * 100;
    mastery.masteryMetrics.overallProgress = (totalLevels / maxPossibleLevel) * 100;

    // Update weakest and strongest skills
    const sortedSkills = [...mastery.skills].sort((a, b) => a.level - b.level);
    mastery.masteryMetrics.weakestSkills = sortedSkills.slice(0, 3).map(s => ({
        skillId: s._id,
        level: s.level
    }));
    mastery.masteryMetrics.strongestSkills = sortedSkills.slice(-3).map(s => ({
        skillId: s._id,
        level: s.level
    }));
};

const calculateDaysSince = (date) => {
    return Math.floor((Date.now() - date) / (1000 * 60 * 60 * 24));
};

const calculateDecayedLevel = (level, days, decayRate) => {
    return Math.max(0, level - (days * decayRate));
};

const calculateRecommendedPracticeDate = (daysSinceLastPractice, level) => {
    const baseInterval = Math.max(1, Math.floor(level / 10));
    const recommendedDays = Math.max(1, baseInterval - daysSinceLastPractice);
    const date = new Date();
    date.setDate(date.getDate() + recommendedDays);
    return date;
};

const calculatePracticePriority = (currentLevel, decayedLevel) => {
    const difference = currentLevel - decayedLevel;
    if (difference > 20) return 'high';
    if (difference > 10) return 'medium';
    return 'low';
};