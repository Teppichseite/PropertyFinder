const chai = require('chai'); 
const expect = chai.expect;

const PropertyService = require('../services/property-service');
const FindPropertiesDto = require('../dtos/find-properties-dto');

const localConfig = require('../local-config.json');
const mongoose = require('mongoose');

const User = require('../models/user');
const Booking = require('../models/booking');
const Property = require('../models/property');

describe('PropertyService', () => {

    before(async function() {
        //connect before tests to mongodb
        await mongoose.connect(localConfig.mongodbTestUrl, {useNewUrlParser: true});
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


});