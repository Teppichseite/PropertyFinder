const User = require('../models/user');
const ObjectId = require('mongoose').Types.ObjectId;
const BookingDto = require('../dtos/booking-dto');

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
            .map(ApiService.rawBookingToBookingDtoWithUser);
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
            .map(ApiService.rawBookingToBookingDto);
    }

    /**
     * Converts a raw mongodb user/booking object to a BookingDto
     * also contains the user
     * @param {any} rawBooking 
     * @returns {BookingDto}
     */
    static rawBookingToBookingDtoWithUser(rawBooking){
        return ApiService.rawBookingToBookingDto(rawBooking, true);
    }

    /**
     * Converts a raw mongodb user/booking object to a BookingDto
     * @param {any} rawBooking 
     * @param {boolean} showUser - if true then user of the booking will be in the result dto
     * @returns {BookingDto}
     */
    static rawBookingToBookingDto(rawBooking, showUser){
        let email = null;
        if(showUser){
            email = rawBooking.email;
        }

        return new BookingDto(
            rawBooking.bookings._id,
            rawBooking.bookings.propertyObject[0]._id,
            rawBooking.bookings.propertyObject[0].name,
            rawBooking.bookings.propertyObject[0].longtidude,
            rawBooking.bookings.propertyObject[0].latidude,
            rawBooking.bookings.propertyObject[0].city,
            rawBooking.bookings.propertyObject[0].url,
            rawBooking._id, rawBooking.name, email
            );
    }

}