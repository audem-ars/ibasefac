const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/server');
const Gamification = require('../src/models/gamification');
const User = require('../src/models/user');
const jwt = require('jsonwebtoken');

describe('Gamification System API', () => {
    let userToken;
    let testUser;
    let userGame;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/test-edu-platform');
        
        testUser = await User.create({
            name: 'Game Test User',
            email: 'gameuser@test.com',
            password: '123456'
        });

        userToken = jwt.sign(
            { user: { id: testUser._id } },
            process.env.JWT_SECRET
        );
    });

    beforeEach(async () => {
        await Gamification.deleteMany({});

        userGame = await Gamification.create({
            userId: testUser._id,
            level: {
                current: 1,
                experience: 0,
                nextLevelAt: 100
            },
            achievements: [],
            streaks: {
                currentStreak: 0,
                longestStreak: 0,
                lastActive: new Date(),
                multiplier: 1
            }
        });
    });

    afterAll(async () => {
        await User.deleteMany({});
        await Gamification.deleteMany({});
        await mongoose.connection.close();
    });

    describe('POST /api/gamification/experience', () => {
        it('should update experience points', async () => {
            const res = await request(app)
                .post('/api/gamification/experience')
                .set('x-auth-token', userToken)
                .send({
                    actionType: 'quiz_completion',
                    value: 50
                });

            expect(res.status).toBe(200);
            expect(res.body.level.experience).toBe(50);
        });

        it('should level up when experience exceeds threshold', async () => {
            const res = await request(app)
                .post('/api/gamification/experience')
                .set('x-auth-token', userToken)
                .send({
                    actionType: 'quiz_completion',
                    value: 150
                });

            expect(res.status).toBe(200);
            expect(res.body.level.current).toBe(2);
            expect(res.body.level.experience).toBeLessThan(100);
        });
    });

    describe('POST /api/gamification/streak', () => {
        it('should update streak for daily activity', async () => {
            const res = await request(app)
                .post('/api/gamification/streak')
                .set('x-auth-token', userToken);

            expect(res.status).toBe(200);
            expect(res.body.currentStreak).toBe(1);
            expect(res.body.multiplier).toBeGreaterThan(1);
        });
    });

    describe('GET /api/gamification/achievements', () => {
        it('should get user achievements', async () => {
            const res = await request(app)
                .get('/api/gamification/achievements')
                .set('x-auth-token', userToken);

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBeTruthy();
        });
    });
});