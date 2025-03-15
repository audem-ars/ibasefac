const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/server');
const Certification = require('../src/models/certification');
const User = require('../src/models/user');
const jwt = require('jsonwebtoken');

describe('Certification System API', () => {
    let userToken;
    let adminToken;
    let testUser;
    let testAdmin;
    let testCertification;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/test-edu-platform');
        
        // Create test user
        testUser = await User.create({
            name: 'Cert Test User',
            email: 'certuser@test.com',
            password: '123456'
        });

        // Create admin user
        testAdmin = await User.create({
            name: 'Cert Admin',
            email: 'certadmin@test.com',
            password: '123456',
            role: 'admin'
        });

        userToken = jwt.sign(
            { user: { id: testUser._id } },
            process.env.JWT_SECRET
        );

        adminToken = jwt.sign(
            { user: { id: testAdmin._id } },
            process.env.JWT_SECRET
        );
    });

    beforeEach(async () => {
        await Certification.deleteMany({});

        // Create test certification
        testCertification = await Certification.create({
            name: 'Advanced Developer Certification',
            type: 'skill',
            level: 'advanced',
            requirements: {
                skills: [{
                    skillId: new mongoose.Types.ObjectId(),
                    requiredLevel: 80,
                    weightage: 0.6
                }],
                assessments: [{
                    type: 'practical',
                    passingScore: 85,
                    attempts: 3
                }]
            },
            validation: {
                method: 'hybrid',
                expiryPeriod: 12
            },
            marketValue: {
                industries: ['Technology', 'Software Development'],
                roles: ['Senior Developer', 'Tech Lead'],
                averageSalaryImpact: 15000,
                demandLevel: 'high'
            }
        });
    });

    afterAll(async () => {
        await User.deleteMany({});
        await Certification.deleteMany({});
        await mongoose.connection.close();
    });

    describe('GET /api/certifications', () => {
        it('should get all available certifications', async () => {
            const res = await request(app)
                .get('/api/certifications')
                .set('x-auth-token', userToken);

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBeTruthy();
            expect(res.body[0].name).toBe('Advanced Developer Certification');
        });
    });

    describe('POST /api/certifications/verify-eligibility', () => {
        it('should verify user eligibility for certification', async () => {
            const res = await request(app)
                .post(`/api/certifications/${testCertification._id}/verify-eligibility`)
                .set('x-auth-token', userToken);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('eligible');
            expect(res.body).toHaveProperty('requirements');
            expect(res.body).toHaveProperty('missingPrerequisites');
        });
    });

    describe('POST /api/certifications/start-assessment', () => {
        it('should start certification assessment process', async () => {
            const res = await request(app)
                .post(`/api/certifications/${testCertification._id}/start-assessment`)
                .set('x-auth-token', userToken);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('assessmentId');
            expect(res.body).toHaveProperty('timeLimit');
            expect(res.body).toHaveProperty('questions');
        });

        it('should not start assessment if prerequisites not met', async () => {
            // First, set user skills below requirement
            await User.findByIdAndUpdate(testUser._id, {
                'skills.level': 60
            });

            const res = await request(app)
                .post(`/api/certifications/${testCertification._id}/start-assessment`)
                .set('x-auth-token', userToken);

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('msg', 'Prerequisites not met');
        });
    });

    describe('POST /api/certifications/submit-assessment', () => {
        it('should submit and grade assessment', async () => {
            // First start assessment
            const startRes = await request(app)
                .post(`/api/certifications/${testCertification._id}/start-assessment`)
                .set('x-auth-token', userToken);

            const submitRes = await request(app)
                .post(`/api/certifications/submit-assessment/${startRes.body.assessmentId}`)
                .set('x-auth-token', userToken)
                .send({
                    answers: [
                        {
                            questionId: startRes.body.questions[0]._id,
                            answer: 'test answer'
                        }
                    ]
                });

            expect(submitRes.status).toBe(200);
            expect(submitRes.body).toHaveProperty('score');
            expect(submitRes.body).toHaveProperty('passed');
            expect(submitRes.body).toHaveProperty('feedback');
        });
    });

    describe('GET /api/certifications/verify/:hash', () => {
        it('should verify valid certification', async () => {
            const res = await request(app)
                .get(`/api/certifications/verify/${testCertification.earners[0]?.verificationHash}`)
                .set('x-auth-token', userToken);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('valid');
            expect(res.body).toHaveProperty('certificationDetails');
        });

        it('should reject invalid verification hash', async () => {
            const res = await request(app)
                .get('/api/certifications/verify/invalid-hash')
                .set('x-auth-token', userToken);

            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty('msg', 'Certification not found');
        });
    });

    describe('GET /api/certifications/user-certifications', () => {
        it('should get user certifications', async () => {
            const res = await request(app)
                .get('/api/certifications/user-certifications')
                .set('x-auth-token', userToken);

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBeTruthy();
            expect(res.body).toHaveProperty('length');
        });
    });

    describe('POST /api/certifications/admin/create', () => {
        it('should allow admin to create new certification', async () => {
            const newCertData = {
                name: 'New Certification',
                type: 'course',
                level: 'intermediate',
                requirements: {
                    skills: [{
                        skillId: new mongoose.Types.ObjectId(),
                        requiredLevel: 70,
                        weightage: 0.5
                    }],
                    assessments: [{
                        type: 'quiz',
                        passingScore: 80,
                        attempts: 2
                    }]
                }
            };

            const res = await request(app)
                .post('/api/certifications/admin/create')
                .set('x-auth-token', adminToken)
                .send(newCertData);

            expect(res.status).toBe(200);
            expect(res.body.name).toBe('New Certification');
        });

        it('should not allow non-admin to create certification', async () => {
            const res = await request(app)
                .post('/api/certifications/admin/create')
                .set('x-auth-token', userToken)
                .send({});

            expect(res.status).toBe(403);
        });
    });
});