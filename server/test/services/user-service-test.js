const chai = require('chai');
const eqlAnyOrder = require('deep-equal-in-any-order');
chai.use(eqlAnyOrder);
const expect = chai.expect;

const PropertyService = require('../../services/property-service');
const UserService = require('../../services/user-service');
const BookingDto = require('../../dtos/booking-dto');

const localConfig = require('../../local-config.json');
const mongoose = require('mongoose');

const User = require('../../models/user');
const Booking = require('../../models/booking');
const Property = require('../../models/property');
const ObjectId = require('mongoose').Types.ObjectId;

describe('PropertyService', () => {

    before(async function () {
        //connect before tests to mongodb
        await mongoose.connect(localConfig.mongodbTestUrl,
            { useNewUrlParser: true, useFindAndModify: false });
    });

    after(async function () {
        //remove all collections after testing
        await User.deleteMany({});
        await Property.deleteMany({});
    });

    describe('createNewBooking', () => {

        it("should create a new user, if he does not exist", async () => {

            let username = "User1";
            let email = "user1@email.com";

            await UserService.createNewBooking(
                new BookingDto("", "", "prop1", 40, 40, "", "", "",
                    new Date(), new Date(), "", username, email));

            let user = await User.findOne({ email: email });

            expect(user.name).to.be.equal(username);
        });

        it("should add new booking to user", async () => {

            let fromD = new Date("05-05-2005");
            let toD = new Date("05-06-2005");

            await UserService.createNewBooking(
                new BookingDto("", "", "prop2", 40, 40, "", "", "",
                    fromD, toD, "", "User2", "user2@email.com"));

            let user = await User.findOne({ email: "user2@email.com" });

            expect(user.bookings[0].fromDate).to.be.eql(fromD);
            expect(user.bookings[0].toDate).to.be.eql(toD);
        });

        it("should link property to booking by property id", async () => {

            await UserService.createNewBooking(
                new BookingDto("", "", "prop2", 40, 40, "", "", "",
                    new Date(), new Date(), "", "User3", "user3@email.com"));

            let user = await User.findOne({ email: "user3@email.com" });

            let prop = await Property.findOne({ name: "prop2" });

            expect(user.bookings[0].propertyId).to.be.eql(prop._id);
        });

        it("should add new property, if it does not exist", async () => {

            let name = "prop3";

            await UserService.createNewBooking(
                new BookingDto("", "", name, 90, 110, "", "", "",
                    new Date(), new Date(), "", "User4", "user4@email.com"));

            let prop = await Property.findOne({ name: name });

            expect(prop.longtidude).to.be.eql(90);
            expect(prop.latidude).to.be.eql(110);
        });

        it("should add booking to existing user", async () => {

            let username = "User5";
            let email = "user5@email.com";

            await UserService.createNewBooking(
                new BookingDto("", "", "prop4", 90, 110, "", "", "",
                    new Date(), new Date(), "", username, email));

            await UserService.createNewBooking(
                new BookingDto("", "", "prop5", 90, 110, "", "", "",
                    new Date(), new Date(), "", username, email));

            let prop1 = await Property.findOne({ name: "prop4" });
            let prop2 = await Property.findOne({ name: "prop5" });

            let user = await User.findOne({ email: email });

            expect(user.bookings[0].propertyId).to.be.eql(prop1._id);
            expect(user.bookings[1].propertyId).to.be.eql(prop2._id);
        });

    });

    describe('findBookingsByUserId', () => {

        it("should return the right bookings of a user", async () => {

            await UserService.createNewBooking(
                new BookingDto("", "", "prop6", 90, 110, "city6", "street6", "url6",
                    new Date(), new Date(), "", "User6", "user6@email.com"));

            await UserService.createNewBooking(
                new BookingDto("", "", "prop7", 90, 110, "city7", "street7", "url7",
                    new Date(), new Date(), "", "User6", "user6@email.com"));

            await UserService.createNewBooking(
                new BookingDto("", "", "prop7", 90, 110, "city7", "street7", "url7",
                    new Date(), new Date(), "", "User7", "user7@email.com"));

            let prop6 = await Property.findOne({ name: "prop6" });
            let prop7 = await Property.findOne({ name: "prop7" });

            let user6 = await User.findOne({ email: "user6@email.com" });

            let expectedResult = [

                new BookingDto(user6.bookings[0]._id,
                    user6.bookings[0].propertyId,
                    prop6.name,
                    prop6.longtidude,
                    prop6.latidude,
                    prop6.city,
                    prop6.street,
                    prop6.url, 
                    user6.bookings[0].fromDate, 
                    user6.bookings[0].toDate),

                new BookingDto(user6.bookings[1]._id,
                    user6.bookings[1].propertyId,
                    prop7.name,
                    prop7.longtidude,
                    prop7.latidude,
                    prop7.city,
                    prop7.street,
                    prop7.url, 
                    user6.bookings[1].fromDate, 
                    user6.bookings[1].toDate),

            ];

            let actualResult = await UserService.findBookingsByUserId(user6._id);
            expect(actualResult).to.deep.equalInAnyOrder(expectedResult);
        });

        it("should return [] if there is no such user id", async () => {
            let actualResult = await UserService.findBookingsByUserId(new ObjectId());
            expect(actualResult).to.be.eql([]);
        });

        it("should throw an error if id is not a valid object id", async () => {
            let error = false;
            try{
                await UserService.findBookingsByUserId("test");
            }catch(e){
                error = true;
            }
            expect(error).to.be.eql(true);
        });

    });

});