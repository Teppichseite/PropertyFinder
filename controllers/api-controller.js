const apiService = require('../services/api-service');

module.exports = class UserController {

    static async findBookingsByPropertyId(req, res){

        const propertyId = req.query.propertyId;

        let data = await apiService.findBookingsByPropertyId(propertyId);

        res.send(data);

    }

    static async findBookingsByUserId(req, res){

        const userId = req.query.userId;
        
        let data = await apiService.findBookingsByUserId(userId);

        res.send(data);

    }

}