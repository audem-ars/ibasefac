const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/server');
const User = require('../src/models/user');

describe('Auth Endpoints', () => {
    beforeAll(async () => {
        // Connect to a test database before running tests
        await mongoose.connect(process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/test-edu-platform');
    });

    beforeEach(async () => {
        // Clear users collection before each test
        await User.deleteMany({});
    });

    afterAll(async () => {
        // Disconnect after all tests are done
        await mongoose.connection.close();
    });

    describe('POST /api/auth/register', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'Test User',
                    email: 'test@test.com',
                    password: '123456'
                });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('token');
            expect(res.body).toHaveProperty('user');
            expect(res.body.user.email).toBe('test@test.com');
        });

        it('should not register user with existing email', async () => {
            // First create a user
            await User.create({
                name: 'Existing User',
                email: 'test@test.com',
                password: '123456'
            });

            // Try to create another user with same email
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'Test User',
                    email: 'test@test.com',
                    password: '123456'
                });

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('msg', 'User already exists');
        });
    });

    describe('POST /api/auth/login', () => {
        beforeEach(async () => {
            // Create a test user before each login test
            await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'Test User',
                    email: 'test@test.com',
                    password: '123456'
                });
        });

        it('should login with valid credentials', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@test.com',
                    password: '123456'
                });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('token');
        });

        it('should not login with wrong password', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@test.com',
                    password: 'wrongpassword'
                });

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('msg', 'Invalid credentials');
        });

        it('should not login with non-existent email', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'nonexistent@test.com',
                    password: '123456'
                });

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('msg', 'Invalid credentials');
        });
    });

    describe('GET /api/auth/user', () => {
        let token;

        beforeEach(async () => {
            // Create a user and get token
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'Test User',
                    email: 'test@test.com',
                    password: '123456'
                });
            token = res.body.token;
        });

        it('should get user data with valid token', async () => {
            const res = await request(app)
                .get('/api/auth/user')
                .set('x-auth-token', token);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('name', 'Test User');
            expect(res.body).toHaveProperty('email', 'test@test.com');
        });

        it('should not get user data without token', async () => {
            const res = await request(app)
                .get('/api/auth/user');

            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty('msg', 'No token, authorization denied');
        });

        it('should not get user data with invalid token', async () => {
            const res = await request(app)
                .get('/api/auth/user')
                .set('x-auth-token', 'invalid-token');

            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty('msg', 'Token is not valid');
        });
    });
});