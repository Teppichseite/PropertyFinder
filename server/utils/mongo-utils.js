const BookingDto = require('../dtos/booking-dto');

module.exports = class MonogoUtils{

    /**
     * Inserts a model if needed
     * Updates a model
     * To specify values on insert use $setOnInsert
     * in the updateQuery
     * @param {Model} model 
     * @param {any} filterQuery 
     * @param {any} updateQuery 
     * @returns {Promise<findAndModifyWriteOpResultObject>}
     */
    static async insertIfNeeded(model, filterQuery, updateQuery){
        model.findOneAndUpdate()
        return model.findOneAndUpdate(
            filterQuery,
            updateQuery,
            {new : true, upsert: true});
    }

    /**
     * Converts a raw mongodb user/booking object to a BookingDto
     * also contains the user
     * @param {any} rawBooking 
     * @returns {BookingDto}
     */
    static rawBookingToBookingDtoWithUser(rawBooking){
        return MonogoUtils.rawBookingToBookingDto(rawBooking, true);
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
            rawBooking.bookings.propertyObject[0].street,
            rawBooking.bookings.propertyObject[0].url,
            rawBooking.bookings.fromDate,
            rawBooking.bookings.toDate,
            rawBooking._id, rawBooking.name, email
            );
    }

}