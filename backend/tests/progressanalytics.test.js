const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/server');
const ProgressAnalytics = require('../src/models/progressanalytics');
const User = require('../src/models/user');
const jwt = require('jsonwebtoken');

describe('Progress Analytics API', () => {
    let userToken;
    let adminToken;
    let testUser;
    let testAdmin;
    let userProgress;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/test-edu-platform');
        
        testUser = await User.create({
            name: 'Progress Test User',
            email: 'progress@test.com',
            password: '123456'
        });

        testAdmin = await User.create({
            name: 'Admin User',
            email: 'admin@test.com',
            password: '123456',
            role: 'admin'
        });

        userToken = jwt.sign({ user: { id: testUser._id } }, process.env.JWT_SECRET);
        adminToken = jwt.sign({ user: { id: testAdmin._id } }, process.env.JWT_SECRET);
    });

    beforeEach(async () => {
        await ProgressAnalytics.deleteMany({});

        userProgress = await ProgressAnalytics.create({
            userId: testUser._id,
            overallProgress: {
                completionRate: 45,
                averageScore: 78,
                studyTime: 1200,
                skillsMastered: 3,
                topicsCompleted: 5,
                lastActivity: new Date()
            }
        });
    });

    afterAll(async () => {
        await User.deleteMany({});
        await ProgressAnalytics.deleteMany({});
        await mongoose.connection.close();
    });

    describe('GET /api/progress-analytics/user', () => {
        it('should get user progress analytics', async () => {
            const res = await request(app)
                .get('/api/progress-analytics/user')
                .set('x-auth-token', userToken);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('overallProgress');
            expect(res.body.overallProgress.completionRate).toBe(45);
        });
    });

    describe('GET /api/progress-analytics/predictions', () => {
        it('should get learning predictions', async () => {
            const res = await request(app)
                .get('/api/progress-analytics/predictions')
                .set('x-auth-token', userToken);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('estimatedCompletion');
            expect(res.body).toHaveProperty('projectedGrowth');
        });
    });

    describe('GET /api/progress-analytics/admin/overview', () => {
        it('should allow admin to get platform analytics', async () => {
            const res = await request(app)
                .get('/api/progress-analytics/admin/overview')
                .set('x-auth-token', adminToken);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('totalUsers');
            expect(res.body).toHaveProperty('averageEngagement');
        });

        it('should not allow regular users to access admin analytics', async () => {
            const res = await request(app)
                .get('/api/progress-analytics/admin/overview')
                .set('x-auth-token', userToken);

            expect(res.status).toBe(403);
        });
    });
});