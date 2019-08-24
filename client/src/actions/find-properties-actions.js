export const FIND_PROPS_PENDING = 'FIND_PROPS_PENDING';
export const FIND_PROPS_SUCCESS = 'FIND_PROPS_SUCCESS';
export const FIND_PROPS_ERROR = 'FIND_PROPS_ERROR';

export function findPropsPending(){
    return {
        type : FIND_PROPS_PENDING,
        properties : [],
        pending : true,
        error : false
    };
}

export function findPropsSuccess(properties){
    return {
        type : FIND_PROPS_SUCCESS,
        properties : properties,
        pending : false,
        error : false
    };
}

export function findPropsError(){
    return {
        type : FIND_PROPS_ERROR,
        properties : [],
        pending : false,
        error : true
    };
}