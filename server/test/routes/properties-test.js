const chai = require('chai');
const eqlAnyOrder = require('deep-equal-in-any-order');
chai.use(eqlAnyOrder);
const expect = chai.expect;

const request = require('supertest');

const AppGenerator = require('../../app-generator');

const PropertyService = require('../../services/property-service');
const UserService = require('../../services/user-service');
const BookingDto = require('../../dtos/booking-dto');
const FindPropertiesDto = require('../../dtos/find-properties-dto');

const localConfig = require('../../local-config.json');
const mongoose = require('mongoose');

const User = require('../../models/user');
const Booking = require('../../models/booking');
const Property = require('../../models/property');
const ObjectId = require('mongoose').Types.ObjectId;

async function getExpressApp() {
    const appGenerator = new AppGenerator(localConfig.mongodbTestUrl, true);
    return (await appGenerator.generate());
}

let app;

describe('routes /properties', () => {

    before(async function () {
        //connect before tests to mongodb
        await mongoose.connect(localConfig.mongodbTestUrl,
            { useNewUrlParser: true, useFindAndModify: false });

        app = await getExpressApp();

    });

    after(async function () {
        //remove all collections after testing
        await User.deleteMany({});
        await Property.deleteMany({});
    });

    describe('route /:propertyId/bookings', () => {

        it("should return error on invalid objectId", async () => {

            let response = await request(app)
                .get('/properties/testid/bookings')
                .set('Accept', 'application/json')
                .expect(400);

            expect(response.body.error).to.be.eql("invalid_request_parameters");

        });

        it("should return valid bookings", async () => {

            await UserService.createNewBooking(
                new BookingDto("", "", "prop1", 90, 110, "city1", "street1", "url1",
                    new Date(), new Date(), "", "User1", "user1@email.com"));

            let prop = await Property.findOne({ name: "prop1" });

            let expectedResult = await PropertyService.findBookingsByPropertyId(prop._id);

            expectedResult = JSON.parse(JSON.stringify(expectedResult));

            let response = await request(app)
                .get('/properties/' + prop._id + '/bookings')
                .set('Accept', 'application/json')
                .expect(200);

            expect(response.body.result).to.be.eql(expectedResult);

        });

    });

    describe('route /', () => {

        it("should return some properties at the given location", async () => {

            let findPropertiesDto = new FindPropertiesDto(
                11.576124, 48.137154, "restaurant"
            );

            let response = await request(app)
                .post('/properties')
                .send(findPropertiesDto)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body.result).to.be.an("array");
            expect(response.body.result).to.be.not.empty;
        });

        it("should return error if longtidude is not a float",
            async () => await findPropertiesParamError({ 'longtidude': "sdf" }));

        it("should return error if latidude is not a float",
            async () => await findPropertiesParamError({ 'latidude': "sdf" }));

    });


});

async function findPropertiesParamError(changeMap) {

    let dto = new FindPropertiesDto(
        11.576124, 48.137154, "restaurant"
    );

    for (let key in changeMap) {
        dto[key] = changeMap[key];
    }

    let response = await request(app)
        .post('/properties')
        .send(dto)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);

    expect(response.body.error).to.be.eql("invalid_request_parameters");
}
