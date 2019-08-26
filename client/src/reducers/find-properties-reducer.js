import {
    FIND_PROPS_PENDING,
    FIND_PROPS_SUCCESS,
    FIND_PROPS_ERROR
  } from '../actions/find-properties-actions';

const defaultState = {
    properties : [],
    pending : false,
    error : false,
    input : ""
}


export default function findProperties(state = defaultState, action){
    
    switch(action.type){
        case FIND_PROPS_ERROR: 
        case FIND_PROPS_PENDING: 
        case FIND_PROPS_SUCCESS:
            return Object.assign({}, state, {
                properties : action.properties,
                pending : action.pending,
                error : action.error
            });
    }

    return state;

}
