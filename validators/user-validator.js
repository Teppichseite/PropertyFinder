const { params, body } = require('express-validator');

module.exports = class UserValidator{

    static validateFindBookingsByUserId(){
        return [
            params('userId').exists()
        ];
    }

    static validateCreateNewBooking(){
        return [
            params('longtidude').exists().isFloat(),
            params('latidude').exists().isFloat(),
            params('search_query').exists().isString()
        ];
    }

}