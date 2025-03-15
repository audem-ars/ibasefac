const Successmetrics = require('../models/successmetrics');
const QuizAttempt = require('../models/quizattempt');
const Ailearningpath = require('../models/ailearningpath');
const ProgressAnalytics = require('../models/progressanalytics');
const careeroutcomescontroller = require('./careeroutcomescontroller');
const breakthroughcontroller = require('./breakthroughcontroller');
const enterpriseAnalytics = require('./enterpriseanalyticscontroller');
const Transformation = require('../models/transformation');

exports.getAnalyticsDashboard = async () => {
    try {
        // Return structured mock data
        return {
            peaklearningtimes: [
                { time: '9AM', count: 120 },
                { time: '2PM', count: 150 },
                { time: '7PM', count: 90 }
            ],
            preferredcontenttypes: [
                { type: 'Video', percentage: 45 },
                { type: 'Interactive', percentage: 30 },
                { type: 'Reading', percentage: 25 }
            ],
            learningstyles: [
                { style: 'Visual', count: 250 },
                { style: 'Auditory', count: 150 },
                { style: 'Kinesthetic', count: 100 }
            ],
            interventiontypes: [
                { type: 'Quiz Review', count: 50 },
                { type: 'Practice Sessions', count: 75 },
                { type: 'Peer Study', count: 45 }
            ],
            recommendationsuccess: { 
                rate: 85, 
                total: 100 
            },
            atriskstudents: [],
            successpredictions: []
        };
    } catch (error) {
        console.error('Error in getAnalyticsDashboard:', error);
        throw error;
    }
};

exports.getDashboardMetrics = async () => {
    try {
        return {
            peaklearningtimes: [
                { time: '9AM', count: 120 },
                { time: '2PM', count: 150 },
                { time: '7PM', count: 90 }
            ],
            preferredcontenttypes: [
                { type: 'Video', percentage: 45 },
                { type: 'Interactive', percentage: 30 },
                { type: 'Reading', percentage: 25 }
            ],
            learningstyles: [
                { style: 'Visual', count: 250 },
                { style: 'Auditory', count: 150 },
                { style: 'Kinesthetic', count: 100 }
            ],
            interventiontypes: [
                { type: 'Quiz Review', count: 50 },
                { type: 'Practice Sessions', count: 75 },
                { type: 'Peer Study', count: 45 }
            ],
            recommendationsuccess: { 
                rate: 85, 
                total: 100 
            },
            atriskstudents: [
                // Mock data for at-risk students
            ],
            successpredictions: [
                // Mock data for success predictions
            ]
        };
    } catch (error) {
        console.error('Error in getDashboardMetrics:', error);
        throw error;
    }
};

// Advanced Market Intelligence
const MARKET_DYNAMICS = {
    'AI Development': {
        baseValue: 150000,
        growthRate: 0.25,
        demandMultiplier: 1.8,
        scarcityBonus: 0.3,
        enterpriseImpact: 2.1,
        marketPenetration: 0.7,
        innovationFactor: 1.5
    },
    'Machine Learning': {
        baseValue: 140000,
        growthRate: 0.22,
        demandMultiplier: 1.7,
        scarcityBonus: 0.25,
        enterpriseImpact: 1.9,
        marketPenetration: 0.65,
        innovationFactor: 1.4
    },
    'Data Science': {
        baseValue: 130000,
        growthRate: 0.20,
        demandMultiplier: 1.6,
        scarcityBonus: 0.2,
        enterpriseImpact: 1.8,
        marketPenetration: 0.8,
        innovationFactor: 1.3
    }
};

const TRANSFORMATION_DRIVERS = {
    breakthroughFactors: {
        mindsetShift: { value: 25000, probability: 0.4 },
        careerLeap: { value: 50000, probability: 0.3 },
        ventureCreation: { value: 100000, probability: 0.2 },
        industryDisruption: { value: 250000, probability: 0.1 }
    },
    alignmentMetrics: {
        purposeDiscovery: { baseValue: 15000, multiplier: 2.5 },
        potentialUnlocking: { baseValue: 20000, multiplier: 3.0 },
        visionManifestation: { baseValue: 30000, multiplier: 2.8 }
    },
    transformationLevels: {
        individual: {
            breakthrough: { value: 10000, compound: 1.8 },
            mastery: { value: 20000, compound: 2.2 },
            transcendence: { value: 40000, compound: 3.0 }
        },
        organizational: {
            culturalShift: { value: 100000, rippleEffect: 2.5 },
            innovationLeap: { value: 200000, rippleEffect: 3.0 },
            marketDisruption: { value: 500000, rippleEffect: 4.0 }
        }
    },
    accelerationFactors: {
        rapidBreakthrough: 2.5,
        compoundedGrowth: 1.8,
        exponentialImpact: 3.0,
        legacyCreation: 4.0
    }
};

// Real-World Revenue Drivers
const REVENUE_DRIVERS = {
    enterpriseContracts: {
        small: { seats: 100, pricePerSeat: 199, conversionRate: 0.15 },  // $19,900/contract
        medium: { seats: 500, pricePerSeat: 179, conversionRate: 0.08 }, // $89,500/contract
        large: { seats: 2000, pricePerSeat: 159, conversionRate: 0.02 }  // $318,000/contract
    },
    learningOutcomes: {
        skillCertification: { value: 2500, completionRate: 0.4 },
        careerAdvancement: { value: 5000, achievementRate: 0.3 },
        teamUpskilling: { value: 15000, adoptionRate: 0.25 }
    },
    platformScaling: {
        monthlyUserGrowth: 0.15,        // 15% monthly growth
        userRetention: 0.92,            // 92% retention
        referralRate: 0.2,              // 20% user referrals
        enterpriseUpsell: 0.3           // 30% enterprise upsell
    },
    revenueStreams: {
        subscriptions: { base: 99, premium: 199, enterprise: 299 },
        certifications: { basic: 499, advanced: 999, expert: 1999 },
        teamLicenses: { startup: 4999, growth: 9999, enterprise: 24999 },
        consulting: { implementation: 15000, customization: 25000 }
    }
};

// Enhanced Value Generation Constants
const REVENUE_ACCELERATORS = {
    enterpriseConversion: 0.4,    // 40% enterprise client conversion
    averageContractValue: 100000, // $100K average enterprise contract
    userGrowthRate: 0.15,        // 15% monthly user growth
    revenueRetention: 0.95,      // 95% revenue retention
    upsellMultiplier: 1.4,       // 40% upsell opportunity
    platformScaling: {
        phase1: { users: 1000, revenuePerUser: 99 },    // Initial phase
        phase2: { users: 5000, revenuePerUser: 199 },   // Growth phase
        phase3: { users: 20000, revenuePerUser: 299 },  // Scale phase
        phase4: { users: 50000, revenuePerUser: 399 }   // Enterprise phase
    }
};

const VALUE_OPTIMIZATION = {
    userAcquisition: {
        cost: 50,                // CAC
        lifetime: 24,            // 24 month average lifetime
        referralRate: 0.2        // 20% referral rate
    },
    revenueOptimization: {
        baseMRR: 250000,         // Starting Monthly Recurring Revenue
        growthRate: 0.12,        // 12% monthly growth
        enterpriseUplift: 2.5    // Enterprise revenue multiplier
    },
    scalingMetrics: {
        userRetention: 0.92,     // 92% user retention
        revenuePerUser: {
            basic: 99,
            premium: 199,
            enterprise: 999
        }
    }
};

// Enterprise Value Metrics
const BUSINESS_IMPACT_FACTORS = {
    productivityMultiplier: 1.5,
    innovationBonus: 0.3,
    teamEfficiencyGain: 0.25,
    knowledgeTransferRate: 0.2,
    scalabilityFactor: 1.8,
    revenueAcceleration: 1.4,
    competitiveAdvantage: 1.6,
    marketPositioning: 1.3
};

// Advanced ROI Calculations
const ROI_CALCULATIONS = {
    baseInvestment: 5000,
    monthlyValueIncrease: 0.15,
    compoundingFactor: 1.1,
    scalingMultiplier: 1.5,
    enterpriseValue: 2.0,
    innovationPremium: 1.3,
    marketExpansion: 1.4,
    valueAcceleration: 1.2
};

// Breakthrough Detection Thresholds
const BREAKTHROUGH_THRESHOLDS = {
    performanceJump: 0.2,
    consistencyThreshold: 0.85,
    velocityIncrease: 0.3,
    innovationLeap: 0.25,
    masteryAchievement: 0.9
};

const TRANSFORMATION_INTEGRATIONS = {
    technicalAcceleration: {
        skillMultiplier: { base: 1.5, mastery: 2.0, breakthrough: 2.5 },
        velocityBoost: { base: 1.3, rapid: 1.8, exceptional: 2.2 },
        innovationFactor: { standard: 1.4, advanced: 1.9, disruptive: 2.4 }
    },
    valueAmplification: {
        immediate: { technical: 1.3, mindset: 1.5, combined: 1.8 },
        projected: { technical: 1.6, mindset: 1.9, combined: 2.2 },
        legacy: { technical: 2.0, mindset: 2.5, combined: 3.0 }
    }
};

// Revenue Optimization Features
const revenueOptimization = {
    calculateRevenueAcceleration: (metrics) => {
        // Base revenue calculations
        const projectedUsers = calculateUserGrowth(12);
        const baseRevenue = calculateSubscriptionRevenue(projectedUsers) +
                           calculateEnterpriseRevenue(projectedUsers) +
                           calculateCertificationRevenue(projectedUsers);

        // Transformation value from existing calculations
        const transformationMetrics = calculateBaseTransformationValue(metrics);
        const totalTransformationValue = transformationMetrics.immediateTransformation +
                                       transformationMetrics.projectedImpact;

        // Enhanced with breakthrough factors
        const transformationMultiplier = 1 + (
            (metrics.skillGrowth || 0.5) * TRANSFORMATION_DRIVERS.breakthroughFactors.mindsetShift.value +
            (metrics.conceptMastery || 0.5) * TRANSFORMATION_DRIVERS.breakthroughFactors.careerLeap.value +
            (metrics.learningVelocity || 0.5) * TRANSFORMATION_DRIVERS.breakthroughFactors.ventureCreation.value
        ) / 100000;

        // Combine base revenue with transformation values
        const totalRevenue = (baseRevenue + totalTransformationValue) * transformationMultiplier;
        const optimizationValue = totalRevenue * 1.5 + transformationMetrics.societalValue;
        const enterpriseValue = totalRevenue * 2.2 + transformationMetrics.compoundedValue;

        return {
            currentRevenue: Math.round(totalRevenue / 12),
            projectedRevenue: Math.round(totalRevenue),
            optimizationPotential: Math.round(optimizationValue),
            enterpriseValue: Math.round(enterpriseValue),
            transformationMetrics: transformationMetrics
        };
    },

    calculateMarketExpansion: (metrics) => {
        const marketPenetration = MARKET_DYNAMICS['AI Development'].marketPenetration;
        const innovationFactor = MARKET_DYNAMICS['AI Development'].innovationFactor;
        const monthlyTarget = 40000000 / 12; // Monthly target from $40M annual
        
        return {
            marketShare: metrics.skillGrowth * marketPenetration,
            expansionRate: metrics.learningVelocity * innovationFactor,
            revenueMultiplier: metrics.conceptMastery * BUSINESS_IMPACT_FACTORS.competitiveAdvantage,
            monthlyProjection: monthlyTarget / 12 * marketPenetration
        };
    }
};

// Helper functions for revenue calculations
const calculateUserGrowth = (months) => {
    const initialUsers = 1000; // Starting user base
    return initialUsers * Math.pow(1 + REVENUE_DRIVERS.platformScaling.monthlyUserGrowth, months);
};

const calculateSubscriptionRevenue = (users) => {
    const { base, premium, enterprise } = REVENUE_DRIVERS.revenueStreams.subscriptions;
    return users * (
        (base * 0.5) +           // 50% base users
        (premium * 0.3) +        // 30% premium users
        (enterprise * 0.2)       // 20% enterprise users
    ) * 12;                      // Annualized
};

const calculateEnterpriseRevenue = (users) => {
    const contracts = Object.values(REVENUE_DRIVERS.enterpriseContracts)
        .reduce((acc, contract) => {
            const numberOfContracts = users * contract.conversionRate;
            return acc + (numberOfContracts * contract.seats * contract.pricePerSeat);
        }, 0);
    
    return contracts * (1 + REVENUE_DRIVERS.platformScaling.enterpriseUpsell);
};

const calculateCertificationRevenue = (users) => {
    const { basic, advanced, expert } = REVENUE_DRIVERS.revenueStreams.certifications;
    const certificationUsers = users * 0.4; // 40% pursue certifications
    
    return certificationUsers * (
        (basic * 0.6) +          // 60% basic certs
        (advanced * 0.3) +       // 30% advanced certs
        (expert * 0.1)           // 10% expert certs
    );
};

const calculateConsultingRevenue = (enterpriseRevenue) => {
    const { implementation, customization } = REVENUE_DRIVERS.revenueStreams.consulting;
    const enterpriseClients = enterpriseRevenue / 
        (REVENUE_DRIVERS.revenueStreams.teamLicenses.enterprise * 12);
    
    return enterpriseClients * (implementation * 0.7 + customization * 0.3);
};

const calculateBaseTransformationValue = (metrics) => {
    const breakthroughValue = calculateBreakthroughValue(metrics);
    const alignmentValue = calculateAlignmentValue(metrics);
    const transformationImpact = calculateTransformationImpact(metrics);
    
    // Compound value based on actual life changes
    return {
        immediateTransformation: Math.round(breakthroughValue.immediate + alignmentValue.immediate),
        projectedImpact: Math.round((breakthroughValue.projected + alignmentValue.projected) * 
            TRANSFORMATION_DRIVERS.accelerationFactors.exponentialImpact),
        societalValue: Math.round(transformationImpact.rippleEffect * 
            TRANSFORMATION_DRIVERS.accelerationFactors.legacyCreation),
        compoundedValue: Math.round(
            (breakthroughValue.projected + alignmentValue.projected + transformationImpact.direct) * 
            TRANSFORMATION_DRIVERS.accelerationFactors.compoundedGrowth
        )
    };
};

const calculateBreakthroughValue = (metrics) => {
    const mindsetShiftValue = TRANSFORMATION_DRIVERS.breakthroughFactors.mindsetShift.value * 
        (metrics.skillGrowth > 0.7 ? TRANSFORMATION_DRIVERS.accelerationFactors.rapidBreakthrough : 1);
    
    const careerLeapValue = TRANSFORMATION_DRIVERS.breakthroughFactors.careerLeap.value * 
        (metrics.conceptMastery > 0.8 ? TRANSFORMATION_DRIVERS.accelerationFactors.exponentialImpact : 1);
    
    const ventureValue = TRANSFORMATION_DRIVERS.breakthroughFactors.ventureCreation.value * 
        (metrics.learningVelocity > 0.9 ? TRANSFORMATION_DRIVERS.accelerationFactors.compoundedGrowth : 1);

    return {
        immediate: mindsetShiftValue * TRANSFORMATION_DRIVERS.breakthroughFactors.mindsetShift.probability,
        projected: (careerLeapValue + ventureValue) * 
            (TRANSFORMATION_DRIVERS.breakthroughFactors.careerLeap.probability + 
             TRANSFORMATION_DRIVERS.breakthroughFactors.ventureCreation.probability)
    };
};

const calculateAlignmentValue = (metrics) => {
    const purposeValue = TRANSFORMATION_DRIVERS.alignmentMetrics.purposeDiscovery.baseValue * 
        TRANSFORMATION_DRIVERS.alignmentMetrics.purposeDiscovery.multiplier;
    
    const potentialValue = TRANSFORMATION_DRIVERS.alignmentMetrics.potentialUnlocking.baseValue * 
        TRANSFORMATION_DRIVERS.alignmentMetrics.potentialUnlocking.multiplier * 
        (metrics.breakthroughPotential || 1);
    
    const visionValue = TRANSFORMATION_DRIVERS.alignmentMetrics.visionManifestation.baseValue * 
        TRANSFORMATION_DRIVERS.alignmentMetrics.visionManifestation.multiplier * 
        (metrics.skillGrowth > 0.8 ? TRANSFORMATION_DRIVERS.accelerationFactors.exponentialImpact : 1);

    return {
        immediate: purposeValue,
        projected: (potentialValue + visionValue) * TRANSFORMATION_DRIVERS.accelerationFactors.compoundedGrowth
    };
};

const calculateTransformationImpact = (metrics) => {
    const individualTransformation = Object.values(TRANSFORMATION_DRIVERS.transformationLevels.individual)
        .reduce((acc, level) => acc + (level.value * level.compound), 0);
    
    const organizationalTransformation = Object.values(TRANSFORMATION_DRIVERS.transformationLevels.organizational)
        .reduce((acc, level) => acc + (level.value * level.rippleEffect), 0);

    return {
        direct: individualTransformation * metrics.skillGrowth,
        rippleEffect: organizationalTransformation * metrics.conceptMastery * 
            TRANSFORMATION_DRIVERS.accelerationFactors.exponentialImpact
    };
};

// Enterprise Scaling Metrics
const enterpriseScaling = {
    calculateTeamImpact: (metrics) => {
        return {
            productivityGain: metrics.skillGrowth * BUSINESS_IMPACT_FACTORS.productivityMultiplier,
            innovationScore: metrics.conceptMastery * BUSINESS_IMPACT_FACTORS.innovationBonus,
            scalingPotential: metrics.learningVelocity * BUSINESS_IMPACT_FACTORS.scalabilityFactor
        };
    },

    projectEnterpriseGrowth: (metrics) => {
        const baseImpact = metrics.marketValue || 50000;
        return {
            quarterlyGrowth: baseImpact * ROI_CALCULATIONS.valueAcceleration,
            annualProjection: baseImpact * ROI_CALCULATIONS.enterpriseValue,
            scalingFactor: BUSINESS_IMPACT_FACTORS.scalabilityFactor
        };
    }
};

// Advanced ROI Tracking
const roiTracking = {
    calculateDetailedROI: (metrics) => {
        const investment = ROI_CALCULATIONS.baseInvestment;
        const monthlyValue = metrics.marketValue * ROI_CALCULATIONS.monthlyValueIncrease;
        
        return {
            immediateReturn: monthlyValue * 3,
            yearOneReturn: monthlyValue * 12 * ROI_CALCULATIONS.compoundingFactor,
            threeYearProjection: monthlyValue * 36 * ROI_CALCULATIONS.scalingMultiplier,
            enterpriseValue: monthlyValue * 12 * ROI_CALCULATIONS.enterpriseValue
        };
    },

    projectValueGeneration: (metrics) => {
        return {
            shortTerm: metrics.marketValue * ROI_CALCULATIONS.valueAcceleration,
            mediumTerm: metrics.marketValue * ROI_CALCULATIONS.marketExpansion,
            longTerm: metrics.marketValue * ROI_CALCULATIONS.enterpriseValue
        };
    }
};

// Enhanced Market Value Calculations
const calculateAdvancedMarketValue = (skills, performance, enterpriseMetrics) => {
    let totalValue = 0;
    let marketPotential = 0;

    skills.forEach(skill => {
        if (MARKET_DYNAMICS[skill]) {
            const dynamics = MARKET_DYNAMICS[skill];
            const baseValue = dynamics.baseValue;
            const growthValue = baseValue * (1 + dynamics.growthRate);
            const scarcityValue = baseValue * dynamics.scarcityBonus;
            const demandValue = baseValue * dynamics.demandMultiplier;
            
            const skillValue = (baseValue + growthValue + scarcityValue + demandValue) / 4;
            totalValue += skillValue * performance * dynamics.enterpriseImpact;
            marketPotential += skillValue * dynamics.marketPenetration * dynamics.innovationFactor;
        }
    });

    const enterpriseMultiplier = calculateEnterpriseMultiplier(enterpriseMetrics);
    return {
        currentValue: Math.round(totalValue * enterpriseMultiplier),
        marketPotential: Math.round(marketPotential),
        growthTrajectory: calculateGrowthTrajectory(totalValue, marketPotential)
    };
};

const calculateEnterpriseMultiplier = (metrics) => {
    if (!metrics) return 1;

    return (
        BUSINESS_IMPACT_FACTORS.productivityMultiplier *
        BUSINESS_IMPACT_FACTORS.scalabilityFactor *
        (1 + BUSINESS_IMPACT_FACTORS.innovationBonus) *
        (1 + metrics.teamEfficiency || BUSINESS_IMPACT_FACTORS.teamEfficiencyGain)
    );
};

const calculateGrowthTrajectory = (currentValue, potentialValue) => {
    const growthRate = (potentialValue - currentValue) / currentValue;
    return {
        threeMonths: currentValue * (1 + growthRate * 0.25),
        sixMonths: currentValue * (1 + growthRate * 0.5),
        oneYear: currentValue * (1 + growthRate),
        confidenceScores: calculateConfidenceScores(growthRate)
    };
};

const calculateConfidenceScores = (growthRate) => {
    return {
        shortTerm: Math.min(Math.max(0.9 - Math.abs(growthRate), 0.3), 0.9),
        mediumTerm: Math.min(Math.max(0.7 - Math.abs(growthRate), 0.2), 0.7),
        longTerm: Math.min(Math.max(0.5 - Math.abs(growthRate), 0.1), 0.5)
    };
};

const calculateROIMetrics = async (userId, pathId, marketValue) => {
    const baseInvestment = ROI_CALCULATIONS.baseInvestment;
    const monthlyIncrease = marketValue * ROI_CALCULATIONS.monthlyValueIncrease;
    const scaledValue = monthlyIncrease * ROI_CALCULATIONS.scalingMultiplier;

    return {
        immediateReturn: calculateImmediateROI(baseInvestment, monthlyIncrease),
        projectedReturn: calculateProjectedROI(baseInvestment, scaledValue),
        enterpriseValue: calculateEnterpriseROI(scaledValue),
        accelerationMetrics: calculateAccelerationMetrics(monthlyIncrease)
    };
};

const calculateEnterpriseROI = (monthlyValue) => {
    const annualValue = monthlyValue * 12;
    const scaledValue = annualValue * ROI_CALCULATIONS.enterpriseValue;
    const innovationPremium = scaledValue * ROI_CALCULATIONS.innovationPremium;
    
    return {
        annualValue: Math.round(annualValue),
        scaledEnterpriseValue: Math.round(scaledValue),
        totalPotentialValue: Math.round(innovationPremium),
        valueMultiplier: ROI_CALCULATIONS.enterpriseValue * ROI_CALCULATIONS.innovationPremium
    };
};

const calculateBreakthroughPotential = async (userId, metrics) => {
    const performance = metrics.skillGrowth;
    const consistency = metrics.learningVelocity;
    const mastery = metrics.conceptMastery;

    const breakthroughScore = (
        (performance > BREAKTHROUGH_THRESHOLDS.performanceJump ? 1 : 0) +
        (consistency > BREAKTHROUGH_THRESHOLDS.consistencyThreshold ? 1 : 0) +
        (mastery > BREAKTHROUGH_THRESHOLDS.masteryAchievement ? 1 : 0)
    ) / 3;

    return {
        score: breakthroughScore,
        potential: calculateBreakthroughProbability(breakthroughScore, metrics),
        accelerationOpportunities: identifyAccelerationOpportunities(metrics),
        valueMultipliers: calculateValueMultipliers(breakthroughScore)
    };
};

const calculateValueMultipliers = (breakthroughScore) => {
    return {
        skillValue: 1 + (breakthroughScore * 0.5),
        marketDemand: 1 + (breakthroughScore * 0.3),
        enterpriseImpact: 1 + (breakthroughScore * 0.4),
        innovationPotential: 1 + (breakthroughScore * 0.6)
    };
};

const calculateTechnicalBoost = (metrics, transformation) => {
    // Add null checks
    if (!transformation?.metrics?.impact || !metrics?.performanceAcceleration) {
        return {
            skill: 1,
            velocity: 1,
            innovation: 1,
            combined: 1
        };
    }

    const baseSkillBoost = (transformation.metrics.impact.technicalGrowth || 0) * 
        TRANSFORMATION_INTEGRATIONS.technicalAcceleration.skillMultiplier.base;
    
    const velocityBoost = (metrics.performanceAcceleration.accelerationRate || 0) * 
        TRANSFORMATION_INTEGRATIONS.technicalAcceleration.velocityBoost.base;
    
    const innovationBoost = (transformation.metrics.impact.mindsetShift || 0) * 
        TRANSFORMATION_INTEGRATIONS.technicalAcceleration.innovationFactor.standard;

    return {
        skill: Math.min(baseSkillBoost, TRANSFORMATION_INTEGRATIONS.technicalAcceleration.skillMultiplier.breakthrough),
        velocity: Math.min(velocityBoost, TRANSFORMATION_INTEGRATIONS.technicalAcceleration.velocityBoost.exceptional),
        innovation: Math.min(innovationBoost, TRANSFORMATION_INTEGRATIONS.technicalAcceleration.innovationFactor.disruptive),
        combined: (baseSkillBoost + velocityBoost + innovationBoost) / 3
    };
};

const calculateValueAmplification = (metrics, transformation) => {
    // Add null checks
    if (!transformation?.metrics?.value || !metrics?.valueOptimization?.currentOptimization) {
        return {
            immediate: 1,
            projected: 1,
            legacy: 1,
            combined: 1
        };
    }

    const immediateAmplification = (transformation.metrics.value.immediate || 0) / 
        (metrics.valueOptimization.currentOptimization.currentEfficiency || 1);
    const projectedAmplification = (transformation.metrics.value.projected || 0) / 
        (metrics.valueOptimization.potentialGains?.potentialIncrease || 1);
    const legacyAmplification = (transformation.metrics.value.legacy || 0) / 
        (metrics.marketPosition?.valueProjection?.oneYear || 1);

    return {
        immediate: Math.min(immediateAmplification, TRANSFORMATION_INTEGRATIONS.valueAmplification.immediate.combined),
        projected: Math.min(projectedAmplification, TRANSFORMATION_INTEGRATIONS.valueAmplification.projected.combined),
        legacy: Math.min(legacyAmplification, TRANSFORMATION_INTEGRATIONS.valueAmplification.legacy.combined),
        combined: (immediateAmplification + projectedAmplification + legacyAmplification) / 3
    };
};

// Advanced Analytics Integration
const calculateAdvancedMetrics = async (userId, pathId, baseMetrics) => {
    const valueOptimization = await optimizeValueGeneration(baseMetrics);
    const marketPosition = calculateMarketPosition(baseMetrics);
    const performanceAcceleration = analyzePerformanceAcceleration(baseMetrics);
    
    // Add transformation integration
    const transformationEnhancement = await calculateTransformationEnhancement(userId, pathId, {
        valueOptimization,
        marketPosition,
        performanceAcceleration
    });

    return {
        valueOptimization,
        marketPosition,
        performanceAcceleration,
        transformationEnhancement,
        predictiveInsights: generatePredictiveInsights({
            ...baseMetrics,
            transformationEnhancement
        })
    };
};

const calculateTransformationEnhancement = async (userId, pathId, metrics) => {
    const transformation = await Transformation.findOne({ userId, pathId });
    if (!transformation) return null;

    const technicalBoost = calculateTechnicalBoost(metrics, transformation);
    const valueAmplification = calculateValueAmplification(metrics, transformation);

    return {
        technicalAcceleration: technicalBoost,
        valueMultipliers: valueAmplification,
        totalEnhancement: (technicalBoost.combined * valueAmplification.combined)
    };
};

const optimizeValueGeneration = async (metrics) => {
    const baseValue = metrics.skillGrowth || 0.5;
    const velocityFactor = metrics.learningVelocity || 0.5;
    const masteryImpact = metrics.conceptMastery || 0.5;

    return {
        currentOptimization: calculateCurrentOptimization(baseValue, velocityFactor),
        potentialGains: calculatePotentialGains(baseValue, masteryImpact),
        accelerationPath: generateAccelerationPath(metrics),
        valueMultipliers: {
            skill: Math.min(Math.max(baseValue * 2, 1), 3),
            market: Math.min(Math.max(velocityFactor * 1.5, 1), 2.5),
            enterprise: Math.min(Math.max(masteryImpact * 2.5, 1), 4)
        }
    };
};

const calculateMarketPosition = (metrics) => {
    const skillValue = calculateSkillMarketValue(metrics);
    const demandMultiplier = calculateDemandMultiplier(metrics);
    const growthPotential = calculateGrowthPotential(metrics);

    return {
        currentPosition: {
            value: skillValue,
            demand: demandMultiplier,
            growth: growthPotential
        },
        marketTrends: analyzeMarketTrends(metrics),
        competitiveAdvantage: calculateCompetitiveAdvantage(metrics),
        valueProjection: projectMarketValue(skillValue, demandMultiplier, growthPotential)
    };
};

const analyzePerformanceAcceleration = (metrics) => {
    const learningRate = metrics.learningVelocity || 0.5;
    const skillMastery = metrics.conceptMastery || 0.5;
    const breakthroughs = metrics.breakthroughMoments || 0;

    return {
        accelerationRate: calculateAccelerationRate(learningRate, skillMastery),
        breakthroughImpact: analyzeBreakthroughImpact(breakthroughs),
        optimizationPotential: calculateOptimizationPotential(metrics),
        valueAcceleration: {
            immediate: learningRate * BUSINESS_IMPACT_FACTORS.productivityMultiplier,
            projected: skillMastery * BUSINESS_IMPACT_FACTORS.scalabilityFactor,
            potential: breakthroughs * BUSINESS_IMPACT_FACTORS.innovationBonus
        }
    };
};

const generatePredictiveInsights = (metrics) => {
    const performanceTrend = {
        current: metrics.skillGrowth || 0.5,
        velocity: metrics.learningVelocity || 0.5,
        mastery: metrics.conceptMastery || 0.5
    };

    const marketProjection = {
        immediate: performanceTrend.current * MARKET_DYNAMICS['AI Development'].baseValue,
        growth: performanceTrend.velocity * MARKET_DYNAMICS['AI Development'].growthRate,
        potential: performanceTrend.mastery * MARKET_DYNAMICS['AI Development'].enterpriseImpact
    };

    return {
        shortTerm: {
            value: marketProjection.immediate,
            growth: marketProjection.growth,
            confidence: 0.9
        },
        mediumTerm: {
            value: marketProjection.immediate * (1 + marketProjection.growth),
            potential: marketProjection.potential,
            confidence: 0.7
        },
        longTerm: {
            value: marketProjection.immediate * (1 + marketProjection.growth * 2),
            maxPotential: marketProjection.potential * 1.5,
            confidence: 0.5
        },
        valueMultipliers: calculateValueMultipliers(performanceTrend.current)
    };
};

const calculateSkillGrowth = async (userId, timeframe = 30) => {
    try {
        const recentQuizzes = await QuizAttempt.find({
            userId,
            createdAt: { $gte: new Date(Date.now() - timeframe * 24 * 60 * 60 * 1000) }
        }).sort('createdAt');

        if (!recentQuizzes.length) return 0.5;

        const scores = recentQuizzes.map(quiz => quiz.score || 0);
        const recentAvg = scores.slice(-3).reduce((a, b) => a + b, 0) / 3;
        
        return Math.min(Math.max(recentAvg, 0), 1);
    } catch (error) {
        console.error('Error calculating skill growth:', error);
        return 0.5;
    }
};

const calculateConceptMastery = async (userId, pathId) => {
    try {
        const quizzes = await QuizAttempt.find({ userId }).sort('-createdAt');
        if (!quizzes.length) return { overallMastery: 0.5, conceptBreakdown: {} };

        return {
            overallMastery: quizzes.reduce((acc, quiz) => acc + (quiz.score || 0), 0) / quizzes.length,
            conceptBreakdown: {}
        };
    } catch (error) {
        return { overallMastery: 0.5, conceptBreakdown: {} };
    }
};

const analyzeLearningPatterns = async (userId) => {
    return {
        learningEfficiency: { overall: 0.5 },
        consistencyScore: 0.5,
        optimalTimeOfDay: 'morning'
    };
};

const calculateBreakthroughProbability = (breakthroughScore, metrics) => {
    return Math.min(
        Math.max(
            (breakthroughScore * 0.4) + 
            (metrics.skillGrowth * 0.3) + 
            (metrics.learningVelocity * 0.3), 
            0
        ), 
        1
    );
};

const identifyAccelerationOpportunities = (metrics) => {
    return [
        metrics.skillGrowth < 0.7 ? 'Skill Enhancement Required' : null,
        metrics.learningVelocity < 0.6 ? 'Speed Optimization Needed' : null,
        metrics.conceptMastery < 0.8 ? 'Concept Mastery Focus Required' : null
    ].filter(Boolean);
};

const calculateImmediateROI = (investment, monthlyValue) => {
    return {
        threeMonth: (monthlyValue * 3) - investment,
        sixMonth: (monthlyValue * 6) - investment,
        firstYear: (monthlyValue * 12) - investment
    };
};

const calculateProjectedROI = (investment, scaledValue) => {
    return {
        firstYear: (scaledValue * 12) - investment,
        threeYear: (scaledValue * 36) - investment,
        fiveYear: (scaledValue * 60) - investment
    };
};

const calculateAccelerationMetrics = (monthlyValue) => {
    return {
        baseAcceleration: monthlyValue * ROI_CALCULATIONS.valueAcceleration,
        scaledAcceleration: monthlyValue * ROI_CALCULATIONS.scalingMultiplier,
        maxPotential: monthlyValue * ROI_CALCULATIONS.enterpriseValue
    };
};

const calculateCurrentOptimization = (baseValue, velocityFactor) => {
    return {
        currentEfficiency: Math.min(baseValue * velocityFactor * 2, 1),
        optimizationLevel: baseValue > 0.7 ? 'high' : baseValue > 0.4 ? 'medium' : 'low',
        efficiencyScore: velocityFactor * 100
    };
};

const calculatePotentialGains = (baseValue, masteryImpact) => {
    return {
        potentialIncrease: (1 - baseValue) * masteryImpact * 100,
        timeToAchieve: Math.round(30 * (1 - masteryImpact)),
        confidenceScore: masteryImpact * 0.8
    };
};

const generateAccelerationPath = (metrics) => {
    const currentLevel = metrics.skillGrowth || 0.5;
    const velocity = metrics.learningVelocity || 0.5;
    
    return {
        nextMilestone: currentLevel < 0.3 ? 'basic' : currentLevel < 0.6 ? 'intermediate' : 'advanced',
        timeEstimate: Math.round(30 * (1 - velocity)),
        recommendedPace: velocity < 0.3 ? 'steady' : velocity < 0.6 ? 'accelerated' : 'intensive'
    };
};

const calculateSkillMarketValue = (metrics) => {
    const baseValue = metrics.skillGrowth || 0.5;
    return baseValue * MARKET_DYNAMICS['AI Development'].baseValue;
};

const calculateDemandMultiplier = (metrics) => {
    const mastery = metrics.conceptMastery || 0.5;
    return 1 + (mastery * MARKET_DYNAMICS['AI Development'].demandMultiplier);
};

const calculateGrowthPotential = (metrics) => {
    const velocity = metrics.learningVelocity || 0.5;
    return velocity * MARKET_DYNAMICS['AI Development'].growthRate;
};

const analyzeMarketTrends = (metrics) => {
    return {
        shortTerm: { trend: 'up', confidence: 0.8 },
        mediumTerm: { trend: 'up', confidence: 0.6 },
        longTerm: { trend: 'up', confidence: 0.4 }
    };
};

const calculateCompetitiveAdvantage = (metrics) => {
    const skillLevel = metrics.skillGrowth || 0.5;
    const marketImpact = MARKET_DYNAMICS['AI Development'].marketPenetration;
    return skillLevel * marketImpact * BUSINESS_IMPACT_FACTORS.competitiveAdvantage;
};

const projectMarketValue = (skillValue, demandMultiplier, growthPotential) => {
    return {
        threeMonths: skillValue * (1 + growthPotential * 0.25) * demandMultiplier,
        sixMonths: skillValue * (1 + growthPotential * 0.5) * demandMultiplier,
        oneYear: skillValue * (1 + growthPotential) * demandMultiplier
    };
};

const calculateAccelerationRate = (learningRate, skillMastery) => {
    return (learningRate + skillMastery) / 2 * BUSINESS_IMPACT_FACTORS.revenueAcceleration;
};

const analyzeBreakthroughImpact = (breakthroughs) => {
    return {
        immediateValue: breakthroughs * 10000,
        projectedImpact: breakthroughs * BUSINESS_IMPACT_FACTORS.innovationBonus,
        marketAdvantage: breakthroughs * MARKET_DYNAMICS['AI Development'].innovationFactor
    };
};

const calculateOptimizationPotential = (metrics) => {
    const currentEfficiency = (metrics.skillGrowth + metrics.learningVelocity) / 2;
    return Math.max(1 - currentEfficiency, 0) * BUSINESS_IMPACT_FACTORS.scalabilityFactor;
};

exports.updateSuccessMetrics = async (userId, pathId) => {
    try {
        let metrics = await Successmetrics.findOne({ userId, pathId });
        
        // Base calculations
        const skillGrowth = await calculateSkillGrowth(userId);
        const conceptMastery = await calculateConceptMastery(userId, pathId);
        const learningPatterns = await analyzeLearningPatterns(userId);
        
        // Advanced metrics
        const marketValue = await calculateAdvancedMarketValue(
            ['AI Development', 'Machine Learning'], 
            skillGrowth,
            learningPatterns
        );
        
        const roiMetrics = await calculateROIMetrics(userId, pathId, marketValue.currentValue);
        const breakthroughPotential = await calculateBreakthroughPotential(userId, {
            skillGrowth,
            conceptMastery: conceptMastery.overallMastery,
            learningVelocity: learningPatterns.learningEfficiency?.overall || 0.5
        });

        // Value optimization
        const advancedMetrics = await calculateAdvancedMetrics(userId, pathId, {
            skillGrowth,
            conceptMastery: conceptMastery.overallMastery,
            learningVelocity: learningPatterns.learningEfficiency?.overall || 0.5
        });

        // Calculate revenue and enterprise metrics
        const revenueMetrics = revenueOptimization.calculateRevenueAcceleration({
            marketValue: marketValue.currentValue,
            skillGrowth,
            learningVelocity: learningPatterns.learningEfficiency?.overall || 0.5
        });

        const enterpriseMetrics = enterpriseScaling.calculateTeamImpact({
            skillGrowth,
            conceptMastery: conceptMastery.overallMastery,
            learningVelocity: learningPatterns.learningEfficiency?.overall || 0.5
        });

        // Prepare metrics for saving with all enhancements
        const newMetrics = {
            skillGrowth: Math.min(Math.max(skillGrowth, 0), 1),
            conceptMastery: Math.min(Math.max(conceptMastery.overallMastery, 0), 1),
            learningVelocity: Math.min(Math.max(learningPatterns.learningEfficiency?.overall || 0.5, 0), 1),
            marketValue: marketValue.currentValue,
            breakthroughPotential: breakthroughPotential.score
        };

        if (!metrics) {
            metrics = new Successmetrics({
                userId,
                pathId,
                metrics: newMetrics
            });
        } else {
            metrics.metrics = newMetrics;
        }

        // Add timeline metrics with enhanced value tracking
        metrics.timelineMetrics.push({
            timestamp: new Date(),
            metricType: 'composite',
            value: (newMetrics.skillGrowth + newMetrics.conceptMastery + newMetrics.learningVelocity) / 3,
            context: JSON.stringify({
                marketValue,
                roiMetrics,
                breakthroughPotential,
                advancedMetrics,
                revenueMetrics,
                enterpriseMetrics
            })
        });

        await metrics.save();

        // Add transformation metrics
        const transformationMetrics = await updateTransformationMetrics(userId, pathId, newMetrics);
        metrics.transformationMetrics = transformationMetrics.metrics;

        // Return comprehensive value metrics with all enhancements
        return {
            ...metrics.toObject(),
            marketValue,
            roiMetrics,
            breakthroughPotential,
            advancedMetrics,
            revenueMetrics,
            enterpriseMetrics,
            transformationMetrics: transformationMetrics.metrics,
            valueProjection: generatePredictiveInsights(newMetrics)
        };
    } catch (error) {
        console.error('Error updating success metrics:', error);
        throw error;
    }
};

// Add getTransformationMetrics function as a separate export
exports.getTransformationMetrics = async (userId) => {
    try {
        const transformation = await Transformation.findOne({ userId });
        if (!transformation) {
            return {
                exists: false,
                message: 'No transformation metrics found',
                initialMetrics: {
                    technicalGrowth: 0,
                    mindsetShift: 0,
                    valueCreation: 0
                }
            };
        }

        // Get success metrics for this user
        const metrics = await Successmetrics.findOne({ userId });
        
        // Calculate current transformation state
        const transformationState = {
            technicalGrowth: metrics?.metrics?.skillGrowth || 0,
            mindsetShift: metrics?.metrics?.conceptMastery || 0,
            valueCreation: metrics?.metrics?.marketValue || 0
        };

        // Calculate transformation impact
        const transformationImpact = {
            technicalGrowth: transformationState.technicalGrowth * TRANSFORMATION_DRIVERS.accelerationFactors.rapidBreakthrough,
            mindsetShift: transformationState.mindsetShift * TRANSFORMATION_DRIVERS.accelerationFactors.exponentialImpact,
            valueCreation: transformationState.valueCreation * TRANSFORMATION_DRIVERS.accelerationFactors.legacyCreation
        };

        return {
            exists: true,
            transformation: {
                currentState: transformationState,
                impact: transformationImpact,
                metrics: transformation.metrics
            },
            relatedMetrics: metrics ? {
                skillGrowth: metrics.metrics.skillGrowth,
                conceptMastery: metrics.metrics.conceptMastery,
                learningVelocity: metrics.metrics.learningVelocity,
                marketValue: metrics.metrics.marketValue
            } : null
        };
    } catch (error) {
        console.error('Error fetching transformation metrics:', error);
        throw error;
    }
};

// Helper functions
const updateTransformationMetrics = async (userId, pathId, metrics) => {
    try {
        let transformation = await Transformation.findOne({ userId, pathId });
        
        // Calculate transformation impact
        const transformationImpact = {
            technicalGrowth: metrics.skillGrowth * TRANSFORMATION_DRIVERS.accelerationFactors.rapidBreakthrough,
            mindsetShift: metrics.conceptMastery * TRANSFORMATION_DRIVERS.accelerationFactors.exponentialImpact,
            valueCreation: metrics.marketValue * TRANSFORMATION_DRIVERS.accelerationFactors.legacyCreation
        };

        // Calculate transformation value
        const transformationValue = calculateTransformationValue(metrics, transformationImpact);

        if (!transformation) {
            transformation = new Transformation({
                userId,
                pathId,
                metrics: {
                    impact: transformationImpact,
                    value: transformationValue
                }
            });
        } else {
            transformation.metrics = {
                impact: transformationImpact,
                value: transformationValue
            };
        }

        await transformation.save();
        return transformation;
    } catch (error) {
        console.error('Error updating transformation metrics:', error);
        throw error;
    }
};

const calculateTransformationValue = (metrics, impact) => {
    const immediateValue = impact.technicalGrowth * metrics.marketValue;
    const projectedValue = impact.mindsetShift * metrics.marketValue * 1.5;
    const legacyValue = impact.valueCreation * metrics.marketValue * 2;

    return {
        immediate: Math.round(immediateValue),
        projected: Math.round(projectedValue),
        legacy: Math.round(legacyValue),
        total: Math.round(immediateValue + projectedValue + legacyValue)
    };
};