const { param, body } = require('express-validator');

module.exports = class PropertyValidator{

    static validateFindBookingsByPropertyId(){
        return [
            param('propertyId').exists()
        ];
    }

    static validateFindProperties(){
        return [
            body('longtidude').exists().isFloat(),
            body('latidude').exists().isFloat(),
            body('search_query').optional().isString()
        ];
    }

}