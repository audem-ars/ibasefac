const mongoose = require('mongoose');
const CustomerSuccess = require('../models/customersuccess');
const EnterprisePilot = require('../models/enterprisepilot');

describe('Customer Success Tests', () => {
    let pilotId;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI_TEST);
        const pilot = await EnterprisePilot.create({
            companyName: 'Test Corp',
            pilotSize: 25
        });
        pilotId = pilot._id;
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('Create Customer Success Record', async () => {
        const customerSuccess = await CustomerSuccess.create({
            pilotId,
            checkPoints: [{
                date: new Date(),
                type: 'kickoff',
                completed: true,
                notes: 'Successful kickoff meeting'
            }],
            successMetrics: {
                userAdoption: {
                    active_users: 20,
                    engagement_rate: 0.8
                }
            }
        });

        expect(customerSuccess.pilotId).toEqual(pilotId);
        expect(customerSuccess.checkPoints).toHaveLength(1);
    });
});