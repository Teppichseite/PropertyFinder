const chai = require('chai');
const eqlAnyOrder = require('deep-equal-in-any-order');
chai.use(eqlAnyOrder);
const expect = chai.expect;

const request = require('supertest');

const AppGenerator = require('../../app-generator');

const PropertyService = require('../../services/property-service');
const UserService = require('../../services/user-service');
const BookingDto = require('../../dtos/booking-dto');

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

describe('routes /users', () => {

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

    describe('route /:userId/bookings', () => {

        it("should return error on invalid objectId", async () => {

            let response = await request(app)
                .get('/users/testid/bookings')
                .set('Accept', 'application/json')
                .expect(400);

            expect(response.body.error).to.be.eql("invalid_request_parameters");

        });

        it("should return valid bookings", async () => {

            await UserService.createNewBooking(
                new BookingDto("", "", "prop1", 90, 110, "city1", "street1", "url1",
                    new Date(), new Date(), "", "User1", "user1@email.com"));

            let user = await User.findOne({ email: "user1@email.com" });

            let expectedResult = await UserService.findBookingsByUserId(user._id);

            expectedResult = JSON.parse(JSON.stringify(expectedResult));

            let response = await request(app)
                .get('/users/' + user._id + '/bookings')
                .set('Accept', 'application/json')
                .expect(200);

            expect(response.body.result).to.deep.equalInAnyOrder(expectedResult);

        });

    });

    describe('route /booking/new', () => {

        it("should create new booking", async () => {

            let d1 = new Date();
            let d2 = new Date(d1.getTime() + 1000);

            await request(app)
                .post('/users/booking/new')
                .send(new BookingDto("", "", "prop2", 90, 110, "city1", "street1", "url1",
                    d1.toISOString(), d2.toISOString(), "", "User2", "user2@email.com"))
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200);

            let user = await User.findOne({ email: "user2@email.com" });

            expect(user.bookings.length).to.be.eql(1);

        });

        it("should return error if to date is not greater than from date",
            async () => await newBookingParamError({ from_date: new Date(), to_date: new Date() }, false));

        it("should return error if property_name does not exist",
            async () => await newBookingParamError({ 'property_name': null }, false));

        it("should return error if longtidude is not a float",
            async () => await newBookingParamError({ 'longtidude': "sdf" }, false));

        it("should return error if latidude is not a float",
            async () => await newBookingParamError({ 'latidude': "sdf" }, false));

        it("should return error if email is not a email",
            async () => await newBookingParamError({ 'email': "test" }, true));

        it("should return error if name does not exist",
            async () => await newBookingParamError({ 'name': null }, true));

    });



});

async function newBookingParamError(changeMap, userChange) {

    let d1 = new Date();
    let d2 = new Date(d1.getTime() + 1000);

    let dto = new BookingDto("", "", "prop2", 90, 110, "city1", "street1", "url1",
        d1.toISOString(), d2.toISOString(), "", "User2", "user2@email.com");

    for (let key in changeMap) {
        if (userChange) {
            dto.user[key] = changeMap[key];
        } else {
            dto[key] = changeMap[key]
        }
    }

    let response = await request(app)
        .post('/users/booking/new')
        .send(dto)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);

    expect(response.body.error).to.be.eql("invalid_request_parameters");
}




