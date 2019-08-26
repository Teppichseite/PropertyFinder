import ApiService from '../services/api-service';
import FindPropertiesDto from '../dtos/find-properties-dto';
import {findPropsPending, findPropsSuccess, findPropsError} from '../actions/find-properties-actions';
import {openBookingDialog, commitBookingPending, commitBookingSuccess, commitBookingError} from '../actions/booking-actions';

export default class ApiActionHelper{

    static findProperties(dispatch, searchQuery){

        ApiActionHelper.getGeoLocation(dispatch, (pos) => {

            let findPropertiesDto = new FindPropertiesDto(
                pos.coords.longitude, 
                pos.coords.latitude,
                searchQuery
                );

            ApiActionHelper.callFindPropertiesService(dispatch, findPropertiesDto)
        });
    }

    static getGeoLocation(dispatch, callback){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(callback);
        }else{
            dispatch(findPropsError());
        }
    }

    static callFindPropertiesService(dispatch, findPropertiesDto){

        ApiService.findProperties(findPropertiesDto).then((propertyDto) => {
            dispatch(findPropsSuccess(propertyDto));

        }).catch((e) => {

            console.log(e);

            dispatch(findPropsError());

        });

        dispatch(findPropsPending());

    }

    static createNewBooking(dispatch, bookingDto){
        ApiActionHelper.callCreateNewBookingService(dispatch, bookingDto);
    }

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