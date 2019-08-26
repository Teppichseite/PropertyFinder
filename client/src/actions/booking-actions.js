export const OPEN_BOOKING_DIALOG = 'OPEN_BOOKING_DIALOG';
export const COMMIT_BOOKING_PENDING = 'COMMIT_BOOKING_PENDING';
export const COMMIT_BOOKING_SUCCESS = 'COMMIT_BOOKING_SUCCESS'; 
export const COMMIT_BOOKING_ERROR = 'COMMIT_BOOKING_ERROR'; 

export function openBookingDialog(property){
    return {
        type : OPEN_BOOKING_DIALOG,
        openedProperty : property
    }
}

export function commitBookingPending(){
    return {
        type : COMMIT_BOOKING_PENDING,
        pending : true,
        error : false
    };
}

export function commitBookingSuccess(){
    return {
        type : COMMIT_BOOKING_SUCCESS,
        pending : false,
        error : false
    };
}

export function commitBookingError(){
    return {
        type : COMMIT_BOOKING_ERROR,
        pending : false,
        error : true
    };
}
