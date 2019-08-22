const User = require('../models/user');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = class ApiService{

    static async findBookingsByPropertyId(id){
        let res = await User
            .aggregate()
            .unwind({path : '$bookings'})
            .lookup({
                from : 'properties', 
                localField : 'bookings.propertyId',
                foreignField : '_id',
                as : 'bookings.propertyObject'
            })
            .match({'bookings.propertyId' : ObjectId(id)})
            .exec();
        return res;
    }

    static async findBookingsByUserId(id){
        let res = await User
            .aggregate()
            .match({_id : ObjectId(id)})
            .unwind({path : '$bookings'})
            .lookup({
                from : 'properties', 
                localField : 'bookings.propertyId',
                foreignField : '_id',
                as : 'bookings.propertyObject'
            })
            .exec();
        return res;
    }

}