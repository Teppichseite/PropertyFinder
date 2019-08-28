const rp = require('request-promise-native');
const Distance = require('geo-distance');

const User = require('../models/user');
const ObjectId = require('mongoose').Types.ObjectId;
const MongoUtils = require('../utils/mongo-utils');
const PropertyDto = require('../dtos/property-dto');

const HERE_BASE_URL = "https://places.cit.api.here.com/places/v1"
const HERE_AUTO_SUGGEST_URL = HERE_BASE_URL + "/autosuggest";
const HERE_EXPLORE_URL = HERE_BASE_URL + "/discover/explore";
const HERE_APP_ID = "qNzSk1lVT2P84fVVMyeY";
const HERE_APP_CODE = "WYBRUZj4WML3t-fAQAY3SQ";

const UNKNOWN_VALUE = "unknown";

module.exports = class PropertyService{

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
     * Returns properties near the given location
     * @param {FindPropertiesDto} findPropertiesDto
     * @returns {Promise<PropertyDto[]>}
     */
    static async findProperties(findPropertiesDto){
        
        //Finds properties with Here API
        //url: https://developer.here.com/documentation
        //if a search query is given it calls the auto suggest url
        //if not then it calls the explore url, with no search query

        //setup options for here api call
        
        let options = PropertyService.genHereRequestOptions(findPropertiesDto);

        //call here api
        let data = await rp(options);

        //convert raw objects to PropertyDtos
        let rawPropList = data.results.items;
        if(findPropertiesDto.search_query){
            rawPropList = data.results;
        }
        let properties = rawPropList.map(
            (rawProp) => PropertyService.hereRawPropertyToPropertyDto(findPropertiesDto, rawProp));

        properties = properties.filter((propDto) => propDto.name);

        return properties;

    }

    /**
     * Converts a raw here api property object to a PropertyDto
     * @param {FindPropertiesDto} findPropertiesDto
     * @param {any} prop - raw here api property object
     * @returns {PropertyDto}
     */
    static hereRawPropertyToPropertyDto(findPropertiesDto, prop){
        //set invalid values if the prop has no specific location
        let latidude = 1000;
        let longtidude = 1000;
        
        let distance = null;

        //set location values
        if(prop.position){
            latidude = prop.position[0];
            longtidude = prop.position[1];

            distance = PropertyService.getLocationDistance(
                findPropertiesDto,
                prop.position
            )
        }

        //set city and street values
        let city;
        let street;
        if(prop.vicinity){
            let addressData = prop.vicinity.split("<br/>");
            if(addressData.length === 2){

                city = addressData[1];
                street = addressData[0];

            }else if(addressData.length === 1){
                
                city = addressData[0];

            }
        }

        return new PropertyDto(
            prop.title, 
            longtidude, 
            latidude,
            prop.href, 
            city,
            street, 
            distance);
    }

    static getLocationDistance(findPropertiesDto, rawPosition){
        let distanceResult = Distance.between(
            {
                lat: findPropertiesDto.latidude,
                lon: findPropertiesDto.longtidude
            },
            {
                lat: rawPosition[0],
                lon: rawPosition[1]
            }
            ).human_readable();

        return distanceResult.toString() + " away";
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
    static genHereRequestOptions(dto){
        let atString = dto.latidude + "," + dto.longtidude;
        let options = {
            uri : HERE_EXPLORE_URL,
            json : true,
            qs : {
                app_id : HERE_APP_ID,
                app_code : HERE_APP_CODE,
                at : atString
            }
        };

        if(dto.search_query){
            options.uri = HERE_AUTO_SUGGEST_URL;
            options.qs.q = dto.search_query;
        }

        return options;
    }

}