const { param, query } = require('express-validator');

module.exports = class UserValidator{

    static validateFindBookingsByUserId(){
        return [
            param('userId').exists()
        ];
    }

    static validateCreateNewBooking(){
        return [
            query('longtidude').exists().isFloat(),
            query('latidude').exists().isFloat(),
            query('search_query').exists().isString()
        ];
    }

}