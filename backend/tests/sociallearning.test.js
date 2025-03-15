const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/server');
const SocialLearning = require('../src/models/sociallearning');
const User = require('../src/models/user');
const jwt = require('jsonwebtoken');

describe('Social Learning API', () => {
    let userToken;
    let testUser;
    let testGroup;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/test-edu-platform');
        
        testUser = await User.create({
            name: 'Social Test User',
            email: 'social@test.com',
            password: '123456'
        });

        userToken = jwt.sign({ user: { id: testUser._id } }, process.env.JWT_SECRET);
    });

    beforeEach(async () => {
        await SocialLearning.deleteMany({});

        testGroup = await SocialLearning.create({
            userId: testUser._id,
            studyGroup: {
                name: 'Test Study Group',
                members: [{
                    userId: testUser._id,
                    role: 'leader'
                }],
                topics: ['JavaScript', 'React'],
                level: 'intermediate'
            }
        });
    });

    afterAll(async () => {
        await User.deleteMany({});
        await SocialLearning.deleteMany({});
        await mongoose.connection.close();
    });

    describe('POST /api/social/group/create', () => {
        it('should create a study group', async () => {
            const res = await request(app)
                .post('/api/social/group/create')
                .set('x-auth-token', userToken)
                .send({
                    name: 'New Study Group',
                    topics: ['Python', 'Machine Learning'],
                    level: 'beginner'
                });

            expect(res.status).toBe(200);
            expect(res.body.studyGroup.name).toBe('New Study Group');
            expect(res.body.studyGroup.members[0].role).toBe('leader');
        });
    });

    describe('POST /api/social/peer-review', () => {
        it('should submit peer assessment', async () => {
            const res = await request(app)
                .post('/api/social/peer-review')
                .set('x-auth-token', userToken)
                .send({
                    assesseeId: new mongoose.Types.ObjectId(),
                    quizId: new mongoose.Types.ObjectId(),
                    feedback: 'Great work!',
                    rating: 4
                });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('feedback');
            expect(res.body).toHaveProperty('rating', 4);
        });
    });

    describe('POST /api/social/collaboration', () => {
        it('should start a collaboration session', async () => {
            const res = await request(app)
                .post('/api/social/collaboration')
                .set('x-auth-token', userToken)
                .send({
                    type: 'groupProject',
                    participants: [testUser._id],
                    content: {
                        title: 'Group Project',
                        description: 'Collaborative coding project'
                    }
                });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('type', 'groupProject');
            expect(res.body.participants).toHaveLength(1);
        });
    });
});