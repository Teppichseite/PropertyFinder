import ApiService from '../services/api-service';
import FindPropertiesDto from '../dtos/find-properties-dto';
import {findPropsPending, findPropsSuccess, findPropsError} from '../actions/find-properties-actions';
import {openBookingDialog, commitBookingPending, commitBookingSuccess, commitBookingError} from '../actions/booking-actions';

export default class ApiActionHelper{

    /**
     * Calls the actions for finding properties
     * @param {function} dispatch 
     * @param {String} searchQuery 
     */
    static findProperties(dispatch, searchQuery){

        ApiActionHelper.getGeoLocation(dispatch, (pos) => {

            //create request object
            let findPropertiesDto = new FindPropertiesDto(
                pos.coords.longitude, 
                pos.coords.latitude,
                searchQuery
                );

            ApiActionHelper.callFindPropertiesService(dispatch, findPropertiesDto)
        });
    }

    /**
     * Gets the geo location
     * @param {function} dispatch 
     * @param {function} callback 
     */
    static getGeoLocation(dispatch, callback){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(callback);
        }else{
            //send serror action if there is no geolocation
            dispatch(findPropsError());
        }
    }

    /**
     * Gets properties by the api and sends actions
     * @param {function} dispatch 
     * @param {FindPropertiesDto} findPropertiesDto 
     */
    static callFindPropertiesService(dispatch, findPropertiesDto){

        ApiService.findProperties(findPropertiesDto).then((propertyDto) => {

            dispatch(findPropsSuccess(propertyDto));

        }).catch((e) => {

            console.log(e);

            dispatch(findPropsError());

        });

        dispatch(findPropsPending());

    }

    /**
     * Creates a new booking sends actions
     * function wrapper for callCreateNewBookingService
     * @param {function} dispatch 
     * @param {BookingDto} bookingDto 
     */
    static createNewBooking(dispatch, bookingDto){
        ApiActionHelper.callCreateNewBookingService(dispatch, bookingDto);
    }

    /**
     * Creates a new booking sends actions
     * @param {function} dispatch 
     * @param {BookingDto} bookingDto 
     */
    static callCreateNewBookingService(dispatch, bookingDto){

        ApiService.createNewBooking(bookingDto).then((propertyDto) => {
            
            dispatch(commitBookingSuccess());
            dispatch(openBookingDialog(null));

        }).catch((e) => {

            console.log(e);

            dispatch(commitBookingError());

        });
        dispatch(commitBookingPending());

    } 

}