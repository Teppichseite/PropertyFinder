const userService = require('../services/user-service');
const resWrapper = require('../utils/response-wrapper');

module.exports = class UserController {

    static async findProperties(req, res){

        const longtidude = req.query.longtidude;
        const latidude = req.query.latidude;
        const searchQuery = req.query.search_query;

        resWrapper.execPromise(
            res, 
            () => userService.findProperties(longtidude, latidude, searchQuery)
        );

    }

    static async execBookingRequest(req, res){

        const bookingDto = req.body;

        resWrapper.execPromise(
            res, 
            () => userService.execBookingRequest(bookingDto)
        );

    }

}