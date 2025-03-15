const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import models 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/authroutes');
const userRoutes = require('./routes/userroutes');
const courseRoutes = require('./routes/courseroutes');
const quizRoutes = require('./routes/quizroutes');
const socialLearningRoutes = require('./routes/sociallearningroutes');
const collaborationRoutes = require('./routes/collaborationroutes');
const gamificationRoutes = require('./routes/gamificationroutes');
const masteryRoutes = require('./routes/masteryroutes');
const resourceRoutes = require('./routes/resourceroutes');
const studyAssistantRoutes = require('./routes/studyassistantroutes');
const progressAnalyticsRoutes = require('./routes/progressanalyticsroutes');
const certificationRoutes = require('./routes/certificationroutes');
const enterpriseRoutes = require('./routes/enterpriseroutes');
const partnershipRoutes = require('./routes/partnershiproutes');
const marketplaceRoutes = require('./routes/marketplaceroutes');
const ailearningpathroutes = require('./routes/ailearningpathroutes');
const successMetricsRoutes = require('./routes/successmetricsroutes');
const transformationRoutes = require('./routes/transformationroutes');
const careeroutcomesRoutes = require('./routes/careeroutcomesroutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/social', socialLearningRoutes);
app.use('/api/collaboration', collaborationRoutes);
app.use('/api/gamification', gamificationRoutes);
app.use('/api/mastery', masteryRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/assistant', studyAssistantRoutes);
app.use('/api/progress-analytics', progressAnalyticsRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/enterprise', enterpriseRoutes);
app.use('/api/partnerships', partnershipRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/ai-learning-path', ailearningpathroutes);
app.use('/api/analytics', successMetricsRoutes);
app.use('/api/transformation', transformationRoutes);
app.use('/api/careeroutcomes', careeroutcomesRoutes);

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Basic route
app.get('/', (req, res) => {
    res.send('AI Education Platform API');
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;