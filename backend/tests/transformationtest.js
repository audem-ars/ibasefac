const mongoose = require('mongoose');
const Transformation = require('../models/transformation');
const Successmetrics = require('../models/successmetrics');
const transformationcontroller = require('../controllers/transformationcontroller');
const successmetricscontroller = require('../controllers/successmetricscontroller');

// Validation thresholds
const VALIDATION_THRESHOLDS = {
    minTransformationScore: 0.3,
    minValueCreation: 10000,
    minBreakthroughRate: 0.2,
    expectedMultipliers: {
        technical: 1.3,
        mindset: 1.5,
        value: 1.8
    }
};

const testTransformationIntegration = async (userId, pathId) => {
    try {
        // Base metrics test
        const baseMetrics = await successmetricscontroller.updateSuccessMetrics(userId, pathId);
        
        // Transformation calculations test
        const transformationMetrics = await transformationcontroller.updateTransformationMetrics(
            userId, 
            pathId, 
            baseMetrics
        );
        
        // Advanced integration test
        const advancedMetrics = await successmetricscontroller.calculateAdvancedMetrics(userId, pathId, {
            ...baseMetrics,
            transformation: transformationMetrics
        });

        // Enhanced validation
        const validation = validateTransformationResults(
            baseMetrics,
            transformationMetrics,
            advancedMetrics
        );

        return {
            baseMetrics,
            transformationMetrics: transformationMetrics?.metrics,
            advancedMetrics,
            validation
        };
    } catch (error) {
        console.error('Error testing transformation integration:', error);
        throw error;
    }
};

const validateTransformationResults = (baseMetrics, transformationMetrics, advancedMetrics) => {
    const validation = {
        hasTransformation: !!transformationMetrics,
        meetsMinimumRequirements: false,
        valueCreationValid: false,
        multiplierRangesValid: false,
        integrationSuccess: false,
        details: {
            transformationScore: 0,
            valueCreation: 0,
            multipliers: {},
            warnings: []
        }
    };

    if (transformationMetrics) {
        // Validate transformation score
        validation.meetsMinimumRequirements = 
            transformationMetrics.metrics.impact.technicalGrowth >= VALIDATION_THRESHOLDS.minTransformationScore;

        // Validate value creation
        validation.valueCreationValid = 
            transformationMetrics.metrics.value.immediate >= VALIDATION_THRESHOLDS.minValueCreation;

        // Validate multipliers
        const multipliers = advancedMetrics.transformationEnhancement?.valueMultipliers || {};
        validation.multiplierRangesValid = validateMultipliers(multipliers);

        // Store detailed metrics
        validation.details = {
            transformationScore: transformationMetrics.metrics.impact.technicalGrowth,
            valueCreation: transformationMetrics.metrics.value.immediate,
            multipliers: multipliers,
            warnings: generateWarnings(transformationMetrics, advancedMetrics)
        };

        // Overall integration success
        validation.integrationSuccess = 
            validation.meetsMinimumRequirements && 
            validation.valueCreationValid && 
            validation.multiplierRangesValid;
    }

    return validation;
};

const validateMultipliers = (multipliers) => {
    return (
        multipliers.technical >= VALIDATION_THRESHOLDS.expectedMultipliers.technical &&
        multipliers.mindset >= VALIDATION_THRESHOLDS.expectedMultipliers.mindset &&
        multipliers.value >= VALIDATION_THRESHOLDS.expectedMultipliers.value
    );
};

const generateWarnings = (transformationMetrics, advancedMetrics) => {
    const warnings = [];

    if (transformationMetrics.metrics.impact.technicalGrowth < VALIDATION_THRESHOLDS.minTransformationScore) {
        warnings.push('Technical growth below minimum threshold');
    }

    if (transformationMetrics.metrics.value.immediate < VALIDATION_THRESHOLDS.minValueCreation) {
        warnings.push('Value creation below minimum threshold');
    }

    if (!advancedMetrics.transformationEnhancement) {
        warnings.push('Missing transformation enhancement metrics');
    }

    return warnings;
};

// Comprehensive test cases
const runTransformationTests = async () => {
    const testCases = [
        {
            userId: '123',
            pathId: '456',
            description: 'New user transformation',
            expectedResults: {
                minTransformationScore: 0.3,
                minValueCreation: 10000
            }
        },
        {
            userId: '789',
            pathId: '012',
            description: 'Advanced user transformation',
            expectedResults: {
                minTransformationScore: 0.6,
                minValueCreation: 25000
            }
        },
        {
            userId: '345',
            pathId: '678',
            description: 'Enterprise user transformation',
            expectedResults: {
                minTransformationScore: 0.7,
                minValueCreation: 50000
            }
        }
    ];

    const testResults = {
        passed: 0,
        failed: 0,
        details: []
    };

    for (const testCase of testCases) {
        console.log(`\nRunning test: ${testCase.description}`);
        try {
            const results = await testTransformationIntegration(
                testCase.userId,
                testCase.pathId
            );
            
            const testPassed = validateTestCase(results, testCase.expectedResults);
            
            testResults.details.push({
                description: testCase.description,
                passed: testPassed,
                results: results.validation
            });

            testResults[testPassed ? 'passed' : 'failed']++;
            
            console.log(`Test ${testPassed ? 'PASSED' : 'FAILED'}: ${testCase.description}`);
            console.log('Results:', JSON.stringify(results.validation, null, 2));
        } catch (error) {
            console.error(`Test failed for ${testCase.description}:`, error);
            testResults.failed++;
            testResults.details.push({
                description: testCase.description,
                passed: false,
                error: error.message
            });
        }
    }

    console.log('\nTest Summary:', JSON.stringify(testResults, null, 2));
    return testResults;
};

const validateTestCase = (results, expectedResults) => {
    return (
        results.validation.hasTransformation &&
        results.transformationMetrics.impact.technicalGrowth >= expectedResults.minTransformationScore &&
        results.transformationMetrics.value.immediate >= expectedResults.minValueCreation
    );
};

module.exports = {
    testTransformationIntegration,
    runTransformationTests,
    VALIDATION_THRESHOLDS
};