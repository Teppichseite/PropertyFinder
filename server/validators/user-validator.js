const { param, body } = require('express-validator');

module.exports = class UserValidator {

    static validateFindBookingsByUserId() {
        return [
            param('userId').exists()
        ];
    }

    static validateCreateNewBooking() {
        return [
            body('property_name').exists().isString(),
            body('longtidude').exists().isFloat(),
            body('latidude').exists().isFloat(),
            body('fromDate').exists().isString(),
            body('toDate').exists().isString()
                .custom(UserValidator.areDatesValid),
            body('city').optional().isString(),
            body('street').optional().isString(),
            body('url').optional().isString(),
            body('user.name').exists().isString(),
            body('user.email').exists().isEmail()
        ];
    }

    /**
     * Checks if the dates are valid dates and if the toDate
     * is after the fromDate
     * @param {String} value 
     * @param {Request} param1.req - Express request object
     * @returns {boolean}
     */
    static areDatesValid(value, { req }) {

        let fromDate = new Date(req.body.fromDate);
        let toDate = new Date(value);

        //check if dates are valid
        if (!isNaN(fromDate.getTime()) && !isNaN(toDate.getTime())) {

            //compare dates
            if (toDate.getTime() > fromDate.getTime()) {
                return true;
            }

        }

        return false;
    }

}