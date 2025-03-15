const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const Successmetrics = require('../src/models/successmetrics');
const User = require('../src/models/user');
const jwt = require('jsonwebtoken');

describe('Success Metrics Tests', () => {
    let testUser;
    let authToken;
    let pathId;

    before(async () => {
        // Connect to test database
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-edu-test');
        
        // Create test user
        testUser = await User.create({
            name: 'Test User',
            email: 'test@test.com',
            password: '123456'
        });

        // Create auth token
        authToken = jwt.sign(
            { user: { id: testUser._id } },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1d' }
        );

        // Create test path
        pathId = new mongoose.Types.ObjectId();
    });

    describe('POST /api/success-metrics/update/:pathId', () => {
        it('should calculate and return success metrics', async () => {
            const response = await chai
                .request(app)
                .post(`/api/success-metrics/update/${pathId}`)
                .set('x-auth-token', authToken);

            expect(response).to.have.status(200);
            expect(response.body).to.be.an('object');
            expect(response.body.metrics).to.exist;
            expect(response.body.metrics.skillGrowth).to.be.a('number');
            expect(response.body.metrics.conceptMastery).to.be.a('number');
            expect(response.body.metrics.learningVelocity).to.be.a('number');
            expect(response.body.revenueMetrics).to.exist;
            expect(response.body.revenueMetrics.projectedRevenue).to.be.above(0);
        });

        it('should calculate breakthrough potential', async () => {
            const response = await chai
                .request(app)
                .post(`/api/success-metrics/update/${pathId}`)
                .set('x-auth-token', authToken);

            expect(response.body.breakthroughPotential).to.exist;
            expect(response.body.breakthroughPotential.score).to.be.a('number');
            expect(response.body.breakthroughPotential.accelerationOpportunities).to.be.an('array');
        });

        it('should calculate transformation value', async () => {
            const response = await chai
                .request(app)
                .post(`/api/success-metrics/update/${pathId}`)
                .set('x-auth-token', authToken);

            expect(response.body.valueProjection).to.exist;
            expect(response.body.valueProjection.shortTerm).to.exist;
            expect(response.body.valueProjection.mediumTerm).to.exist;
            expect(response.body.valueProjection.longTerm).to.exist;
            expect(response.body.valueProjection.valueMultipliers).to.exist;
        });

        it('should track user progress over time', async () => {
            const response = await chai
                .request(app)
                .post(`/api/success-metrics/update/${pathId}`)
                .set('x-auth-token', authToken);

            expect(response.body.timelineMetrics).to.be.an('array');
            expect(response.body.timelineMetrics[0]).to.have.property('timestamp');
            expect(response.body.timelineMetrics[0]).to.have.property('value');
            expect(response.body.timelineMetrics[0]).to.have.property('context');
        });
    });

    describe('Revenue and Enterprise Value Calculations', () => {
        it('should project significant revenue potential', async () => {
            const response = await chai
                .request(app)
                .post(`/api/success-metrics/update/${pathId}`)
                .set('x-auth-token', authToken);

            // Test for $40M/year potential
            expect(response.body.revenueMetrics.projectedRevenue).to.be.above(40000000);
            expect(response.body.revenueMetrics.optimizationPotential).to.be.above(response.body.revenueMetrics.projectedRevenue);
        });

        it('should calculate enterprise impact', async () => {
            const response = await chai
                .request(app)
                .post(`/api/success-metrics/update/${pathId}`)
                .set('x-auth-token', authToken);

            expect(response.body.enterpriseMetrics).to.exist;
            expect(response.body.enterpriseMetrics.productivityGain).to.be.above(0);
            expect(response.body.enterpriseMetrics.innovationScore).to.be.above(0);
            expect(response.body.enterpriseMetrics.scalingPotential).to.be.above(0);
        });
    });

    after(async () => {
        // Clean up
        await User.deleteOne({ _id: testUser._id });
        await Successmetrics.deleteMany({ userId: testUser._id });
        await mongoose.connection.close();
    });
});