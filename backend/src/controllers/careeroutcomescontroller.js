const Ailearningpath = require('../models/ailearningpath');
const Successmetrics = require('../models/successmetrics');
const QuizAttempt = require('../models/quizattempt');

const industrySkillsMap = {
    'AI Development': { baseValue: 120000, growthRate: 0.15 },
    'Data Science': { baseValue: 115000, growthRate: 0.12 },
    'Cloud Architecture': { baseValue: 130000, growthRate: 0.10 },
    'Cybersecurity': { baseValue: 125000, growthRate: 0.14 },
    'Full Stack Development': { baseValue: 110000, growthRate: 0.08 }
};

exports.predictCareerOutcomes = async (userId, pathId) => {
    try {
        const path = await Ailearningpath.findById(pathId);
        const metrics = await Successmetrics.findOne({ userId, pathId });
        
        const skillProgression = {
            currentSkillLevel: metrics?.metrics?.skillGrowth || 0.5,
            projectedGrowth: calculateProjectedGrowth(metrics),
            marketAlignment: assessMarketAlignment(path.pathComponents),
            valueIncrease: calculateValueIncrease(metrics, path)
        };

        const careerProjections = {
            immediate: generateProjection(skillProgression, 3),
            shortTerm: generateProjection(skillProgression, 6),
            longTerm: generateProjection(skillProgression, 12)
        };

        return {
            skillProgression,
            careerProjections,
            marketInsights: generateMarketInsights(path),
            recommendedFocus: prioritizeSkills(skillProgression, path)
        };
    } catch (error) {
        console.error('Error predicting career outcomes:', error);
        throw error;
    }
};

function calculateProjectedGrowth(metrics) {
    if (!metrics?.metrics) return 0.1;
    
    const baseGrowth = metrics.metrics.learningVelocity || 0.1;
    const multiplier = metrics.metrics.breakthroughMoments > 0 ? 1.5 : 1;
    
    return Math.min(baseGrowth * multiplier, 0.3);
}

function assessMarketAlignment(pathComponents) {
    return pathComponents.map(component => ({
        skill: component.title,
        marketValue: industrySkillsMap[component.title]?.baseValue || 75000,
        growthPotential: industrySkillsMap[component.title]?.growthRate || 0.05
    }));
}

function calculateValueIncrease(metrics, path) {
    const baseValue = path.pathComponents.reduce((acc, comp) => 
        acc + (industrySkillsMap[comp.title]?.baseValue || 75000), 0) / path.pathComponents.length;
    
    const multiplier = (metrics?.metrics?.skillGrowth || 0.5) * 
                      (metrics?.metrics?.conceptMastery || 0.5);
    
    return baseValue * multiplier;
}

function generateProjection(progression, months) {
    const baseValue = 75000; // Base salary
    const growthRate = progression.projectedGrowth;
    const marketMultiplier = 1 + (progression.marketAlignment.length > 0 ? 
        progression.marketAlignment.reduce((acc, skill) => acc + skill.growthPotential, 0) / 
        progression.marketAlignment.length : 0.05);

    return {
        projectedSalary: baseValue * Math.pow(1 + growthRate, months/12) * marketMultiplier,
        skillLevel: Math.min(progression.currentSkillLevel + (growthRate * months/12), 1),
        marketDemand: calculateMarketDemand(progression.marketAlignment, months)
    };
}

function generateMarketInsights(path) {
    return path.pathComponents.map(component => ({
        skill: component.title,
        demandLevel: Math.random() * 0.5 + 0.5, // Replace with real market data
        growthTrend: 'increasing',
        relatedOpportunities: [
            'Senior Developer',
            'Technical Lead',
            'Architecture Consultant'
        ]
    }));
}

function calculateMarketDemand(alignment, months) {
    return alignment.map(skill => ({
        skill: skill.skill,
        demandChange: skill.growthPotential * months,
        projecteedValueIncrease: skill.marketValue * Math.pow(1 + skill.growthPotential, months/12)
    }));
}

function prioritizeSkills(progression, path) {
    return path.pathComponents
        .map(component => ({
            skill: component.title,
            priority: calculateSkillPriority(component, progression),
            reason: 'High market demand and growth potential',
            nextMilestone: 'Advanced certification'
        }))
        .sort((a, b) => b.priority - a.priority);
}

function calculateSkillPriority(component, progression) {
    const marketValue = industrySkillsMap[component.title]?.baseValue || 75000;
    const growthRate = industrySkillsMap[component.title]?.growthRate || 0.05;
    
    return (marketValue / 100000) * (1 + growthRate);
}