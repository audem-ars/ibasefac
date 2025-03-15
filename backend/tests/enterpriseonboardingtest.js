const mongoose = require('mongoose');
const EnterpriseOnboarding = require('../controllers/enterpriseonboardingcontroller');
const EnterprisePilot = require('../models/enterprisepilot');
const CustomerSuccess = require('../models/customersuccess');

describe('Enterprise Onboarding Tests', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI_TEST);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await EnterprisePilot.deleteMany({});
        await CustomerSuccess.deleteMany({});
    });

    test('Initialize Pilot', async () => {
        const enterpriseData = {
            companyName: 'Tech Corp',
            industry: 'Technology',
            employeeCount: 500,
            stakeholders: [
                { name: 'John Doe', role: 'CTO', email: 'john@techcorp.com' }
            ]
        };

        const pilot = await EnterpriseOnboarding.initializePilot(enterpriseData);
        expect(pilot.companyName).toBe('Tech Corp');
        expect(pilot.pilotSize).toBe(25);
        expect(pilot.contractTier).toBe('small');
    });

    test('Track Pilot Progress', async () => {
        const pilot = await EnterprisePilot.create({
            companyName: 'Tech Corp',
            pilotSize: 25,
            metrics: {
                userAdoption: { active_users: 20 }
            }
        });

        const progress = await EnterpriseOnboarding.trackPilotProgress(pilot._id);
        expect(progress.metrics.adoption).toBeDefined();
        expect(progress.recommendations).toBeInstanceOf(Array);
    });
});