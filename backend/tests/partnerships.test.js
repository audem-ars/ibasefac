const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/server');
const IndustryPartnership = require('../src/models/industrypartnership');
const User = require('../src/models/user');
const jwt = require('jsonwebtoken');

describe('Industry Partnership API', () => {
    let adminToken;
    let partnerToken;
    let testAdmin;
    let testPartner;
    let testPartnership;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/test-edu-platform');
        
        // Create admin user
        testAdmin = await User.create({
            name: 'Admin User',
            email: 'admin@test.com',
            password: '123456',
            role: 'admin'
        });

        // Create partner user
        testPartner = await User.create({
            name: 'Partner User',
            email: 'partner@test.com',
            password: '123456',
            role: 'partner'
        });

        adminToken = jwt.sign(
            { user: { id: testAdmin._id } },
            process.env.JWT_SECRET
        );

        partnerToken = jwt.sign(
            { user: { id: testPartner._id } },
            process.env.JWT_SECRET
        );
    });

    beforeEach(async () => {
        await IndustryPartnership.deleteMany({});

        // Create a test partnership
        testPartnership = await IndustryPartnership.create({
            partner: {
                name: 'Test Partner Corp',
                type: 'tech_company',
                tier: 'platinum',
                contractValue: {
                    annual: 100000,
                    revenueShare: 0.3
                },
                status: 'active'
            },
            offerings: {
                certifications: [{
                    name: 'Advanced Tech Cert',
                    price: 499.99,
                    validity: 12,
                    demandScore: 85
                }],
                courses: [{
                    name: 'Tech Fundamentals',
                    level: 'intermediate',
                    price: 299.99
                }]
            }
        });
    });

    afterAll(async () => {
        await User.deleteMany({});
        await IndustryPartnership.deleteMany({});
        await mongoose.connection.close();
    });

    describe('POST /api/partnerships/create', () => {
        it('should create a new partnership when admin', async () => {
            const partnershipData = {
                partnerDetails: {
                    name: 'New Partner Inc',
                    type: 'industry_leader',
                    tier: 'gold',
                    contractValue: {
                        annual: 75000,
                        revenueShare: 0.25
                    }
                },
                offerings: {
                    certifications: [{
                        name: 'Industry Cert',
                        price: 399.99,
                        validity: 12,
                        demandScore: 80
                    }]
                }
            };

            const res = await request(app)
                .post('/api/partnerships/create')
                .set('x-auth-token', adminToken)
                .send(partnershipData);

            expect(res.status).toBe(200);
            expect(res.body.partner.name).toBe('New Partner Inc');
            expect(res.body.partner.tier).toBe('gold');
        });

        it('should not allow non-admin to create partnership', async () => {
            const res = await request(app)
                .post('/api/partnerships/create')
                .set('x-auth-token', partnerToken)
                .send({});

            expect(res.status).toBe(403);
        });
    });

    describe('PUT /api/partnerships/:id/offerings', () => {
        it('should update partnership offerings', async () => {
            const newOfferings = {
                certifications: [{
                    name: 'Updated Cert',
                    price: 599.99,
                    validity: 24,
                    demandScore: 90
                }]
            };

            const res = await request(app)
                .put(`/api/partnerships/${testPartnership._id}/offerings`)
                .set('x-auth-token', adminToken)
                .send(newOfferings);

            expect(res.status).toBe(200);
            expect(res.body.offerings.certifications[0].name).toBe('Updated Cert');
            expect(res.body.offerings.certifications[0].price).toBe(599.99);
        });
    });

    describe('GET /api/partnerships/:id/analytics', () => {
        it('should get partnership analytics', async () => {
            const res = await request(app)
                .get(`/api/partnerships/${testPartnership._id}/analytics`)
                .set('x-auth-token', adminToken);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('revenue');
            expect(res.body).toHaveProperty('marketingData');
            expect(res.body).toHaveProperty('qualityMetrics');
        });
    });

    describe('POST /api/partnerships/:id/revenue/update', () => {
        it('should update partnership revenue data', async () => {
            const revenueData = {
                certificationSales: [{
                    month: new Date(),
                    revenue: 25000,
                    certifications: {
                        'Advanced Tech Cert': 50
                    }
                }]
            };

            const res = await request(app)
                .post(`/api/partnerships/${testPartnership._id}/revenue/update`)
                .set('x-auth-token', adminToken)
                .send(revenueData);

            expect(res.status).toBe(200);
            expect(res.body.revenue.certificationSales[0].revenue).toBe(25000);
        });
    });

    describe('GET /api/partnerships/tier/:tier', () => {
        it('should get all partnerships of specific tier', async () => {
            const res = await request(app)
                .get('/api/partnerships/tier/platinum')
                .set('x-auth-token', adminToken);

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBeTruthy();
            expect(res.body[0].partner.tier).toBe('platinum');
        });
    });
});