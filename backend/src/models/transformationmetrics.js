const mongoose = require('mongoose');

// Schema for tracking individual transformation metrics
const TransformationMetricsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // Breakthrough Metrics
  breakthroughScore: {
    current: Number,
    target: Number,
    milestones: [{
      name: String,
      achieved: Boolean,
      date: Date
    }]
  },
  
  // Skills and Mastery
  skillEnhancement: {
    technicalSkills: [{
      skill: String,
      proficiency: Number,
      masteryRate: Number,
      timeToMastery: Number
    }],
    mindsetShifts: [{
      category: String,
      beforeState: String,
      afterState: String,
      transformationDate: Date
    }]
  },
  
  // Career Impact
  careerTransformation: {
    initialSalary: Number,
    currentSalary: Number,
    targetSalary: Number,
    roleTransitions: [{
      fromRole: String,
      toRole: String,
      dateAchieved: Date,
      impactMetrics: Map
    }]
  },
  
  // Enterprise Value
  enterpriseContribution: {
    projectDeliverables: [{
      name: String,
      businessImpact: Number,
      dateCompleted: Date
    }],
    valueCreated: Number,
    innovationMetrics: Map
  },
  
  // Purpose and Vision
  purposeAlignment: {
    visionStatement: String,
    progressIndicators: [{
      indicator: String,
      currentValue: Number,
      targetValue: Number
    }],
    legacyMetrics: Map
  }
}, { timestamps: true });

// Methods for calculating transformation progress
TransformationMetricsSchema.methods.calculateBreakthroughPotential = function() {
  const skillProgress = this.calculateSkillProgress();
  const mindsetProgress = this.calculateMindsetProgress();
  const careerProgress = this.calculateCareerProgress();
  
  return {
    overallScore: (skillProgress + mindsetProgress + careerProgress) / 3,
    breakdown: {
      skillProgress,
      mindsetProgress,
      careerProgress
    },
    projectedValue: this.calculateProjectedValue()
  };
};

// Middleware to automatically update success metrics
TransformationMetricsSchema.pre('save', async function(next) {
  if (this.isModified('skillEnhancement') || 
      this.isModified('careerTransformation') || 
      this.isModified('enterpriseContribution')) {
    
    const metrics = await this.calculateBreakthroughPotential();
    
    // Update related success metrics
    await mongoose.model('SuccessMetrics').findOneAndUpdate(
      { userId: this.userId },
      { 
        $set: {
          'transformationValue': metrics.projectedValue,
          'breakthroughScore': metrics.overallScore,
          'lastAssessment': new Date()
        }
      },
      { upsert: true }
    );
  }
  next();
});

const TransformationMetrics = mongoose.model('TransformationMetrics', TransformationMetricsSchema);

module.exports = TransformationMetrics;