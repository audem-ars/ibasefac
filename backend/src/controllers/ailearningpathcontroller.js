const tf = require('@tensorflow/tfjs');
const Ailearningpath = require('../models/ailearningpath');
const User = require('../models/user');
const Course = require('../models/course');
const Quiz = require('../models/quiz');
const QuizAttempt = require('../models/quizattempt');
const Mastery = require('../models/mastery');
const ProgressAnalytics = require('../models/progressanalytics');
const Successmetrics = require('../models/successmetrics');
const successmetricscontroller = require('./successmetricscontroller');
const Breakthroughs = require('../models/breakthroughs')

let model = null;
let initialized = false;

const initializeModel = async () => {
    if (initialized) return;

    model = tf.sequential();
    
    model.add(tf.layers.dense({
        inputShape: [20],
        units: 64,
        activation: 'relu'
    }));

    model.add(tf.layers.dropout(0.2));

    model.add(tf.layers.dense({
        units: 32,
        activation: 'relu'
    }));

    model.add(tf.layers.dense({
        units: 10,
        activation: 'softmax'
    }));

    model.compile({
        optimizer: 'adam',
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
    });

    initialized = true;
};

const ensureModelInitialized = async () => {
    if (!initialized) {
        await initializeModel();
    }
    return model !== null;
};

const optimizeSpeed = async (userId) => {
    try {
        // Ensure model is ready
        const modelReady = await ensureModelInitialized();
        const learningPath = await Ailearningpath.findOne({ userId });
        const performance = await analyzeUserPerformance(userId);
        const breakthroughs = await Breakthroughs.find({ userId });
        
        let predictionArray = [Array(10).fill(0.5)]; // Default predictions
        
        if (modelReady) {
            const featureVector = await generateFeatureVector(userId);
            const prediction = model.predict(featureVector);
            predictionArray = await prediction.array();
        }
        
        const speedBlocking = identifySpeedBlockers(breakthroughs, performance);
        
        return {
            currentPace: analyzeCurrentPace(learningPath, performance),
            recommendations: [
                {
                    type: 'practice_optimization',
                    focus: speedBlocking.mainBlocker,
                    exercises: generateSpeedExercises(speedBlocking, predictionArray[0])
                },
                {
                    type: 'concept_acceleration',
                    techniques: ['spaced_repetition', 'active_recall'],
                    implementation: buildAccelerationPlan(learningPath, performance)
                }
            ],
            adaptiveMetrics: {
                currentPerformance: performance,
                predictedOptimization: predictionArray[0],
                confidenceScore: calculateConfidenceScore(performance)
            }
        };
    } catch (error) {
        console.error('Error in speed optimization:', error);
        throw error;
    }
};

const identifySpeedBlockers = (breakthroughs, performance) => {
    try {
        const blockers = (breakthroughs || []).reduce((acc, breakthrough) => {
            const category = breakthrough.category || 'practice';
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {});

        return {
            mainBlocker: Object.keys(blockers).length > 0 ? 
                Object.keys(blockers).reduce((a, b) => blockers[a] > blockers[b] ? a : b) : 
                'practice',
            patterns: blockers,
            performanceImpact: calculatePerformanceImpact(performance)
        };
    } catch (error) {
        console.error('Error in identifySpeedBlockers:', error);
        return {
            mainBlocker: 'practice',
            patterns: {},
            performanceImpact: calculatePerformanceImpact(performance)
        };
    }
};

const analyzeCurrentPace = (learningPath, performance) => {
    try {
        if (!learningPath) return { pace: 'normal', score: 0.5 };
        
        const completionRate = learningPath.pathComponents.reduce((acc, component) => {
            const milestoneCount = component.milestones?.length || 1;
            const completedCount = component.milestones?.filter(m => m.completed)?.length || 0;
            return acc + (completedCount / milestoneCount);
        }, 0) / (learningPath.pathComponents.length || 1);
        
        return {
            pace: completionRate > 0.7 ? 'fast' : completionRate > 0.4 ? 'normal' : 'slow',
            score: completionRate,
            timeSpent: learningPath.lastUpdated ? 
                (Date.now() - new Date(learningPath.lastUpdated).getTime()) / (1000 * 60 * 60) : 0,
            performanceCorrelation: performance.averageScore / (completionRate || 1)
        };
    } catch (error) {
        console.error('Error in analyzeCurrentPace:', error);
        return { pace: 'normal', score: 0.5, timeSpent: 0, performanceCorrelation: 1 };
    }
};

const analyzeUserPerformance = async (userId) => {
    try {
        const quizAttempts = await QuizAttempt.find({ userId }).sort({ createdAt: -1 }).limit(10);
        const mastery = await Mastery.findOne({ userId });
        const progress = await ProgressAnalytics.findOne({ userId });

        return {
            averageScore: quizAttempts.length ? quizAttempts.reduce((acc, attempt) => acc + attempt.score, 0) / quizAttempts.length : 0.5,
            masteryLevel: mastery?.level || 0.5,
            completionRate: progress?.completionRate || 0.5,
            consistencyScore: progress?.consistencyMetric || 0.5
        };
    } catch (error) {
        console.error('Error analyzing user performance:', error);
        return {
            averageScore: 0.5,
            masteryLevel: 0.5,
            completionRate: 0.5,
            consistencyScore: 0.5
        };
    }
};

const generateFeatureVector = async (userId) => {
    try {
        const user = await User.findById(userId);
        const performance = await analyzeUserPerformance(userId);
        
        if (!user) {
            throw new Error('User not found');
        }

        const features = [
            // Learning patterns (5)
            performance.masteryLevel,
            performance.averageScore,
            performance.completionRate,
            performance.consistencyScore,
            0.5,

            // Course progress (5)
            performance.averageScore,
            performance.completionRate,
            0.5,
            0.5,
            performance.consistencyScore,

            // Engagement metrics (5)
            0.5,
            0.5,
            0.5,
            0.5,
            performance.completionRate,

            // Additional metrics (5)
            performance.masteryLevel,
            0.5,
            0.5,
            0.5,
            performance.averageScore
        ];

        return tf.tensor2d([features]).reshape([1, 20]);
    } catch (error) {
        console.error('Error generating feature vector:', error);
        const defaultFeatures = Array(20).fill(0.5);
        return tf.tensor2d([defaultFeatures]).reshape([1, 20]);
    }
};

const matchPeersAndMentors = async (userId, path) => {
    const userMetrics = await Successmetrics.findOne({ 
        userId, 
        pathId: path._id 
    });

    const similarPaths = await Ailearningpath.find({
        userId: { $ne: userId },
        'pathComponents.title': { $in: path.pathComponents.map(c => c.title) }
    }).populate('userId');

    const peerMetrics = await Promise.all(
        similarPaths.map(async p => ({
            path: p,
            metrics: await Successmetrics.findOne({ userId: p.userId, pathId: p._id })
        }))
    );

    return {
        peers: peerMetrics
            .filter(p => Math.abs(
                (p.metrics?.metrics.skillGrowth || 0.5) - 
                (userMetrics?.metrics.skillGrowth || 0.5)
            ) <= 0.2)
            .slice(0, 3)
            .map(p => p.path.userId),
        mentors: peerMetrics
            .filter(p => 
                (p.metrics?.metrics.skillGrowth || 0.5) > 
                (userMetrics?.metrics.skillGrowth || 0.5) + 0.2
            )
            .slice(0, 2)
            .map(p => p.path.userId)
    };
};

const processInterventionTriggers = async (userId, pathId) => {
    const metrics = await Successmetrics.findOne({ userId, pathId });
    const recentQuizzes = await QuizAttempt.find({ userId })
        .sort({ createdAt: -1 })
        .limit(3);

    const triggers = {
        lowPerformance: recentQuizzes.filter(q => q.score < 0.6).length >= 2,
        slowProgress: metrics?.metrics.learningVelocity < 0.4,
        conceptGaps: recentQuizzes.some(q => q.conceptMastery < 0.5),
        stagnation: metrics?.timelineMetrics?.slice(-3).every(m => m.value < 0.4) || false
    };

    return {
        needsIntervention: Object.values(triggers).some(t => t),
        triggers
    };
};

const generatePathComponents = async (userId, predictionArray) => {
    try {
        const courses = await Course.find({}).sort({ difficulty: 1 });
        const userQuizzes = await QuizAttempt.find({ userId });
        
        if (!courses || courses.length === 0) {
            return addMilestonesToPath([
                {
                    title: "Foundations",
                    difficulty: 0.3,
                    estimatedTime: 1800,
                    prerequisites: []
                },
                {
                    title: "Core Concepts",
                    difficulty: 0.5,
                    estimatedTime: 2400,
                    prerequisites: ["Foundations"]
                },
                {
                    title: "Advanced Applications",
                    difficulty: 0.7,
                    estimatedTime: 3600,
                    prerequisites: ["Core Concepts"]
                }
            ]);
        }

        const availableCourses = courses.filter(course => {
            const courseQuizzes = userQuizzes.filter(quiz => 
                quiz.courseId && course._id && 
                quiz.courseId.toString() === course._id.toString()
            );
            return courseQuizzes.length === 0 || courseQuizzes.some(quiz => quiz.score < 0.8);
        });

        if (availableCourses.length === 0) {
            return addMilestonesToPath([
                {
                    title: "Introduction",
                    difficulty: 0.3,
                    estimatedTime: 1800,
                    prerequisites: []
                }
            ]);
        }

        return addMilestonesToPath(
            availableCourses.slice(0, 3).map(course => ({
                title: course.title || "Untitled Course",
                difficulty: course.difficulty || 0.5,
                estimatedTime: course.duration || 1800,
                prerequisites: course.prerequisites || []
            }))
        );

    } catch (error) {
        console.error('Error generating path components:', error);
        return addMilestonesToPath([
            {
                title: "Introduction",
                difficulty: 0.5,
                estimatedTime: 1800,
                prerequisites: []
            }
        ]);
    }
};

const addMilestonesToPath = (pathComponents) => {
    return pathComponents.map(component => ({
        ...component,
        milestones: [
            {
                type: 'quiz',
                requiredScore: 0.7,
                completed: false,
                breakthroughMoment: false
            },
            {
                type: 'practice',
                requiredTime: component.estimatedTime * 0.5,
                completed: false,
                breakthroughMoment: false
            },
            {
                type: 'social',
                requiredInteractions: 3,
                completed: false,
                breakthroughMoment: false
            }
        ]
    }));
};

exports.generatePersonalizedPath = async (req, res) => {
    try {
        await initializeModel();
        const userId = req.user.id;

        const performance = await analyzeUserPerformance(userId);
        const featureVector = await generateFeatureVector(userId);
        const prediction = model.predict(featureVector);
        const predictionArray = await prediction.array();

        const pathComponents = await generatePathComponents(userId, predictionArray);

        const newPath = new Ailearningpath({
            userId,
            pathComponents,
            difficulty: performance.masteryLevel,
            estimatedTimeToComplete: pathComponents.reduce((acc, comp) => acc + comp.estimatedTime, 0),
            prerequisites: [...new Set(pathComponents.flatMap(comp => comp.prerequisites))],
            adaptivityRules: {
                progressionThreshold: 0.8,
                difficultyAdjustmentRate: 0.1,
                minimumMasteryRequired: 0.7
            }
        });

        await newPath.save();
        
        // Initialize success metrics for new path
        await successmetricscontroller.updateSuccessMetrics(userId, newPath._id);

        res.status(201).json(newPath);
    } catch (error) {
        console.error('Error generating personalized path:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.updatePath = async (req, res) => {
    try {
        const { pathId } = req.params;
        const userId = req.user.id;
        
        const path = await Ailearningpath.findById(pathId);
        if (!path) {
            return res.status(404).json({ message: 'Path not found' });
        }

        // Update success metrics
        const successMetrics = await successmetricscontroller.updateSuccessMetrics(userId, pathId);
        
        // Check for interventions
        const { needsIntervention, triggers } = await processInterventionTriggers(userId, pathId);
        
        // Update path difficulty
        const newDifficulty = needsIntervention ? 
            Math.max(path.difficulty - 0.1, 0.3) : 
            Math.min(path.difficulty + (successMetrics.metrics.skillGrowth - 0.5) * 0.2, 0.9);

        // Update peer group
        const { peers, mentors } = await matchPeersAndMentors(userId, path);
        path.peerGroup = { peers, mentors };

        // Add interventions if needed
        if (needsIntervention) {
            path.interventions.push({
                type: 'adaptive',
                timestamp: Date.now(),
                action: 'comprehensive_adjustment',
                details: JSON.stringify(triggers)
            });
        }

        path.difficulty = newDifficulty;
        path.lastUpdated = Date.now();

        await path.save();

        // Return enhanced response
        res.json({
            path,
            successMetrics,
            interventions: needsIntervention ? {
                triggers,
                recommendedActions: [
                    triggers.lowPerformance ? 'Review fundamental concepts' : null,
                    triggers.slowProgress ? 'Schedule mentor session' : null,
                    triggers.conceptGaps ? 'Focus on gap areas' : null,
                    triggers.stagnation ? 'Try alternative learning methods' : null
                ].filter(Boolean)
            } : null
        });
    } catch (error) {
        console.error('Error updating path:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.getPath = async (req, res) => {
    try {
        const path = await Ailearningpath.findById(req.params.pathId);
        if (!path) {
            return res.status(404).json({ message: 'Path not found' });
        }
        res.json(path);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.optimizeSpeed = async (req, res) => {
    try {
        const userId = req.user.id;
        const optimizationPlan = await optimizeSpeed(userId);
        res.json(optimizationPlan);
    } catch (error) {
        console.error('Error in speed optimization:', error);
        res.status(500).json({ 
            message: 'Error optimizing speed',
            error: error.message 
        });
    }
};