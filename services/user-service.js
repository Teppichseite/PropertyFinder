const rp = require('request-promise-native');
const PropertyDto = require('../dtos/property-dto');
const BookingDto = require('../dtos/booking-dto');

const User = require('../models/user');
const Booking = require('../models/booking').model;
const Property = require('../models/property');

const HERE_BASE_URL = "https://places.cit.api.here.com/places/v1"
const HERE_AUTO_SUGGEST_URL = HERE_BASE_URL + "/autosuggest";
const HERE_EXPLORE_URL = HERE_BASE_URL + "/discover/explore";
const HERE_APP_ID = "qNzSk1lVT2P84fVVMyeY";
const HERE_APP_CODE = "WYBRUZj4WML3t-fAQAY3SQ";

const UNKNOWN_VALUE = "unknown";


module.exports = class UserService{

    /**
     * Returns properties near the given location
     * @param {number} longtidude 
     * @param {number} latitude 
     * @param {string} searchQuery - query for matching places, optional
     * @returns {Promise<PropertyDto[]>}
     */
    static async findProperties(longtidude, latitude, searchQuery){
        
        //Finds properties with Here API
        //url: https://developer.here.com/documentation
        //if a search query is given it calls the auto suggest url
        //if not then it calls the explore url, with no search query

        //setup options for here api call
        
        let options = UserService.genHereRequestOptions(longtidude, latitude, searchQuery);
        
        //call here api
        let data = await rp(options);

        //convert raw objects to PropertyDtos
        let rawPropList = data.results.items;
        if(searchQuery){
            rawPropList = data.results;
        }
        let properties = rawPropList.map(UserService.hereRawPropertyToPropertyDto);

        return properties;

    }

    /**
     * Converts a raw here api property object to a PropertyDto
     * @param {any} prop - raw here api property object
     * @returns {PropertyDto}
     */
    static hereRawPropertyToPropertyDto(prop){
        //set invalid values if the prop has no specific location
        let latidude = 1000;
        let longtidude = 1000;
        if(prop.location){
            latidude = prop.location[0];
            longtidude = prop.location[1];
        }

        return new PropertyDto(
            UserService.checkUnknown(prop.title), 
            longtidude, 
            latidude,
            UserService.checkUnknown(prop.href), 
            UserService.checkUnknown(prop.vicinity));
    }

    /**
     * Returns UNKNWON_VALUE
     * if !value
     * @param {string} value 
     * @returns {string}
     */
    static checkUnknown(value){
        if(!value){
            return UNKNOWN_VALUE;
        }
        return value;
    }

    /**
     * Generates the request options for here api
     * @param {number} longtidude 
     * @param {number} latitude 
     * @param {string} searchQuery - query for matching places, optional
     * @returns {any}
     */
    static genHereRequestOptions(longtidude, latitude, searchQuery){
        let atString = latitude + "," + longtidude;
        let options = {
            uri : HERE_EXPLORE_URL,
            json : true,
            qs : {
                app_id : HERE_APP_ID,
                app_code : HERE_APP_CODE,
                at : atString
            }
        };

        if(searchQuery){
            options.uri = HERE_AUTO_SUGGEST_URL;
            options.qs.q = searchQuery;
        }

        return options;
    }

    /**
     * Executes a booking request
     * @param {BookingDto} bookingDto 
     * @returns {Promise<void>}
     */
    static async execBookingRequest(bookingDto){
            
        //save prop if needed
        let propId = (await UserService.insertProperty(bookingDto))._id;

        //setup booking model
        let bookingModel = new Booking({
            propertyId : propId
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
        return UserService.insertIfNeeded(
            Property,
            //find property by name and position
            {
                name : bookingDto.property_name,
                longtidude : bookingDto.longtidude,
                latidude : bookingDto.latidude
            },
            {
                $setOnInsert : {
                    city : bookingDto.city
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
        return UserService.insertIfNeeded(
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

}