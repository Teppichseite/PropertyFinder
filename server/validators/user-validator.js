const { param, body } = require('express-validator');

module.exports = class UserValidator{

    static validateFindBookingsByUserId(){
        return [
            param('userId').exists()
        ];
    }

    static validateCreateNewBooking(){
        return [
            body('property_name').exists().isString(),
            body('longtidude').exists().isFloat(),
            body('latidude').exists().isFloat(),
            body('city').optional().isString(),
            body('url').optional().isString(),
            body('user.name').exists().isString(),
            body('user.email').exists().isEmail()
        ];
    }

}