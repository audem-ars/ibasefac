const LearningPath = require('../models/learningpath');
const LearningPattern = require('../models/learningpattern');
const EngagementMetrics = require('../models/engagementmetrics');

const optimizeLearningPath = async (userId) => {
    try {
        const [learningPath, learningPattern, engagementMetrics] = await Promise.all([
            LearningPath.findOne({ userId }),
            LearningPattern.findOne({ userId }),
            EngagementMetrics.findOne({ userId })
        ]);

        // Calculate optimal path based on multiple factors
        const pathOptimization = {
            completionProbability: calculateCompletionProbability(learningPattern, engagementMetrics),
            timeEstimates: estimateCompletionTime(learningPattern),
            skillSequencing: determineOptimalSequence(learningPath.skillGraph),
            adaptiveFactors: computeAdaptiveFactors(learningPattern, engagementMetrics)
        };

        // Update predictedPath with optimized sequence
        learningPath.predictedPath = generateOptimizedPath(pathOptimization);
        await learningPath.save();

        return learningPath.predictedPath;
    } catch (err) {
        console.error('Error optimizing learning path:', err);
        throw err;
    }
};

const calculateCompletionProbability = (learningPattern, engagementMetrics) => {
    // Complex probability calculation based on past performance
    const baseProb = learningPattern.learningProfile.learningVelocity.get('averageProgress') || 0.5;
    const engagementFactor = engagementMetrics.completionRate / 100;
    const retentionFactor = learningPattern.hintUsage.effectivenessRate;

    return (baseProb + engagementFactor + retentionFactor) / 3;
};

const estimateCompletionTime = (learningPattern) => {
    // Estimate time needed based on learning patterns
    const baseTime = learningPattern.timePatterns.averageTimePerQuestion;
    const difficultyFactors = {
        beginner: 1,
        intermediate: 1.5,
        advanced: 2
    };

    return Object.entries(baseTime).reduce((acc, [difficulty, time]) => {
        acc[difficulty] = time * difficultyFactors[difficulty];
        return acc;
    }, {});
};

const determineOptimalSequence = (skillGraph) => {
    // Implement topological sort with weighted edges
    const visited = new Set();
    const sequence = [];

    const dfs = (nodeId) => {
        if (visited.has(nodeId)) return;
        visited.add(nodeId);

        const node = skillGraph.nodes.find(n => n._id.equals(nodeId));
        node.prerequisites.forEach(preReq => dfs(preReq));
        sequence.push(nodeId);
    };

    skillGraph.nodes.forEach(node => {
        if (!visited.has(node._id)) {
            dfs(node._id);
        }
    });

    return sequence;
};

const generateOptimizedPath = (optimization) => {
    // Generate final optimized path
    const path = optimization.skillSequencing.map((skillId, index) => ({
        skillId,
        recommendedOrder: index + 1,
        estimatedTimeToMastery: optimization.timeEstimates[skillId] || 0,
        confidence: optimization.completionProbability
    }));

    return path;
};

module.exports = {
    optimizeLearningPath,
    calculateCompletionProbability,
    estimateCompletionTime,
    determineOptimalSequence,
    generateOptimizedPath
};