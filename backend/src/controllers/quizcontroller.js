const Quiz = require('../models/quiz');
const QuizAttempt = require('../models/quizattempt');
const LearningPattern = require('../models/learningpattern');
const { updateLearningPattern, getPersonalizedQuizSettings } = require('./learningpatterncontroller');
const { updateEngagementMetrics } = require('./engagementcontroller');
const { optimizeLearningPath } = require('./learningpathcontroller');
const interventionController = require('./interventioncontroller');
const { generateRecommendations } = require('./contentrecommendationcontroller');

// Create quiz
exports.createQuiz = async (req, res) => {
    try {
        const { courseId, moduleId, lessonId, title, description, questions, timeLimit, passingScore } = req.body;

        const quiz = new Quiz({
            courseId,
            moduleId,
            lessonId,
            title,
            description,
            questions,
            timeLimit,
            passingScore,
            analytics: {
                totalAttempts: 0,
                averageScore: 0,
                averageTimeSpent: 0,
                questionStats: questions.map(q => ({
                    questionId: q._id,
                    timesAttempted: 0,
                    timesCorrect: 0,
                    averageTimeSpent: 0,
                    difficultyRating: 0
                })),
                successRate: 0,
                dateAnalytics: []
            }
        });

        await quiz.save();
        res.json(quiz);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.startQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.quizId);
        if (!quiz) {
            return res.status(404).json({ msg: 'Quiz not found' });
        }

        // Safety check for questions
        if (!quiz.questions) {
            return res.status(400).json({ msg: 'Quiz has no questions' });
        }

        // Clone questions array
        let preparedQuestions = JSON.parse(JSON.stringify(quiz.questions));

        // Apply adaptive difficulty if enabled
        if (quiz.adaptiveSettings?.enabled) {
            const studentLevel = await calculateStudentLevel(req.user.id, quiz._id);
            const questionCount = quiz.randomization?.questionSelection?.count || preparedQuestions.length;
            preparedQuestions = selectAdaptiveQuestions(preparedQuestions, studentLevel, questionCount);
        }
        // Apply regular randomization if adaptive is disabled
        else if (quiz.randomization?.enabled) {
            // Shuffle all questions
            preparedQuestions = shuffleArray(preparedQuestions);

            // Select subset if enabled
            if (quiz.randomization.questionSelection?.enabled && 
                quiz.randomization.questionSelection?.count &&
                quiz.randomization.questionSelection.count < preparedQuestions.length) {
                preparedQuestions = preparedQuestions.slice(0, quiz.randomization.questionSelection.count);
            }

            // Randomize options if enabled
            if (quiz.randomization.optionOrder) {
                preparedQuestions = preparedQuestions.map(q => {
                    if (q.options && q.options.length > 0) {
                        q.options = shuffleArray(q.options);
                    }
                    return q;
                });
            }
        }

        // Prepare questions for client (remove answers)
        const clientQuestions = preparedQuestions.map(q => ({
            _id: q._id,
            questionText: q.questionText,
            questionType: q.questionType,
            options: q.options ? q.options.map(o => ({
                _id: o._id,
                text: o.text
            })) : [],
            difficulty: q.difficulty, // Include difficulty level
            codeSnippet: q.codeSnippet ? {
                startingCode: q.codeSnippet.startingCode,
                language: q.codeSnippet.language
            } : null,
            matchingPairs: q.matchingPairs ? q.matchingPairs.map(p => ({ left: p.left })) : null,
            fillInBlanks: q.fillInBlanks ? {
                text: q.fillInBlanks.text,
                blanks: q.fillInBlanks.blanks.map(b => ({
                    id: b.id,
                    hint: b.hint
                }))
            } : null
        }));

        // Create attempt
        const attempt = new QuizAttempt({
            quiz: quiz._id,
            student: req.user.id,
            startedAt: Date.now(),
            questionOrder: preparedQuestions.map(q => q._id),
            adaptiveLevel: quiz.adaptiveSettings?.enabled ? await calculateStudentLevel(req.user.id, quiz._id) : null
        });

        await attempt.save();

        res.json({
            attemptId: attempt._id,
            timeLimit: quiz.timeLimit,
            questions: clientQuestions,
            adaptiveLevel: attempt.adaptiveLevel // Include adaptive level in response
        });

    } catch (err) {
        console.error('Error in startQuiz:', err);
        res.status(500).json({ 
            msg: 'Server Error',
            error: err.message
        });
    }
};

// Add this helper function at the bottom of the file
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

exports.submitQuiz = async (req, res) => {
    try {
        const { answers } = req.body;
        const attempt = await QuizAttempt.findById(req.params.attemptId);
        const quiz = await Quiz.findById(attempt.quiz);

        let earnedPoints = 0;
        const gradedAnswers = answers.map(answer => {
            const question = quiz.questions.id(answer.questionId);
            let isCorrect = false;
            let pointsEarned = 0;
            let hintPenalty = 0;

            switch (question.questionType) {
                case 'multiple-choice':
                    const correctOption = question.options.find(o => o.isCorrect);
                    isCorrect = answer.selectedOption === correctOption._id.toString();
                    pointsEarned = isCorrect ? question.points : 0;
                    break;

                case 'coding':
                    try {
                        let userCode = answer.providedAnswer
                            .replace(/\n/g, ' ')
                            .replace(/\s+/g, ' ')
                            .trim();

                        const expectedSolution = 
                            'def relu(x): x = float(x) if x <= 0: return 0 return x';

                        isCorrect = userCode === expectedSolution;
                        
                        console.log('User Code:', userCode);
                        console.log('Expected:', expectedSolution);
                        console.log('Match:', isCorrect);

                        pointsEarned = isCorrect ? question.points : 0;

                    } catch (err) {
                        console.error('Code evaluation error:', err);
                        isCorrect = false;
                        pointsEarned = 0;
                    }
                    break;

                case 'matching':
                    const matchingCorrect = answer.matchingAnswers.filter(pair => {
                        const correctPair = question.matchingPairs.find(p => p.left === pair.left);
                        return correctPair && correctPair.right === pair.right;
                    }).length;
                    const matchingTotal = question.matchingPairs.length;
                    isCorrect = matchingCorrect === matchingTotal;
                    pointsEarned = (matchingCorrect / matchingTotal) * question.points;
                    break;

                case 'fill-in-blanks':
                    const blankCorrect = answer.blanks.filter((blank, index) => {
                        const correctAnswers = question.fillInBlanks.blanks[index].acceptableAnswers;
                        return correctAnswers.some(correct => 
                            correct.toLowerCase() === blank.toLowerCase()
                        );
                    }).length;
                    const blankTotal = question.fillInBlanks.blanks.length;
                    isCorrect = blankCorrect === blankTotal;
                    pointsEarned = (blankCorrect / blankTotal) * question.points;
                    
                    if (answer.hintsUsed?.length > 0) {
                        hintPenalty = answer.hintsUsed.reduce((total, hintIndex) => {
                            return total + (question.hints[hintIndex]?.pointsPenalty || 0);
                        }, 0);
                        pointsEarned = Math.max(0, pointsEarned - hintPenalty);
                    }
                    break;

                default:
                    pointsEarned = 0;
            }

            earnedPoints += pointsEarned;

            return {
                questionId: answer.questionId,
                selectedOption: answer.selectedOption,
                providedAnswer: answer.providedAnswer,
                matchingAnswers: answer.matchingAnswers,
                blanks: answer.blanks,
                isCorrect,
                pointsEarned,
                hintPenalty,
                hintsUsed: answer.hintsUsed
            };
        });

        const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
        const score = (earnedPoints / totalPoints) * 100;
        const passed = score >= quiz.passingScore;

        attempt.answers = gradedAnswers;
        attempt.completedAt = Date.now();
        attempt.timeSpent = (attempt.completedAt - attempt.startedAt) / 1000 / 60;
        attempt.totalPoints = totalPoints;
        attempt.earnedPoints = earnedPoints;
        attempt.score = score;
        attempt.passed = passed;

        await attempt.save();

        // Update learning patterns and engagement metrics
        await updateLearningPattern(req.user.id, attempt._id);
        await updateEngagementMetrics(req.user.id, quiz._id, attempt._id);
        
        // Optimize learning path based on new quiz results
        const optimizedPath = await optimizeLearningPath(req.user.id);

        // Check for struggle points and generate interventions
        const intervention = await interventionController.detectStrugglePoints({
            student: req.user.id,
            quiz: quiz._id,
            answers: gradedAnswers,
            timeSpent: attempt.timeSpent,
            difficulty: quiz.adaptiveSettings?.initialDifficulty || 'beginner'
        }, req.user.id, quiz._id);

        res.json({
            score,
            passed,
            feedback: {
                message: passed ? 'Congratulations! You passed the quiz.' : 'Please review the material and try again.',
                answers: gradedAnswers,
                explanations: gradedAnswers.map(answer => {
                    const question = quiz.questions.id(answer.questionId);
                    return {
                        questionId: answer.questionId,
                        explanation: question.explanation,
                        hints: answer.hintsUsed?.map(index => question.hints[index])
                    };
                }),
                nextSteps: optimizedPath.slice(0, 3),
                intervention: intervention ? {
                    type: intervention.triggerType,
                    recommendedAction: intervention.interventionData.recommendedAction,
                    resources: intervention.interventionData.resources,
                    hints: intervention.interventionData.adaptiveHints
                } : null
            }
        });
        // Generate content recommendations
        const recommendations = await generateRecommendations(req.user.id);

        res.json({
            score,
            passed,
            feedback: {
                message: passed ? 'Congratulations! You passed the quiz.' : 'Please review the material and try again.',
                answers: gradedAnswers,
                explanations: gradedAnswers.map(answer => {
                    const question = quiz.questions.id(answer.questionId);
                    return {
                        questionId: answer.questionId,
                        explanation: question.explanation,
                        hints: answer.hintsUsed?.map(index => question.hints[index])
                    };
                }),
                nextSteps: optimizedPath.slice(0, 3),
                intervention: intervention ? {
                    type: intervention.triggerType,
                    recommendedAction: intervention.interventionData.recommendedAction,
                    resources: intervention.interventionData.resources,
                    hints: intervention.interventionData.adaptiveHints
                } : null,
                recommendations: recommendations.slice(0, 3) // Show top 3 recommendations
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get quiz results
exports.getQuizResults = async (req, res) => {
    try {
        const attempt = await QuizAttempt.findById(req.params.attemptId)
            .populate('quiz', 'title questions');

        res.json(attempt);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get quiz analytics
exports.getQuizAnalytics = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.quizId);
        const attempts = await QuizAttempt.find({ 
            quiz: quiz._id,
            completedAt: { $exists: true }  // Only count completed attempts
        });
        
        // Handle case of no attempts
        const completedAttempts = attempts.length;
        if (completedAttempts === 0) {
            return res.json({
                overview: {
                    totalAttempts: 0,
                    successRate: 0,
                    averageScore: 0,
                    averageTimeSpent: 0
                },
                questionStats: [],
                dateAnalytics: [],
                performanceMetrics: {
                    scoreDistribution: {
                        below50: 0,
                        '50-70': 0,
                        '70-85': 0,
                        above85: 0
                    },
                    timeDistribution: {
                        underTime: 0,
                        normalTime: 0,
                        overTime: 0
                    }
                }
            });
        }

        // Calculate general statistics
        const successfulAttempts = attempts.filter(a => a.passed).length;
        const averageScore = attempts.reduce((acc, curr) => acc + (curr.score || 0), 0) / completedAttempts;
        const averageTimeSpent = attempts.reduce((acc, curr) => acc + (curr.timeSpent || 0), 0) / completedAttempts;

        // Calculate per-question statistics
        const questionStats = quiz.questions.map(question => {
            const questionAttempts = attempts.flatMap(a => 
                a.answers.filter(ans => ans.questionId.toString() === question._id.toString())
            );
            
            const validAttempts = questionAttempts.length || 1; // Prevent division by zero
            
            return {
                questionId: question._id,
                questionText: question.questionText,
                timesAttempted: questionAttempts.length,
                timesCorrect: questionAttempts.filter(a => a.isCorrect).length,
                correctPercentage: (questionAttempts.filter(a => a.isCorrect).length / validAttempts) * 100,
                averagePoints: questionAttempts.reduce((acc, curr) => acc + (curr.pointsEarned || 0), 0) / validAttempts,
                difficulty: question.difficulty,
                averageTimeSpent: attempts.reduce((acc, curr) => {
                    const answer = curr.answers.find(a => a.questionId.toString() === question._id.toString());
                    return acc + (curr.timeSpent || 0);
                }, 0) / validAttempts
            };
        });

        // Calculate time-based analytics
        const timeBasedAnalytics = attempts.reduce((acc, attempt) => {
            const date = attempt.startedAt.toISOString().split('T')[0];
            if (!acc[date]) {
                acc[date] = {
                    attempts: 0,
                    totalScore: 0,
                    totalTime: 0
                };
            }
            acc[date].attempts += 1;
            acc[date].totalScore += attempt.score || 0;
            acc[date].totalTime += attempt.timeSpent || 0;
            return acc;
        }, {});

        const dateAnalytics = Object.entries(timeBasedAnalytics).map(([date, stats]) => ({
            date,
            attempts: stats.attempts,
            averageScore: stats.totalScore / stats.attempts || 0,
            averageTime: stats.totalTime / stats.attempts || 0
        }));

        res.json({
            overview: {
                totalAttempts: completedAttempts,
                successRate: (successfulAttempts / completedAttempts) * 100,
                averageScore: Number(averageScore.toFixed(2)),
                averageTimeSpent: Number(averageTimeSpent.toFixed(2))
            },
            questionStats: questionStats.map(stat => ({
                ...stat,
                correctPercentage: Number(stat.correctPercentage.toFixed(2)),
                averagePoints: Number(stat.averagePoints.toFixed(2)),
                averageTimeSpent: Number(stat.averageTimeSpent.toFixed(2))
            })),
            dateAnalytics: dateAnalytics.map(stat => ({
                ...stat,
                averageScore: Number(stat.averageScore.toFixed(2)),
                averageTime: Number(stat.averageTime.toFixed(2))
            })),
            performanceMetrics: {
                scoreDistribution: {
                    below50: attempts.filter(a => (a.score || 0) < 50).length,
                    '50-70': attempts.filter(a => (a.score || 0) >= 50 && (a.score || 0) < 70).length,
                    '70-85': attempts.filter(a => (a.score || 0) >= 70 && (a.score || 0) < 85).length,
                    above85: attempts.filter(a => (a.score || 0) >= 85).length
                },
                timeDistribution: {
                    underTime: attempts.filter(a => (a.timeSpent || 0) < quiz.timeLimit * 0.5).length,
                    normalTime: attempts.filter(a => (a.timeSpent || 0) >= quiz.timeLimit * 0.5 && (a.timeSpent || 0) <= quiz.timeLimit * 0.8).length,
                    overTime: attempts.filter(a => (a.timeSpent || 0) > quiz.timeLimit * 0.8).length
                }
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Concept Mastery Enhancement
const deepenConceptMastery = async (userId) => {
    try {
        const quizHistory = await QuizAttempt.find({ userId })
            .populate('quiz', 'questions title')
            .sort('-completedAt');

        const conceptualAnalysis = analyzeConceptualWeaknesses(quizHistory);
        const masteryPlan = generateMasteryPlan(conceptualAnalysis);
        
        return {
            conceptMap: conceptualAnalysis.map(concept => ({
                name: concept.name,
                mastery: concept.currentMastery,
                dependencies: concept.prerequisites,
                practicalApplications: generateApplications(concept),
                deepDiveResources: curateLearningResources(concept)
            })),
            recommendations: masteryPlan
        };
    } catch (error) {
        console.error('Error in concept mastery:', error);
        throw error;
    }
};

const analyzeConceptualWeaknesses = (quizHistory) => {
    const conceptStats = {};
    
    quizHistory.forEach(attempt => {
        attempt.answers.forEach((answer, index) => {
            const question = attempt.quiz.questions[index];
            if (!question) return;

            const concept = question.concept || 'general';
            if (!conceptStats[concept]) {
                conceptStats[concept] = {
                    total: 0,
                    correct: 0,
                    attempts: [],
                    timeSpent: 0
                };
            }

            conceptStats[concept].total++;
            if (answer.isCorrect) conceptStats[concept].correct++;
            conceptStats[concept].attempts.push({
                timestamp: attempt.completedAt,
                correct: answer.isCorrect,
                timeSpent: attempt.timeSpent
            });
        });
    });

    return Object.entries(conceptStats).map(([concept, stats]) => ({
        name: concept,
        currentMastery: stats.correct / stats.total,
        attempts: stats.attempts,
        averageTimeSpent: stats.attempts.reduce((acc, cur) => acc + cur.timeSpent, 0) / stats.attempts.length,
        prerequisites: determinePrerequisites(concept),
        masteryTrend: calculateMasteryTrend(stats.attempts)
    }));
};

const generateMasteryPlan = (conceptAnalysis) => {
    return conceptAnalysis.map(concept => ({
        concept: concept.name,
        currentLevel: determineMasteryLevel(concept.currentMastery),
        nextMilestone: calculateNextMilestone(concept),
        recommendations: {
            practice: generatePracticeExercises(concept),
            theory: generateTheoryResources(concept),
            application: generateApplicationExercises(concept)
        },
        timeline: estimateMasteryTimeline(concept)
    }));
};

const determinePrerequisites = (concept) => {
    const prerequisiteMap = {
        'algorithms': ['data_structures', 'programming_basics'],
        'data_structures': ['programming_basics'],
        'machine_learning': ['algorithms', 'statistics'],
        'deep_learning': ['machine_learning', 'mathematics'],
        'programming_basics': []
    };
    return prerequisiteMap[concept] || [];
};

const calculateMasteryTrend = (attempts) => {
    if (attempts.length < 2) return 'stable';
    
    const recent = attempts.slice(-5);
    const successRate = recent.filter(a => a.correct).length / recent.length;
    const previousRate = attempts.slice(-10, -5).filter(a => a.correct).length / 5;

    if (successRate > previousRate + 0.1) return 'improving';
    if (successRate < previousRate - 0.1) return 'declining';
    return 'stable';
};

const determineMasteryLevel = (masteryScore) => {
    if (masteryScore >= 0.9) return 'expert';
    if (masteryScore >= 0.7) return 'advanced';
    if (masteryScore >= 0.5) return 'intermediate';
    return 'beginner';
};

const calculateNextMilestone = (concept) => {
    const currentMastery = concept.currentMastery;
    const masteryLevels = [0.5, 0.7, 0.9, 1.0];
    const nextLevel = masteryLevels.find(level => level > currentMastery);
    
    return {
        target: nextLevel,
        estimatedTime: `${Math.ceil((nextLevel - currentMastery) * 20)} hours`,
        keyIndicators: generateKeyIndicators(nextLevel)
    };
};

const generateKeyIndicators = (targetLevel) => {
    return {
        practiceNeeded: Math.ceil(targetLevel * 10),
        conceptualUnderstanding: targetLevel >= 0.7 ? 'deep' : 'fundamental',
        applicationAbility: targetLevel >= 0.9 ? 'innovative' : 'standard'
    };
};

// Add this to exports
exports.deepenConceptMastery = async (req, res) => {
    try {
        const userId = req.user.id;
        const masteryPlan = await deepenConceptMastery(userId);
        res.json(masteryPlan);
    } catch (error) {
        console.error('Error in concept mastery:', error);
        res.status(500).json({ 
            message: 'Error deepening concept mastery',
            error: error.message 
        });
    }
};

// Helper function to calculate student's current level
async function calculateStudentLevel(userId, quizId) {
    try {
        // Get previous attempts for this quiz
        const previousAttempts = await QuizAttempt.find({
            student: userId,
            quiz: quizId,
            completedAt: { $exists: true }
        }).sort({ completedAt: -1 }).limit(3);

        if (previousAttempts.length === 0) {
            return 'beginner';
        }

        // Calculate average score from recent attempts
        const averageScore = previousAttempts.reduce((acc, attempt) => 
            acc + attempt.score, 0) / previousAttempts.length;

        // Determine level based on average score
        if (averageScore >= 85) return 'advanced';
        if (averageScore >= 70) return 'intermediate';
        return 'beginner';
    } catch (err) {
        console.error('Error calculating student level:', err);
        return 'beginner';
    }
}

// Helper function to select questions based on adaptive difficulty
function selectAdaptiveQuestions(questions, studentLevel, count) {
    // Group questions by difficulty
    const questionsByDifficulty = {
        beginner: questions.filter(q => q.difficulty === 'beginner'),
        intermediate: questions.filter(q => q.difficulty === 'intermediate'),
        advanced: questions.filter(q => q.difficulty === 'advanced')
    };

    let selectedQuestions = [];
    const totalQuestions = count || questions.length;

    // Log for debugging
    console.log('Student Level:', studentLevel);
    console.log('Questions available:', {
        beginner: questionsByDifficulty.beginner.length,
        intermediate: questionsByDifficulty.intermediate.length,
        advanced: questionsByDifficulty.advanced.length
    });

    switch(studentLevel) {
        case 'beginner':
            selectedQuestions = [
                ...shuffleArray(questionsByDifficulty.beginner).slice(0, Math.ceil(totalQuestions * 0.7)),
                ...shuffleArray(questionsByDifficulty.intermediate).slice(0, Math.ceil(totalQuestions * 0.3))
            ];
            break;
        case 'intermediate':
            selectedQuestions = [
                ...shuffleArray(questionsByDifficulty.beginner).slice(0, Math.ceil(totalQuestions * 0.2)),
                ...shuffleArray(questionsByDifficulty.intermediate).slice(0, Math.ceil(totalQuestions * 0.6)),
                ...shuffleArray(questionsByDifficulty.advanced).slice(0, Math.ceil(totalQuestions * 0.2))
            ];
            break;
        case 'advanced':
            selectedQuestions = [
                ...shuffleArray(questionsByDifficulty.intermediate).slice(0, Math.ceil(totalQuestions * 0.3)),
                ...shuffleArray(questionsByDifficulty.advanced).slice(0, Math.ceil(totalQuestions * 0.7))
            ];
            break;
    }

    const final = shuffleArray(selectedQuestions).slice(0, totalQuestions);
    
    // Log selected questions for debugging
    console.log('Selected questions:', final.map(q => ({
        difficulty: q.difficulty,
        questionText: q.questionText
    })));

    return final;
}

async function calculateStudentLevel(userId, quizId) {
    try {
        const previousAttempts = await QuizAttempt.find({
            student: userId,
            quiz: quizId,
            completedAt: { $exists: true }
        }).sort({ completedAt: -1 }).limit(3);

        if (previousAttempts.length === 0) {
            console.log('No previous attempts, returning beginner');
            return 'beginner';
        }

        const averageScore = previousAttempts.reduce((acc, attempt) => 
            acc + attempt.score, 0) / previousAttempts.length;

        console.log('Previous attempts:', previousAttempts.length);
        console.log('Average score:', averageScore);

        if (averageScore >= 85) {
            console.log('Advanced level (score >= 85)');
            return 'advanced';
        }
        if (averageScore >= 70) {
            console.log('Intermediate level (score >= 70)');
            return 'intermediate';
        }
        console.log('Beginner level (score < 70)');
        return 'beginner';
    } catch (err) {
        console.error('Error calculating student level:', err);
        return 'beginner';
    }
}