const { param, body } = require('express-validator');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = class PropertyValidator{

    static validateFindBookingsByPropertyId(){
        return [
            param('propertyId').exists()
                //check for valid object id
                .custom((id) => ObjectId(id))
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