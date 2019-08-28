const chai = require('chai'); 
const eqlAnyOrder = require('deep-equal-in-any-order');
chai.use(eqlAnyOrder);
const expect = chai.expect;

const PropertyService = require('../../services/property-service');
const UserService = require('../../services/user-service');
const FindPropertiesDto = require('../../dtos/find-properties-dto');
const BookingDto = require('../../dtos/booking-dto');

const localConfig = require('../../local-config.json');
const mongoose = require('mongoose');

const User = require('../../models/user');
const Booking = require('../../models/booking');
const Property = require('../../models/property');



const ObjectId = require('mongoose').Types.ObjectId;

describe('PropertyService', () => {

    before(async function() {
        //connect before tests to mongodb
        await mongoose.connect(localConfig.mongodbTestUrl, 
            {useNewUrlParser: true, useFindAndModify: false});
    });

    after(async function() {
        //remove all collections after testing
        await User.deleteMany({});
        await Property.deleteMany({});
    });

    describe('findProperties [NETWORK CALL]', () => {

        it("should return array of properties without searchQuery", async () => {

            let result = await PropertyService.findProperties(
                new FindPropertiesDto(11.576124, 48.137154));

            expect(result).to.be.an("array");
            expect(result).to.be.not.empty;
            for(let k in result){
                expect(result[k]).to.have.property('name');
                expect(result[k]).to.have.property('longtidude');
                expect(result[k]).to.have.property('latidude');
            }
        }); 

        it("should return array of properties with searchQuery", async () => {

            let result = await PropertyService.findProperties(
                new FindPropertiesDto(11.576124, 48.137154, "restaurant"));

            expect(result).to.be.an("array");
            expect(result).to.be.not.empty;
            for(let k in result){
                expect(result[k]).to.have.property('name');
                expect(result[k]).to.have.property('longtidude');
                expect(result[k]).to.have.property('latidude');
            }
        });

    });

    describe('findBookingsByPropertyId', () => {

        it("should return the right bookings of a property", async () => {

            await UserService.createNewBooking(
                new BookingDto("", "", "prop6", 90, 110, "city6", "street6", "url6",
                    new Date(), new Date(), "", "User6", "user6@email.com"));

            await UserService.createNewBooking(
                new BookingDto("", "", "prop7", 90, 110, "city7", "street7", "url7",
                    new Date(), new Date(), "", "User6", "user6@email.com"));

            await UserService.createNewBooking(
                new BookingDto("", "", "prop7", 90, 110, "city7", "street7", "url7",
                    new Date(), new Date(), "", "User7", "user7@email.com"));

            let prop7 = await Property.findOne({ name: "prop7" });

            let user6 = await User.findOne({ email: "user6@email.com" });
            let user7 = await User.findOne({ email: "user7@email.com" });

            let expectedResult = [

                new BookingDto(user6.bookings[1]._id,
                    user6.bookings[1].propertyId,
                    prop7.name,
                    prop7.longtidude,
                    prop7.latidude,
                    prop7.city,
                    prop7.street,
                    prop7.url, 
                    user6.bookings[1].fromDate, 
                    user6.bookings[1].toDate,
                    user6._id,
                    user6.name,
                    user6.email
                    ),

                new BookingDto(
                    user7.bookings[0]._id,
                    user7.bookings[0].propertyId,
                    prop7.name,
                    prop7.longtidude,
                    prop7.latidude,
                    prop7.city,
                    prop7.street,
                    prop7.url, 
                    user7.bookings[0].fromDate, 
                    user7.bookings[0].toDate,
                    user7._id,
                    user7.name,
                    user7.email
                    ),

            ];

            let actualResult = await PropertyService.findBookingsByPropertyId(prop7._id);

            expect(actualResult).to.deep.equalInAnyOrder(expectedResult);
        });

        it("should return [] if there is no such user id", async () => {
            let actualResult = await PropertyService.findBookingsByPropertyId(new ObjectId());
            expect(actualResult).to.be.eql([]);
        });

        it("should throw an error if id is not a valid object id", async () => {
            let error = false;
            try{
                await PropertyService.findBookingsByPropertyId("test");
            }catch(e){
                error = true;
            }
            expect(error).to.be.eql(true);
        });

    });


});