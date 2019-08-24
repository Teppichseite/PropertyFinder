module.exports = class UserValidator{

    static validateFindBookingsByUserId(){
        return [
            params('propertyId').exists()
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
            body('user.name').exists().isEmail()
        ];
    }

}