const mongoose = require('mongoose');

const careeroutcomesSchema = new mongoose.Schema({
   userId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
       required: true
   },
   pathId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'ailearningpath',
       required: true
   },
   outcomes: {
       roleTransition: {
           previousRole: String,
           newRole: String,
           transitionDate: Date,
           salaryIncrease: Number
       },
       skillsGained: [{
           skill: String,
           proficiencyLevel: {
               type: Number,
               min: 0,
               max: 1
           },
           verifiedAt: Date
       }],
       achievements: [{
           type: String,
           achievedAt: Date,
           impact: String
       }]
   },
   marketValue: {
       baseline: Number,
       current: Number,
       projected: Number,
       lastUpdated: Date
   },
   progressMetrics: [{
       timestamp: Date,
       metricType: String,
       value: Number,
       context: String
   }]
});

module.exports = mongoose.model('careeroutcomes', careeroutcomesSchema);