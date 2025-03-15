const mongoose = require('mongoose');
const Successmetrics = require('../models/successmetrics');
const Careeroutcomes = require('../models/careeroutcomes');
const Breakthroughs = require('../models/breakthroughs');
const Ailearningpath = require('../models/ailearningpath');

// Constants for transformation system
const TECHNICAL_MASTERY_LEVELS = {
  foundation: {
    conceptual: {
      stages: ['pattern_recognition', 'mental_model_building', 'intuitive_understanding'],
      practices: ['concept_mapping', 'analogy_creation', 'first_principles_analysis'],
      interventions: ['misconception_clearing', 'foundational_strengthening', 'gap_bridging']
    },
    practical: {
      stages: ['implementation_fluency', 'problem_decomposition', 'solution_architecture'],
      practices: ['rapid_prototyping', 'code_review_cycles', 'optimization_exercises'],
      interventions: ['hands_on_workshops', 'pair_programming', 'code_challenges']
    }
  },
  advanced: {
    innovation: {
      stages: ['pattern_synthesis', 'creative_application', 'novel_solution_design'],
      practices: ['cross_domain_integration', 'innovation_sprints', 'breakthrough_exercises'],
      interventions: ['innovation_workshops', 'experimental_projects', 'breakthrough_challenges']
    },
    mastery: {
      stages: ['expert_intuition', 'teaching_ability', 'knowledge_synthesis'],
      practices: ['mentorship_programs', 'knowledge_creation', 'mastery_projects'],
      interventions: ['expert_shadowing', 'teaching_opportunities', 'research_projects']
    }
  }
};

const MINDSET_TRANSFORMATION = {
  corePillars: {
    identityEvolution: {
      stages: ['awareness', 'acceptance', 'transformation', 'integration'],
      markers: {
        awareness: 'Recognition of limiting beliefs and patterns',
        acceptance: 'Embracing growth and possibility',
        transformation: 'Active identity reconstruction',
        integration: 'Embodiment of new identity'
      },
      interventions: {
        reflection: ['identity_mapping', 'belief_examination', 'pattern_recognition'],
        action: ['identity_experiments', 'comfort_zone_expansion', 'new_behavior_integration'],
        integration: ['success_story_creation', 'identity_reinforcement', 'community_building']
      }
    },
    creativeLiberation: {
      stages: ['unblocking', 'exploration', 'manifestation', 'mastery'],
      markers: {
        unblocking: 'Removing creative limitations',
        exploration: 'Expanding creative possibilities',
        manifestation: 'Bringing visions into reality',
        mastery: 'Consistent creative flow'
      },
      interventions: {
        energetic: ['flow_state_practices', 'creative_rituals', 'energy_management'],
        practical: ['creative_challenges', 'project_creation', 'innovation_exercises'],
        spiritual: ['vision_quests', 'purpose_alignment', 'manifestation_practices']
      }
    }
  },
  breakthroughCatalysts: {
    rapidTransformation: {
      triggers: ['pattern_interruption', 'perspective_shifts', 'breakthrough_experiences'],
      practices: ['immersive_experiences', 'breakthrough_sessions', 'transformation_sprints'],
      integration: ['stabilization_practices', 'habit_formation', 'identity_reinforcement']
    },
    sustainedGrowth: {
      foundations: ['daily_practices', 'growth_rituals', 'progress_tracking'],
      acceleration: ['momentum_building', 'compound_growth', 'breakthrough_stacking'],
      mastery: ['teaching_others', 'community_leadership', 'legacy_creation']
    }
  }
};

const TRANSFORMATION_VALUES = {
  baselineShifts: {
    technical: {
      skillMastery: 25000,
      innovationCapacity: 35000,
      teachingAbility: 45000
    },
    mindset: {
      identityEvolution: 50000,
      creativeLiberation: 75000,
      purposeAlignment: 100000
    },
    impact: {
      individualBreakthrough: 150000,
      communityTransformation: 250000,
      societalContribution: 500000
    }
  },
  multiplicativeFactors: {
    implementation: 1.5,
    innovation: 2.0,
    transformation: 3.0,
    legacy: 4.0
  }
};

class TransformationController {
  constructor() {
    this.transformationSchema = new mongoose.Schema({
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      technicalMastery: {
        currentLevel: String,
        activeStages: [String],
        completedPractices: [String],
        breakthroughMoments: [{
          type: String,
          timestamp: Date,
          impact: Number,
          description: String
        }]
      },
      mindsetTransformation: {
        identityStage: String,
        creativeStage: String,
        breakthroughs: [{
          type: String,
          category: String,
          timestamp: Date,
          impact: Number,
          description: String
        }],
        transformationMarkers: [{
          category: String,
          marker: String,
          achievedAt: Date,
          significance: Number
        }]
      },
      valueCreation: {
        immediateValue: Number,
        projectedValue: Number,
        legacyValue: Number,
        transformationMultiplier: Number,
        valueBreakdown: {
          technical: Number,
          mindset: Number,
          impact: Number
        }
      },
      interventions: [{
        type: String,
        category: String,
        timestamp: Date,
        effectiveness: Number,
        nextSteps: [String]
      }]
    });
  }

  async initializeTransformation(userId) {
    try {
      const transformation = new this.Transformation({
        userId,
        technicalMastery: {
          currentLevel: 'foundation',
          activeStages: ['pattern_recognition', 'implementation_fluency'],
          completedPractices: []
        },
        mindsetTransformation: {
          identityStage: 'awareness',
          creativeStage: 'unblocking'
        },
        valueCreation: {
          immediateValue: 0,
          projectedValue: 0,
          legacyValue: 0,
          transformationMultiplier: 1,
          valueBreakdown: {
            technical: 0,
            mindset: 0,
            impact: 0
          }
        }
      });

      await transformation.save();
      return transformation;
    } catch (error) {
      console.error('Error initializing transformation:', error);
      throw error;
    }
  }

  async trackBreakthrough(userId, breakthroughData) {
    try {
      const transformation = await this.Transformation.findOne({ userId });
      if (!transformation) throw new Error('Transformation not found');

      const impactValue = this.calculateBreakthroughImpact(breakthroughData);
      
      const breakthrough = {
        type: breakthroughData.type,
        category: breakthroughData.category,
        timestamp: new Date(),
        impact: impactValue,
        description: breakthroughData.description
      };

      transformation.mindsetTransformation.breakthroughs.push(breakthrough);
      
      // Update value metrics
      transformation.valueCreation.immediateValue += impactValue;
      transformation.valueCreation.projectedValue = 
        this.calculateProjectedValue(transformation);
      transformation.valueCreation.legacyValue = 
        this.calculateLegacyValue(transformation);

      await transformation.save();
      await this.triggerInterventions(userId, breakthrough);
      
      return transformation;
    } catch (error) {
      console.error('Error tracking breakthrough:', error);
      throw error;
    }
  }

  calculateBreakthroughImpact(breakthroughData) {
    const baseValue = TRANSFORMATION_VALUES.baselineShifts;
    let impact = 0;

    if (breakthroughData.category === 'technical') {
      impact = baseValue.technical[breakthroughData.type] || 25000;
    } else if (breakthroughData.category === 'mindset') {
      impact = baseValue.mindset[breakthroughData.type] || 50000;
    } else if (breakthroughData.category === 'impact') {
      impact = baseValue.impact[breakthroughData.type] || 150000;
    }

    const multiplier = TRANSFORMATION_VALUES.multiplicativeFactors[breakthroughData.type] || 1;
    return impact * multiplier;
  }

  calculateProjectedValue(transformation) {
    const immediateValue = transformation.valueCreation.immediateValue;
    const breakthroughs = transformation.mindsetTransformation.breakthroughs;
    const technicalLevel = transformation.technicalMastery.currentLevel;

    let projectedMultiplier = 1;

    // Calculate based on breakthrough momentum
    if (breakthroughs.length > 0) {
      const recentBreakthroughs = breakthroughs.slice(-3);
      const averageImpact = recentBreakthroughs.reduce((acc, b) => acc + b.impact, 0) / recentBreakthroughs.length;
      projectedMultiplier += (averageImpact / 50000); // Normalize to a reasonable multiplier
    }

    // Add technical mastery multiplier
    if (technicalLevel === 'advanced') {
      projectedMultiplier *= TRANSFORMATION_VALUES.multiplicativeFactors.innovation;
    }

    return immediateValue * projectedMultiplier;
  }

  calculateLegacyValue(transformation) {
    const projectedValue = transformation.valueCreation.projectedValue;
    const transformationMarkers = transformation.mindsetTransformation.transformationMarkers;
    
    let legacyMultiplier = 1;

    // Calculate based on transformation depth
    transformationMarkers.forEach(marker => {
      if (marker.category === 'impact') {
        legacyMultiplier += (marker.significance / 100);
      }
    });

    return projectedValue * legacyMultiplier * TRANSFORMATION_VALUES.multiplicativeFactors.legacy;
  }

  async triggerInterventions(userId, breakthrough) {
    try {
      const transformation = await this.Transformation.findOne({ userId });
      
      // Generate personalized interventions
      const interventions = this.generateInterventions(transformation, breakthrough);
      
      // Add interventions to transformation record
      transformation.interventions.push(...interventions);
      
      // Update success metrics
      await this.updateSuccessMetrics(userId, transformation);
      
      return interventions;
    } catch (error) {
      console.error('Error triggering interventions:', error);
      throw error;
    }
  }

  generateInterventions(transformation, breakthrough) {
    const interventions = [];
    
    // Technical interventions
    if (breakthrough.category === 'technical') {
      const technicalInterventions = this.generateTechnicalInterventions(
        transformation.technicalMastery,
        breakthrough
      );
      interventions.push(...technicalInterventions);
    }
    
    // Mindset interventions
    if (breakthrough.category === 'mindset') {
      const mindsetInterventions = this.generateMindsetInterventions(
        transformation.mindsetTransformation,
        breakthrough
      );
      interventions.push(...mindsetInterventions);
    }
    
    // Integration interventions
    const integrationInterventions = this.generateIntegrationInterventions(
      transformation,
      breakthrough
    );
    interventions.push(...integrationInterventions);
    
    return interventions;
  }

  generateTechnicalInterventions(technicalMastery, breakthrough) {
    const level = technicalMastery.currentLevel;
    const stages = TECHNICAL_MASTERY_LEVELS[level];
    
    return Object.keys(stages).map(area => {
      const practices = stages[area].practices;
      const interventions = stages[area].interventions;
      
      return {
        type: 'technical',
        category: area,
        timestamp: new Date(),
        effectiveness: 0,
        nextSteps: [
          practices[Math.floor(Math.random() * practices.length)],
          interventions[Math.floor(Math.random() * interventions.length)]
        ]
      };
    });
  }

  generateMindsetInterventions(mindsetTransformation, breakthrough) {
    const { identityStage, creativeStage } = mindsetTransformation;
    const interventions = [];

    // Identity interventions
    const identityInterventions = 
      MINDSET_TRANSFORMATION.corePillars.identityEvolution.interventions;
    interventions.push({
      type: 'mindset',
      category: 'identity',
      timestamp: new Date(),
      effectiveness: 0,
      nextSteps: [
        identityInterventions.reflection[Math.floor(Math.random() * identityInterventions.reflection.length)],
        identityInterventions.action[Math.floor(Math.random() * identityInterventions.action.length)]
      ]
    });

    // Creative interventions
    const creativeInterventions = 
      MINDSET_TRANSFORMATION.corePillars.creativeLiberation.interventions;
    interventions.push({
      type: 'mindset',
      category: 'creative',
      timestamp: new Date(),
      effectiveness: 0,
      nextSteps: [
        creativeInterventions.practical[Math.floor(Math.random() * creativeInterventions.practical.length)],
        creativeInterventions.energetic[Math.floor(Math.random() * creativeInterventions.energetic.length)]
      ]
    });

    return interventions;
  }

  generateIntegrationInterventions(transformation, breakthrough) {
    const catalysts = MINDSET_TRANSFORMATION.breakthroughCatalysts;
    
    return [{
      type: 'integration',
      category: 'rapid_transformation',
      timestamp: new Date(),
      effectiveness: 0,
      nextSteps: [
        catalysts.rapidTransformation.practices[
          Math.floor(Math.random() * catalysts.rapidTransformation.practices.length)
        ],
        catalysts.rapidTransformation.integration[
          Math.floor(Math.random() * catalysts.rapidTransformation.integration.length)
        ]
      ]
    }];
  }

  async updateSuccessMetrics(userId, transformation) {
    try {
      const metrics = await Successmetrics.findOne({ userId });
      if (!metrics) throw new Error('Success metrics not found');

      // Calculate new metrics based on transformation
      const newMetrics = this.calculateTransformationMetrics(transformation);

      // Update success metrics
      metrics.transformationScore = newMetrics.transformationScore;
      metrics.breakthroughPotential = newMetrics.breakthroughPotential;
      metrics.valueCreation = newMetrics.valueCreation;

      await metrics.save();
      return metrics;
    } catch (error) {
      console.error('Error updating success metrics:', error);
      throw error;
    }
  }

  calculateTransformationMetrics(transformation) {
    // Calculate transformation score
    const technicalScore = this.calculateTechnicalScore(transformation.technicalMastery);
    const mindsetScore = this.calculateMindsetScore(transformation.mindsetTransformation);
    const valueScore = this.calculateValueScore(transformation.valueCreation);

    const transformationScore = (technicalScore + mindsetScore + valueScore) / 3;

    // Calculate breakthrough potential
    const breakthroughPotential = this.calculateBreakthroughPotential(transformation);

    // Calculate value creation metrics
    const valueCreation = {
      immediate: transformation.valueCreation.immediateValue,
      projected: transformation.valueCreation.projectedValue,
      legacy: transformation.valueCreation.legacyValue,
      multiplier: transformation.valueCreation.transformationMultiplier
    };

    return {
      transformationScore,
      breakthroughPotential,
      valueCreation
    };
  }

  calculateTechnicalScore(technicalMastery) {
    const stageCompletion = technicalMastery.completedPractices.length / 
      Object.keys(TECHNICAL_MASTERY_LEVELS[technicalMastery.currentLevel]).length;
    
    const breakthroughImpact = technicalMastery.breakthroughMoments.reduce(
      (acc, moment) => acc + moment.impact, 0
    ) / 1000000; // Normalize to 0-1 scale

    return (stageCompletion + breakthroughImpact) / 2;
  }

  calculateMindsetScore(mindsetTransformation) {
    const identityProgress = 
      MINDSET_TRANSFORMATION.corePillars.identityEvolution.stages.indexOf(mindsetTransformation.identityStage) / 3;
    
    const creativeProgress = 
      MINDSET_TRANSFORMATION.corePillars.creativeLiberation.stages.indexOf(mindsetTransformation.creativeStage) / 3;
    
    const breakthroughImpact = mindsetTransformation.breakthroughs.reduce(
      (acc, breakthrough) => acc + breakthrough.impact, 0
    ) / 1000000; // Normalize to 0-1 scale

    return (identityProgress + creativeProgress + breakthroughImpact) / 3;
  }

  calculateValueScore(valueCreation) {
    const immediateScore = valueCreation.immediateValue / 1000000; // Normalize to 0-1 scale
    const projectedScore = valueCreation.projectedValue / 5000000;
    const legacyScore = valueCreation.legacyValue / 10000000;

    return (immediateScore + projectedScore + legacyScore) / 3;
  }

  calculateBreakthroughPotential(transformation) {
    const technicalReadiness = this.calculateTechnicalReadiness(transformation.technicalMastery);
    const mindsetReadiness = this.calculateMindsetReadiness(transformation.mindsetTransformation);
    const momentumFactor = this.calculateMomentumFactor(transformation);

    return (technicalReadiness + mindsetReadiness + momentumFactor) / 3;
  }

  calculateTechnicalReadiness(technicalMastery) {
    const stageProgress = technicalMastery.activeStages.length / 
      Object.keys(TECHNICAL_MASTERY_LEVELS[technicalMastery.currentLevel]).length;
    
    const recentBreakthroughs = technicalMastery.breakthroughMoments
      .filter(moment => moment.timestamp > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
      .length;

    return (stageProgress + Math.min(recentBreakthroughs / 5, 1)) / 2;
  }

  calculateMindsetReadiness(mindsetTransformation) {
    const identityProgress = 
      MINDSET_TRANSFORMATION.corePillars.identityEvolution.stages.indexOf(mindsetTransformation.identityStage) / 3;
    
    const creativeProgress = 
      MINDSET_TRANSFORMATION.corePillars.creativeLiberation.stages.indexOf(mindsetTransformation.creativeStage) / 3;

    const recentBreakthroughs = mindsetTransformation.breakthroughs
      .filter(breakthrough => breakthrough.timestamp > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
      .length;

    return (identityProgress + creativeProgress + Math.min(recentBreakthroughs / 5, 1)) / 3;
  }

  calculateMomentumFactor(transformation) {
    const recentInterventions = transformation.interventions
      .filter(intervention => intervention.timestamp > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));

    const interventionEffectiveness = recentInterventions.reduce(
      (acc, intervention) => acc + intervention.effectiveness, 0
    ) / Math.max(recentInterventions.length, 1);

    const valueGrowth = transformation.valueCreation.projectedValue / 
      Math.max(transformation.valueCreation.immediateValue, 1);

    return (interventionEffectiveness + Math.min(valueGrowth / 5, 1)) / 2;
  }

  async generateTransformationReport(userId) {
    try {
      const transformation = await this.Transformation.findOne({ userId });
      if (!transformation) throw new Error('Transformation not found');

      return {
        overview: {
          technicalMastery: {
            level: transformation.technicalMastery.currentLevel,
            activeStages: transformation.technicalMastery.activeStages,
            completedPractices: transformation.technicalMastery.completedPractices.length,
            recentBreakthroughs: transformation.technicalMastery.breakthroughMoments
              .filter(moment => moment.timestamp > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
              .length
          },
          mindsetTransformation: {
            identityStage: transformation.mindsetTransformation.identityStage,
            creativeStage: transformation.mindsetTransformation.creativeStage,
            totalBreakthroughs: transformation.mindsetTransformation.breakthroughs.length,
            significantMarkers: transformation.mindsetTransformation.transformationMarkers
              .filter(marker => marker.significance > 0.7).length
          },
          valueCreation: {
            immediate: transformation.valueCreation.immediateValue,
            projected: transformation.valueCreation.projectedValue,
            legacy: transformation.valueCreation.legacyValue,
            multiplier: transformation.valueCreation.transformationMultiplier
          }
        },
        metrics: this.calculateTransformationMetrics(transformation),
        recommendations: this.generateRecommendations(transformation),
        nextSteps: this.identifyNextSteps(transformation)
      };
    } catch (error) {
      console.error('Error generating transformation report:', error);
      throw error;
    }
  }

  generateRecommendations(transformation) {
    const technical = this.generateTechnicalRecommendations(transformation.technicalMastery);
    const mindset = this.generateMindsetRecommendations(transformation.mindsetTransformation);
    const integration = this.generateIntegrationRecommendations(transformation);

    return { technical, mindset, integration };
  }

  generateTechnicalRecommendations(technicalMastery) {
    const level = technicalMastery.currentLevel;
    const stages = TECHNICAL_MASTERY_LEVELS[level];
    
    return Object.keys(stages).map(area => ({
      area,
      practices: stages[area].practices.filter(
        practice => !technicalMastery.completedPractices.includes(practice)
      ),
      interventions: stages[area].interventions
    }));
  }

  generateMindsetRecommendations(mindsetTransformation) {
    return {
      identity: {
        currentStage: mindsetTransformation.identityStage,
        nextStage: this.getNextStage(
          mindsetTransformation.identityStage,
          MINDSET_TRANSFORMATION.corePillars.identityEvolution.stages
        ),
        recommendations: this.getStageRecommendations('identity', mindsetTransformation.identityStage)
      },
      creative: {
        currentStage: mindsetTransformation.creativeStage,
        nextStage: this.getNextStage(
          mindsetTransformation.creativeStage,
          MINDSET_TRANSFORMATION.corePillars.creativeLiberation.stages
        ),
        recommendations: this.getStageRecommendations('creative', mindsetTransformation.creativeStage)
      }
    };
  }

  generateIntegrationRecommendations(transformation) {
    const catalysts = MINDSET_TRANSFORMATION.breakthroughCatalysts;
    
    return {
      rapidTransformation: {
        practices: catalysts.rapidTransformation.practices,
        integration: catalysts.rapidTransformation.integration
      },
      sustainedGrowth: {
        foundations: catalysts.sustainedGrowth.foundations,
        acceleration: catalysts.sustainedGrowth.acceleration
      }
    };
  }

  getNextStage(currentStage, stages) {
    const currentIndex = stages.indexOf(currentStage);
    return currentIndex < stages.length - 1 ? stages[currentIndex + 1] : 'mastery';
  }

  getStageRecommendations(type, stage) {
    if (type === 'identity') {
      return MINDSET_TRANSFORMATION.corePillars.identityEvolution.interventions;
    } else {
      return MINDSET_TRANSFORMATION.corePillars.creativeLiberation.interventions;
    }
  }

  identifyNextSteps(transformation) {
    return {
      immediate: this.getImmediateSteps(transformation),
      shortTerm: this.getShortTermSteps(transformation),
      longTerm: this.getLongTermSteps(transformation)
    };
  }

  getImmediateSteps(transformation) {
    const activeInterventions = transformation.interventions
      .filter(intervention => intervention.effectiveness < 0.7)
      .slice(-3);

    return activeInterventions.map(intervention => ({
      type: intervention.type,
      category: intervention.category,
      nextSteps: intervention.nextSteps
    }));
  }

  getShortTermSteps(transformation) {
    const technical = this.generateTechnicalRecommendations(transformation.technicalMastery);
    const mindset = this.generateMindsetRecommendations(transformation.mindsetTransformation);

    return {
      technical: technical[0]?.practices.slice(0, 3) || [],
      mindset: [
        ...mindset.identity.recommendations.reflection.slice(0, 2),
        ...mindset.creative.recommendations.practical.slice(0, 2)
      ]
    };
  }

  getLongTermSteps(transformation) {
    return {
      technicalMastery: this.getNextTechnicalLevel(transformation.technicalMastery),
      mindsetEvolution: this.getNextMindsetStages(transformation.mindsetTransformation),
      valueCreation: this.getValueCreationSteps(transformation.valueCreation)
    };
  }

  getNextTechnicalLevel(technicalMastery) {
    const currentLevel = technicalMastery.currentLevel;
    const nextLevel = currentLevel === 'foundation' ? 'advanced' : 'mastery';

    return {
      level: nextLevel,
      requirements: TECHNICAL_MASTERY_LEVELS[nextLevel],
      estimatedTimeframe: this.calculateTimeframe(technicalMastery)
    };
  }

  getNextMindsetStages(mindsetTransformation) {
    return {
      identity: this.getNextStage(
        mindsetTransformation.identityStage,
        MINDSET_TRANSFORMATION.corePillars.identityEvolution.stages
      ),
      creative: this.getNextStage(
        mindsetTransformation.creativeStage,
        MINDSET_TRANSFORMATION.corePillars.creativeLiberation.stages
      )
    };
  }

  getValueCreationSteps(valueCreation) {
    const currentValue = valueCreation.immediateValue;
    const projectedValue = valueCreation.projectedValue;
    const multiplier = valueCreation.transformationMultiplier;

    return {
      nextValueTarget: Math.round(projectedValue * 1.5),
      recommendedMultiplier: multiplier + 0.5,
      focusAreas: this.identifyValueFocusAreas(valueCreation)
    };
  }

  identifyValueFocusAreas(valueCreation) {
    const areas = [];
    
    if (valueCreation.valueBreakdown.technical < valueCreation.valueBreakdown.mindset) {
      areas.push('technical_mastery_acceleration');
    }
    if (valueCreation.valueBreakdown.mindset < valueCreation.valueBreakdown.impact) {
      areas.push('mindset_transformation_deepening');
    }
    if (valueCreation.transformationMultiplier < 2) {
      areas.push('transformation_acceleration');
    }

    return areas;
  }

  calculateTimeframe(technicalMastery) {
    const completedPractices = technicalMastery.completedPractices.length;
    const totalPractices = Object.values(TECHNICAL_MASTERY_LEVELS[technicalMastery.currentLevel])
      .reduce((acc, stage) => acc + stage.practices.length, 0);
    
    const completionRate = completedPractices / totalPractices;
    const estimatedWeeks = Math.ceil((1 - completionRate) * 12); // Base estimate of 12 weeks

    return {
      weeks: estimatedWeeks,
      intensity: estimatedWeeks < 6 ? 'high' : estimatedWeeks < 9 ? 'medium' : 'steady'
    };
  }
}

module.exports = TransformationController;