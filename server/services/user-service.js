const BookingDto = require('../dtos/booking-dto');

const User = require('../models/user');
const Booking = require('../models/booking').model;
const Property = require('../models/property');
const ObjectId = require('mongoose').Types.ObjectId;

const MongoUtils = require('../utils/mongo-utils');


module.exports = class UserService{

    /**
     * Executes a booking request
     * @param {BookingDto} bookingDto 
     * @returns {Promise<void>}
     */
    static async createNewBooking(bookingDto){
            
        //save prop if needed
        let propId = (await UserService.insertProperty(bookingDto))._id;

        //setup booking model
        let bookingModel = new Booking({
            propertyId : propId,
            fromDate : new Date(bookingDto.from_date),
            toDate : new Date(bookingDto.to_date)
        });

        //save user if needed and add the booking entry
        await UserService.insertUserAndBooking(bookingDto, bookingModel);
        
    }

    /**
     * Inserts a property if does not exist
     * identifies property by name and location
     * @param {BookingDto} bookingDto 
     * @returns {Promise<findAndModifyWriteOpResultObject>}
     */
    static async insertProperty(bookingDto){
        return MongoUtils.insertIfNeeded(
            Property,
            //find property by name and position
            {
                name : bookingDto.property_name,
                longtidude : bookingDto.longtidude,
                latidude : bookingDto.latidude
            },
            {
                $setOnInsert : {
                    city : bookingDto.city,
                    street : bookingDto.street
                }
            }
        );
    }

    /**
     * Inserts a user if does not exist
     * Insert the bookings model
     * identifies user by email of the bookingDto
     * @param {BookingDto} bookingDto 
     * @param {Booking} bookingModel
     * @returns {Promise<findAndModifyWriteOpResultObject>}
     */
    static async insertUserAndBooking(bookingDto, bookingModel){
        return MongoUtils.insertIfNeeded(
            User,
            {email : bookingDto.user.email},
            {
                $setOnInsert : {
                    name : bookingDto.user.name
                },
                $push: {
                    bookings: bookingModel
                }
            },
        );
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
            .map((raw) => MongoUtils.rawBookingToBookingDto(raw, false));
    }

}