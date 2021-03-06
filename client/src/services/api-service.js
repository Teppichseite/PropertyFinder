import PropertyDto from '../dtos/property-dto';

const request = require('request-promise-native');

const API_URL = "http://127.0.0.1:8080";
const FIND_PROPS_URL = API_URL + "/properties";
const CREATE_BOOKING_URL = API_URL + "/users/booking/new";

export default class ApiService{

    /**
     * Creates a new booking 
     * @param {BookingDto} bookingDto 
     * @returns {Promise<>}
     */
    static async createNewBooking(bookingDto){
        await request({
            method: 'POST',
            uri : CREATE_BOOKING_URL,
            body : bookingDto,
            json : true
        });
    }

    /**
     * Returns properties near to the given location
     * @param {FindPropertiesDto} findPropertiesDto 
     * @returns {Promise<PropertyDto[]>}
     */
    static async findProperties(findPropertiesDto){
        let data = await request({
            method: 'POST',
            uri : FIND_PROPS_URL,
            body : findPropertiesDto,
            json : true
        });

        return data.result
            //map to PropertyDto instance
            .map((prop) => Object.assign(new PropertyDto(), prop));
    }

}