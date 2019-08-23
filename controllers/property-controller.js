const apiService = require('../services/property-service');
const resWrapper = require('../utils/response-wrapper');

module.exports = class UserController {

    static async findBookingsByPropertyId(req, res){

        const propertyId = req.query.propertyId;

        resWrapper.execPromise(
            res, 
            () => apiService.findBookingsByPropertyId(propertyId)
        );

    }

    static async findBookingsByUserId(req, res){

        const userId = req.query.userId;

        resWrapper.execPromise(
            res, 
            () => apiService.findBookingsByUserId(userId)
        );

    }

}