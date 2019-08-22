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

        try{
            
            //call here api
            let data = await rp(options);

            //convert raw objects to PropertyDtos
            let rawPropList = data.results.items;
            if(searchQuery){
                rawPropList = data.results;
            }
            let properties = rawPropList.map((prop) => {
                return new PropertyDto(
                    prop.title, 
                    prop.location, 
                    prop.href, 
                    prop.vicinity)
            });

            return properties;

        }catch(e){
            return [];
        }

    }

    static async execBookingRequest(bookingDto){

        let propertyModel = new Property({
            name : bookingDto.name,
            city : "test",
            longtidude : "0",
            latitude : "0"
        });

        /*
        //save prop
        let propId = (await propertyModel.save())._id;
        
        let bookingModel = new Booking({
            propertyId : propId
        });

        */

        
        
    }

}