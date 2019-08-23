const userService = require('../services/user-service');
const resWrapper = require('../utils/response-wrapper');

module.exports = class UserController {

    static async createNewBooking(req, res){

        const bookingDto = req.body;

        resWrapper.execPromise(
            res, 
            () => userService.execBookingRequest(bookingDto)
        );

    }

    static async findBookingsByUserId(req, res){

        const userId = req.params.userId;

        resWrapper.execPromise(
            res, 
            () => userService.findBookingsByUserId(userId)
        );

    }

}