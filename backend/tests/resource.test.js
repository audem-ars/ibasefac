const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/server');
const Resource = require('../src/models/resource');
const User = require('../src/models/user');
const jwt = require('jsonwebtoken');

describe('Resource Management API', () => {
    let userToken;
    let adminToken;
    let testUser;
    let testAdmin;
    let testResource;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/test-edu-platform');
        
        testUser = await User.create({
            name: 'Resource Test User',
            email: 'resource@test.com',
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
        await Resource.deleteMany({});

        testResource = await Resource.create({
            title: 'JavaScript Basics',
            type: 'course',
            format: 'video',
            content: {
                url: 'https://example.com/video',
                duration: 3600
            },
            metadata: {
                author: testAdmin._id,
                skillLevel: 'beginner',
                tags: ['javascript', 'programming']
            }
        });
    });

    afterAll(async () => {
        await User.deleteMany({});
        await Resource.deleteMany({});
        await mongoose.connection.close();
    });

    describe('GET /api/resources', () => {
        it('should get all resources', async () => {
            const res = await request(app)
                .get('/api/resources')
                .set('x-auth-token', userToken);

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBeTruthy();
            expect(res.body[0].title).toBe('JavaScript Basics');
        });
    });

    describe('POST /api/resources', () => {
        it('should create new resource as admin', async () => {
            const res = await request(app)
                .post('/api/resources')
                .set('x-auth-token', adminToken)
                .send({
                    title: 'New Resource',
                    type: 'document',
                    format: 'pdf',
                    content: {
                        url: 'https://example.com/document'
                    },
                    metadata: {
                        skillLevel: 'intermediate',
                        tags: ['python']
                    }
                });

            expect(res.status).toBe(200);
            expect(res.body.title).toBe('New Resource');
        });
    });

    describe('POST /api/resources/:id/review', () => {
        it('should add resource review', async () => {
            const res = await request(app)
                .post(`/api/resources/${testResource._id}/review`)
                .set('x-auth-token', userToken)
                .send({
                    rating: 5,
                    comment: 'Great resource!'
                });

            expect(res.status).toBe(200);
            expect(res.body.quality.reviews[0].rating).toBe(5);
        });
    });
});