import ApiService from '../services/api-service';
import FindPropertiesDto from '../dtos/find-properties-dto';
import {findPropsPending, findPropsSuccess, findPropsError} from '../actions/find-properties-actions';

export default class ApiActionHelper{

    static findProperties(dispatchFunc){
        let findPropertiesDto = new FindPropertiesDto(
            11.6465, 48.1952
        );
        
        ApiService.findPropertiesApiCall(findPropertiesDto).then((propertyDto) => {
            dispatchFunc(findPropsSuccess(propertyDto));

        }).catch((e) => {

            console.log(e);

            dispatchFunc(findPropsError());

        });
        dispatchFunc(findPropsPending());
    }

}