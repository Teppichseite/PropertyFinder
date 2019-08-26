import {
    FIND_PROPS_PENDING,
    FIND_PROPS_SUCCESS,
    FIND_PROPS_ERROR
  } from '../actions/find-properties-actions';

const defaultState = {
    properties : [],
    pending : false,
    error : false
}


export default function findProperties(state = defaultState, action){

    let result = Object.assign({}, state, {
        properties : action.properties,
        pending : action.pending,
        error : action.error
    });

    console.log(action);

    switch(action.type){
        case FIND_PROPS_ERROR, FIND_PROPS_PENDING, FIND_PROPS_SUCCESS:
            return result;
    }

    return state;

}
