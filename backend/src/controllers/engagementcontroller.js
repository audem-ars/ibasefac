const EngagementMetrics = require('../models/engagementmetrics');
const QuizAttempt = require('../models/quizattempt');

exports.updateEngagementMetrics = async (userId, quizId, attemptId) => {
    try {
        const attempt = await QuizAttempt.findById(attemptId);
        let metrics = await EngagementMetrics.findOne({ userId, quizId });

        if (!metrics) {
            metrics = new EngagementMetrics({ userId, quizId });
        }

        // Update struggle points
        const struggleThreshold = 120; // 2 minutes per question
        attempt.answers.forEach(answer => {
            if ((answer.timeSpent > struggleThreshold) || 
                (answer.hintsUsed && answer.hintsUsed.length > 0) || 
                !answer.isCorrect) {
                metrics.strugglePoints.push({
                    questionId: answer.questionId,
                    timeSpent: answer.timeSpent,
                    attempts: 1,
                    hintsUsed: answer.hintsUsed ? answer.hintsUsed.length : 0
                });
            }
        });

        // Update session data
        metrics.sessionData.push({
            startTime: attempt.startedAt,
            endTime: attempt.completedAt,
            questionsAttempted: attempt.answers.length,
            questionsCompleted: attempt.answers.filter(a => a.isCorrect).length,
            averageTimePerQuestion: attempt.timeSpent / attempt.answers.length
        });

        // Update overall metrics
        metrics.completionRate = (metrics.sessionData.reduce((acc, session) => 
            acc + (session.questionsCompleted / session.questionsAttempted), 0) / 
            metrics.sessionData.length) * 100;

        metrics.averageTimeEngaged = metrics.sessionData.reduce((acc, session) =>
            acc + (session.endTime - session.startTime), 0) / metrics.sessionData.length;

        metrics.returnRate = metrics.sessionData.length > 1 ? 
            (metrics.sessionData.length / (Date.now() - metrics.sessionData[0].startTime)) * 86400000 : 0;

        metrics.overallProgress.totalQuizzesTaken++;
        metrics.overallProgress.totalTimeSpent += attempt.timeSpent;
        metrics.overallProgress.completionTrend.push({
            date: new Date(),
            completionRate: (attempt.answers.filter(a => a.isCorrect).length / attempt.answers.length) * 100
        });

        await metrics.save();
        return metrics;
    } catch (err) {
        console.error('Error updating engagement metrics:', err);
        throw err;
    }
};

exports.getEngagementInsights = async (userId, quizId) => {
    try {
        const metrics = await EngagementMetrics.findOne({ userId, quizId });
        if (!metrics) {
            return null;
        }

        return {
            overview: {
                completionRate: metrics.completionRate,
                averageTimeEngaged: metrics.averageTimeEngaged,
                returnRate: metrics.returnRate,
                totalQuizzesTaken: metrics.overallProgress.totalQuizzesTaken
            },
            struggleAreas: metrics.strugglePoints.reduce((acc, point) => {
                if (!acc[point.questionId]) {
                    acc[point.questionId] = {
                        timeSpent: 0,
                        attempts: 0,
                        hintsUsed: 0
                    };
                }
                acc[point.questionId].timeSpent += point.timeSpent;
                acc[point.questionId].attempts += point.attempts;
                acc[point.questionId].hintsUsed += point.hintsUsed;
                return acc;
            }, {}),
            progressTrend: metrics.overallProgress.completionTrend
        };
    } catch (err) {
        console.error('Error getting engagement insights:', err);
        throw err;
    }
};