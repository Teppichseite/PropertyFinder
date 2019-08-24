const { params, query } = require('express-validator');

module.exports = class PropertyValidator{

    static validateFindBookingsByPropertyId(){
        return [
            params('propertyId').exists()
        ];
    }

    static validateFindProperties(){
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