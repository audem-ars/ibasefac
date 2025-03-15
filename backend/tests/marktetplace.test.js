const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/server');
const Marketplace = require('../src/models/marketplace');
const User = require('../src/models/user');
const jwt = require('jsonwebtoken');

describe('Marketplace API', () => {
    let userToken;
    let testUser;
    let testListing;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/test-edu-platform');
        
        // Create test user
        testUser = await User.create({
            name: 'Marketplace Test User',
            email: 'marketplace@test.com',
            password: '123456'
        });

        userToken = jwt.sign(
            { user: { id: testUser._id } },
            process.env.JWT_SECRET
        );
    });

    beforeEach(async () => {
        // Clear marketplace data before each test
        await Marketplace.deleteMany({});

        // Create a test listing
        testListing = await Marketplace.create({
            listings: [{
                type: 'certification',
                title: 'AWS Certification',
                description: 'Advanced AWS Certification Course',
                price: 299.99,
                discounts: [{
                    type: 'early-bird',
                    amount: 50,
                    validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                }],
                popularity: {
                    views: 0,
                    purchases: 0,
                    rating: 0,
                    reviews: []
                }
            }]
        });
    });

    afterAll(async () => {
        await User.deleteMany({});
        await Marketplace.deleteMany({});
        await mongoose.connection.close();
    });

    describe('GET /api/marketplace/listings', () => {
        it('should get all marketplace listings', async () => {
            const res = await request(app)
                .get('/api/marketplace/listings')
                .set('x-auth-token', userToken);

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBeTruthy();
            expect(res.body[0].listings[0].title).toBe('AWS Certification');
        });

        it('should require authentication', async () => {
            const res = await request(app)
                .get('/api/marketplace/listings');

            expect(res.status).toBe(401);
        });
    });

    describe('POST /api/marketplace/transaction', () => {
        it('should process a valid transaction', async () => {
            const res = await request(app)
                .post('/api/marketplace/transaction')
                .set('x-auth-token', userToken)
                .send({
                    listingId: testListing.listings[0]._id,
                    paymentDetails: {
                        cardNumber: '4242424242424242',
                        expiryMonth: '12',
                        expiryYear: '2025',
                        cvc: '123'
                    }
                });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('status', 'completed');
            expect(res.body).toHaveProperty('amount', 299.99);
        });

        it('should apply valid discounts', async () => {
            const res = await request(app)
                .post('/api/marketplace/transaction')
                .set('x-auth-token', userToken)
                .send({
                    listingId: testListing.listings[0]._id,
                    discountCode: 'early-bird',
                    paymentDetails: {
                        cardNumber: '4242424242424242',
                        expiryMonth: '12',
                        expiryYear: '2025',
                        cvc: '123'
                    }
                });

            expect(res.status).toBe(200);
            expect(res.body.amount).toBe(249.99); // Price after $50 discount
        });

        it('should handle invalid payment details', async () => {
            const res = await request(app)
                .post('/api/marketplace/transaction')
                .set('x-auth-token', userToken)
                .send({
                    listingId: testListing.listings[0]._id,
                    paymentDetails: {
                        cardNumber: 'invalid',
                        expiryMonth: '13',
                        expiryYear: '2020',
                        cvc: '12'
                    }
                });

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('msg', 'Invalid payment details');
        });
    });

    describe('POST /api/marketplace/review', () => {
        it('should add a review to a purchased listing', async () => {
            // First make a purchase
            await request(app)
                .post('/api/marketplace/transaction')
                .set('x-auth-token', userToken)
                .send({
                    listingId: testListing.listings[0]._id,
                    paymentDetails: {
                        cardNumber: '4242424242424242',
                        expiryMonth: '12',
                        expiryYear: '2025',
                        cvc: '123'
                    }
                });

            // Then submit a review
            const res = await request(app)
                .post('/api/marketplace/review')
                .set('x-auth-token', userToken)
                .send({
                    listingId: testListing.listings[0]._id,
                    rating: 5,
                    review: 'Excellent certification course!'
                });

            expect(res.status).toBe(200);
            expect(res.body.listings[0].popularity.reviews[0]).toHaveProperty('rating', 5);
            expect(res.body.listings[0].popularity.reviews[0]).toHaveProperty('review', 'Excellent certification course!');
        });

        it('should not allow reviews without purchase', async () => {
            const res = await request(app)
                .post('/api/marketplace/review')
                .set('x-auth-token', userToken)
                .send({
                    listingId: testListing.listings[0]._id,
                    rating: 5,
                    review: 'Great course!'
                });

            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty('msg', 'Must purchase before reviewing');
        });
    });

    describe('GET /api/marketplace/featured', () => {
        it('should get featured listings', async () => {
            // Create a featured listing
            await Marketplace.create({
                listings: [{
                    type: 'certification',
                    title: 'Featured Course',
                    price: 399.99,
                    featured: {
                        isFeatured: true,
                        startDate: new Date(),
                        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                        position: 1
                    }
                }]
            });

            const res = await request(app)
                .get('/api/marketplace/featured')
                .set('x-auth-token', userToken);

            expect(res.status).toBe(200);
            expect(res.body[0].listings[0].title).toBe('Featured Course');
            expect(res.body[0].listings[0].featured.isFeatured).toBeTruthy();
        });
    });
});