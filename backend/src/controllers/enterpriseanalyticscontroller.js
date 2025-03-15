const ProgressAnalytics = require('../models/progressanalytics');
const QuizAttempt = require('../models/quizattempt');
const Successmetrics = require('../models/successmetrics');

class EnterpriseAnalytics {
    async getTeamMetrics(teamId) {
        // Since we don't have a team model yet, we'll return simulated metrics
        return [
            {
                skillGrowth: 0.7,
                learningVelocity: 0.8,
                consistencyScore: 0.75,
                skills: ['AI Development', 'Machine Learning']
            },
            {
                skillGrowth: 0.6,
                learningVelocity: 0.7,
                consistencyScore: 0.8,
                skills: ['Data Science', 'Cloud Architecture']
            }
        ];
    }

    async getMarketValueData() {
        return {
            averageValuePerSkill: 25000,
            industryGrowthRate: 0.15,
            skillDemandMultipliers: {
                'AI Development': 1.5,
                'Data Science': 1.4,
                'Cloud Architecture': 1.3
            }
        };
    }

    async calculateTeamROI(userId, timeframe = 90) {
        try {
            const teamMetrics = await this.getTeamMetrics();
            const marketData = await this.getMarketValueData();
            
            return {
                financialMetrics: {
                    totalInvestment: this.calculateTotalInvestment(teamMetrics),
                    projectedReturn: this.calculateProjectedReturn(teamMetrics, marketData),
                    breakthroughValue: this.calculateBreakthroughValue(teamMetrics),
                    skillValueIncrease: this.calculateSkillValueIncrease(teamMetrics, marketData)
                },
                timeMetrics: {
                    averageTimeToMastery: this.calculateTimeToMastery(teamMetrics),
                    teamVelocity: this.calculateTeamVelocity(teamMetrics),
                    projectedMilestones: this.projectTeamMilestones(teamMetrics)
                },
                businessImpact: {
                    productivityGain: this.calculateProductivityGain(teamMetrics),
                    innovationMetrics: this.calculateInnovationMetrics(teamMetrics),
                    teamCapabilityExpansion: this.assessCapabilityExpansion(teamMetrics)
                }
            };
        } catch (error) {
            console.error('Error calculating team ROI:', error);
            return {
                financialMetrics: {
                    totalInvestment: 0,
                    projectedReturn: 0,
                    breakthroughValue: 0,
                    skillValueIncrease: 0
                },
                timeMetrics: {
                    averageTimeToMastery: 0,
                    teamVelocity: 0,
                    projectedMilestones: []
                },
                businessImpact: {
                    productivityGain: 0,
                    innovationMetrics: { newSkillsAdopted: 0, breakthroughRate: 0 },
                    teamCapabilityExpansion: 0
                }
            };
        }
    }

    calculateTotalInvestment(teamMetrics) {
        const costPerUser = 5000;
        const overheadMultiplier = 1.2;
        return teamMetrics.length * costPerUser * overheadMultiplier;
    }

    calculateProjectedReturn(teamMetrics, marketData) {
        const baseReturn = teamMetrics.reduce((acc, metric) => {
            return acc + (metric.skillGrowth * marketData.averageValuePerSkill);
        }, 0);

        const growthMultiplier = 1 + (marketData.industryGrowthRate || 0.15);
        return baseReturn * growthMultiplier;
    }

    calculateBreakthroughValue(teamMetrics) {
        return teamMetrics.reduce((acc, metric) => {
            return acc + ((metric.skillGrowth || 0.5) * 10000);
        }, 0);
    }

    calculateSkillValueIncrease(teamMetrics, marketData) {
        return teamMetrics.reduce((acc, metric) => {
            const skillMultiplier = metric.skills.reduce((sum, skill) => 
                sum + (marketData.skillDemandMultipliers[skill] || 1), 0);
            return acc + (metric.skillGrowth * skillMultiplier * marketData.averageValuePerSkill);
        }, 0);
    }

    calculateTimeToMastery(teamMetrics) {
        const masteryTimes = teamMetrics.map(metric => metric.learningVelocity ? 90 / metric.learningVelocity : 90);
        return {
            average: masteryTimes.reduce((a, b) => a + b, 0) / masteryTimes.length,
            fastest: Math.min(...masteryTimes),
            slowest: Math.max(...masteryTimes)
        };
    }

    calculateTeamVelocity(teamMetrics) {
        const velocities = teamMetrics.map(metric => metric.learningVelocity || 0.5);
        return {
            average: velocities.reduce((a, b) => a + b, 0) / velocities.length,
            trend: this.calculateVelocityTrend(velocities)
        };
    }

    calculateVelocityTrend(velocities) {
        const trend = velocities.length > 1 ? 
            velocities.slice(1).reduce((acc, curr, idx) => acc + (curr - velocities[idx]), 0) / 
            (velocities.length - 1) : 0;

        return {
            direction: trend > 0 ? 'increasing' : 'decreasing',
            magnitude: Math.abs(trend)
        };
    }

    calculateProductivityGain(teamMetrics) {
        const baseProductivity = 100;
        const skillMultiplier = 0.2;
        
        return teamMetrics.reduce((acc, metric) => {
            const skillGain = metric.skillGrowth || 0.5;
            return acc + (baseProductivity * skillMultiplier * skillGain);
        }, 0);
    }

    calculateInnovationMetrics(teamMetrics) {
        return {
            newSkillsAdopted: this.countNewSkillsAdopted(teamMetrics),
            breakthroughRate: this.calculateBreakthroughRate(teamMetrics),
            innovationPotential: this.assessInnovationPotential(teamMetrics)
        };
    }

    countNewSkillsAdopted(teamMetrics) {
        const uniqueSkills = new Set();
        teamMetrics.forEach(metric => {
            if (metric.skills) {
                metric.skills.forEach(skill => uniqueSkills.add(skill));
            }
        });
        return uniqueSkills.size;
    }

    calculateBreakthroughRate(teamMetrics) {
        return teamMetrics.reduce((acc, metric) => 
            acc + (metric.learningVelocity > 0.7 ? 1 : 0), 0) / teamMetrics.length;
    }

    assessInnovationPotential(teamMetrics) {
        const factors = {
            skillDiversity: this.calculateSkillDiversity(teamMetrics),
            learningVelocity: this.calculateTeamVelocity(teamMetrics).average,
            breakthroughRate: this.calculateBreakthroughRate(teamMetrics)
        };

        return Object.values(factors).reduce((a, b) => a + b, 0) / 3;
    }

    calculateSkillDiversity(teamMetrics) {
        const skillMap = new Map();
        teamMetrics.forEach(metric => {
            if (metric.skills) {
                metric.skills.forEach(skill => {
                    skillMap.set(skill, (skillMap.get(skill) || 0) + 1);
                });
            }
        });
        return skillMap.size / teamMetrics.length;
    }

    projectTeamMilestones(teamMetrics) {
        const velocityTrend = this.calculateTeamVelocity(teamMetrics).trend;
        return Array(3).fill(null).map((_, month) => ({
            month: month + 1,
            projectedValue: this.calculateProjectedValue(teamMetrics, month + 1, velocityTrend.magnitude),
            confidenceScore: this.calculateConfidenceScore(teamMetrics, month + 1)
        }));
    }

    calculateProjectedValue(teamMetrics, monthsAhead, velocityTrend) {
        const baseValue = teamMetrics.reduce((acc, metric) => 
            acc + (metric.skillGrowth || 0.5), 0) / teamMetrics.length;
        return baseValue * (1 + (velocityTrend * monthsAhead));
    }

    calculateConfidenceScore(teamMetrics, monthsAhead) {
        const consistencyScores = teamMetrics.map(metric => metric.consistencyScore || 0.5);
        const avgConsistency = consistencyScores.reduce((a, b) => a + b, 0) / consistencyScores.length;
        return Math.max(0.1, avgConsistency - (monthsAhead * 0.1));
    }

    assessCapabilityExpansion(teamMetrics) {
        return teamMetrics.reduce((acc, metric) => 
            acc + ((metric.skillGrowth || 0.5) * (metric.learningVelocity || 0.5)), 0) / teamMetrics.length;
    }
    calculateEnhancedBusinessImpact(teamMetrics, marketData) {
        const revenueImpact = this.calculateRevenueImpact(teamMetrics, marketData);
        const innovationImpact = this.calculateInnovationImpact(teamMetrics);
        const operationalImpact = this.calculateOperationalImpact(teamMetrics);
        const workforceImpact = this.calculateWorkforceImpact(teamMetrics);
        const marketImpact = this.calculateMarketImpact(teamMetrics, marketData);

        return {
            totalImpact: this.aggregateEnhancedImpacts({
                revenueImpact,
                innovationImpact,
                operationalImpact,
                workforceImpact,
                marketImpact
            }),
            breakdown: {
                revenueImpact,
                innovationImpact,
                operationalImpact,
                workforceImpact,
                marketImpact
            }
        };
    }

    calculateRevenueImpact(teamMetrics, marketData) {
        const baseRevenue = this.calculateProjectedReturn(teamMetrics, marketData);
        return {
            directValue: baseRevenue,
            growthValue: baseRevenue * (marketData.industryGrowthRate || 0.15),
            retentionValue: baseRevenue * 0.2, // Assuming 20% retention impact
            marketValue: this.calculateSkillValueIncrease(teamMetrics, marketData)
        };
    }

    calculateInnovationImpact(teamMetrics) {
        const innovationMetrics = this.calculateInnovationMetrics(teamMetrics);
        return {
            productValue: innovationMetrics.newSkillsAdopted * 100000,
            intellectualProperty: innovationMetrics.breakthroughRate * 250000,
            knowledgeCapital: this.countNewSkillsAdopted(teamMetrics) * 50000,
            velocityValue: this.calculateTeamVelocity(teamMetrics).average * 75000
        };
    }

    calculateOperationalImpact(teamMetrics) {
        const productivityGain = this.calculateProductivityGain(teamMetrics);
        return {
            costSavings: productivityGain * 1000,
            efficiencyGains: this.calculateTeamVelocity(teamMetrics).average * teamMetrics.length * 1000,
            qualityImprovements: this.calculateBreakthroughRate(teamMetrics) * productivityGain,
            automationValue: this.assessInnovationPotential(teamMetrics) * teamMetrics.length * 2000
        };
    }

    calculateWorkforceImpact(teamMetrics) {
        const teamSize = teamMetrics.length;
        const avgSkillGrowth = teamMetrics.reduce((acc, m) => acc + (m.skillGrowth || 0.5), 0) / teamSize;

        return {
            talentValue: avgSkillGrowth * this.calculateTeamVelocity(teamMetrics).average * teamSize * 10000,
            retentionSavings: this.calculateBreakthroughRate(teamMetrics) * teamSize * 10000,
            recruitmentValue: this.assessInnovationPotential(teamMetrics) * teamSize * 5000,
            developmentValue: avgSkillGrowth * teamSize * 7500
        };
    }

    calculateMarketImpact(teamMetrics, marketData) {
        const innovationPotential = this.assessInnovationPotential(teamMetrics);
        const baseValue = this.calculateProjectedReturn(teamMetrics, marketData);

        return {
            marketShareValue: innovationPotential * baseValue,
            brandEquity: this.calculateBreakthroughRate(teamMetrics) * 1000000,
            competitivePosition: innovationPotential * this.calculateSkillDiversity(teamMetrics) * 500000,
            industryInfluence: this.assessCapabilityExpansion(teamMetrics) * 750000
        };
    }

    aggregateEnhancedImpacts(impacts) {
        const sumObjects = obj => Object.values(obj).reduce((a, b) => a + b, 0);
        
        return {
            totalValue: Object.values(impacts).reduce((total, impact) => 
                total + sumObjects(impact), 0),
            byCategory: {
                revenue: sumObjects(impacts.revenueImpact),
                innovation: sumObjects(impacts.innovationImpact),
                operational: sumObjects(impacts.operationalImpact),
                workforce: sumObjects(impacts.workforceImpact),
                market: sumObjects(impacts.marketImpact)
            }
        };
    }
}

module.exports = new EnterpriseAnalytics();