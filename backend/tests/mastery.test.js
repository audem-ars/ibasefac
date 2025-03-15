const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/server');
const Mastery = require('../src/models/mastery');
const User = require('../src/models/user');
const jwt = require('jsonwebtoken');

describe('Mastery System API', () => {
    let userToken;
    let testUser;
    let userMastery;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/test-edu-platform');
        
        testUser = await User.create({
            name: 'Mastery Test User',
            email: 'masteryuser@test.com',
            password: '123456'
        });

        userToken = jwt.sign(
            { user: { id: testUser._id } },
            process.env.JWT_SECRET
        );
    });

    beforeEach(async () => {
        await Mastery.deleteMany({});

        userMastery = await Mastery.create({
            userId: testUser._id,
            skills: [{
                name: 'JavaScript',
                category: 'Programming',
                level: 0,
                progress: {
                    currentXP: 0,
                    nextLevelXP: 100
                },
                proficiency: 'novice'
            }]
        });
    });

    afterAll(async () => {
        await User.deleteMany({});
        await Mastery.deleteMany({});
        await mongoose.connection.close();
    });

    describe('POST /api/mastery/skill/update', () => {
        it('should update skill mastery', async () => {
            const res = await request(app)
                .post('/api/mastery/skill/update')
                .set('x-auth-token', userToken)
                .send({
                    skillName: 'JavaScript',
                    score: 85,
                    activity: 'quiz_completion'
                });

            expect(res.status).toBe(200);
            expect(res.body.skills[0].progress.currentXP).toBeGreaterThan(0);
        });
    });

    describe('GET /api/mastery/progress', () => {
        it('should get user mastery progress', async () => {
            const res = await request(app)
                .get('/api/mastery/progress')
                .set('x-auth-token', userToken);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('skills');
            expect(Array.isArray(res.body.skills)).toBeTruthy();
        });
    });
});