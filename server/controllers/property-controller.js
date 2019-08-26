const propertyService = require('../services/property-service');
const resWrapper = require('../utils/response-wrapper');

module.exports = class PropertyController {

    static async findBookingsByPropertyId(req, res){

        const propertyId = req.params.propertyId;

        resWrapper.execPromise(
            req,
            res, 
            () => propertyService.findBookingsByPropertyId(propertyId)
        );

    }

    static async findProperties(req, res){

        const findPropertiesDto = req.body;

        resWrapper.execPromise(
            req,
            res, 
            () => propertyService.findProperties(findPropertiesDto)
        );

    }

}