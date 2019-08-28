const userService = require('../services/user-service');
const resWrapper = require('../utils/response-wrapper');

module.exports = class UserController {

    static async createNewBooking(req, res){

        const bookingDto = req.body;

        resWrapper.execPromise(
            req,
            res, 
            () => userService.createNewBooking(bookingDto)
        );

    }

    static async findBookingsByUserId(req, res){

        const userId = req.params.userId;

        resWrapper.execPromise(
            req,
            res, 
            () => userService.findBookingsByUserId(userId)
        );

    }

}