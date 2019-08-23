const User = require('../models/user');
const ObjectId = require('mongoose').Types.ObjectId;
const MongoUtils = require('../utils/mongo-utils');

module.exports = class ApiService{

    /**
     * Returns all bookins of a property 
     * @param {String} id - id of the property
     * @returns {Promise<BookingDto[]>} 
     */
    static async findBookingsByPropertyId(id){

        //find all bookings in user collection
        let rawBookings = await User
            .aggregate()
            //unwind by booking items
            .unwind({path : '$bookings'})
            //match the property id
            .match({'bookings.propertyId' : ObjectId(id)})
            //insert the real property object the booking item refers to
            .lookup({
                from : 'properties', 
                localField : 'bookings.propertyId',
                foreignField : '_id',
                as : 'bookings.propertyObject'
            })
            .exec();

        //convert result to BookingDto[]
        return rawBookings
            .map(MongoUtils.rawBookingToBookingDtoWithUser);
    }

    /**
     * Returns all bookins of a user 
     * @param {String} id - id of the user
     * @returns {Promise<BookingDto[]>} 
     */
    static async findBookingsByUserId(id){

        //find all bookings in user collection
        let rawBookings = await User
            .aggregate()
            //match the user id
            .match({_id : ObjectId(id)})
            //unwind by booking items
            .unwind({path : '$bookings'})
            //insert the real property object the booking item refers to
            .lookup({
                from : 'properties', 
                localField : 'bookings.propertyId',
                foreignField : '_id',
                as : 'bookings.propertyObject'
            })
            .exec();

        //convert result to BookingDto[]
        return rawBookings
            .map(MongoUtils.rawBookingToBookingDto);
    }

}