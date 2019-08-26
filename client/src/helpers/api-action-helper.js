import ApiService from '../services/api-service';
import FindPropertiesDto from '../dtos/find-properties-dto';
import {findPropsPending, findPropsSuccess, findPropsError} from '../actions/find-properties-actions';

export default class ApiActionHelper{

    static findProperties(dispatch, searchQuery){
        this.getGeoLocation(dispatch, (pos) => {

            let findPropertiesDto = new FindPropertiesDto(
                pos.coords.longitude, 
                pos.coords.latitude,
                searchQuery
                );

            console.log(pos.coords);

            this.callFindPropertiesApi(dispatch, findPropertiesDto)
        });
    }

    static getGeoLocation(dispatch, callback){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(callback);
        }else{
            dispatch(findPropsError());
        }
    }

    static callFindPropertiesApi(dispatch, findPropertiesDto){

        ApiService.findPropertiesApiCall(findPropertiesDto).then((propertyDto) => {
            dispatch(findPropsSuccess(propertyDto));

        }).catch((e) => {

            console.log(e);

            dispatch(findPropsError());

        });
        dispatch(findPropsPending());

    }

}