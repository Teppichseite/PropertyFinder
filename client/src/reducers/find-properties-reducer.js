import {
    FIND_PROPS_PENDING,
    FIND_PROPS_SUCCESS,
    FIND_PROPS_ERROR
  } from '../actions/find-properties-actions';



export default findProperties(state, action){
    return Object.assign({}, state, {
        properties : action.properties,
        pending : action.pending,
        error : action.error
    });
}
