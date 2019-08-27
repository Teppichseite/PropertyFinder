const chai = require('chai'); 
const expect = chai.expect;

const PropertyService = require('../services/property-service');
const FindPropertiesDto = require('../dtos/find-properties-dto');

describe('PropertyService', function(){

    describe('findProperties [NETOWORK CALL]', function(){

        it("should return array of properties without searchQuery", async function(){
            
            let result = await PropertyService.findProperties(
                new FindPropertiesDto(11.576124, 48.137154));

            expect(result).to.be.an("array").that.is.not.empty();
        }); 

        it("should return array of properties with searchQuery", async function(){

            let result = await PropertyService.findProperties(
                new FindPropertiesDto(11.576124, 48.137154, "restaurant"));

            expect(result).to.be.an("array").that.is.not.empty();
        });

    });


});