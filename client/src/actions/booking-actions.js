export const OPEN_BOOKING_DIALOG = 'OPEN_BOOKING_DIALOG';
export const COMMIT_BOOKING_PENDING = 'COMMIT_BOOKING_PENDING';
export const COMMIT_BOOKING_SUCCESS = 'COMMIT_BOOKING_SUCCESS'; 
export const COMMIT_BOOKING_ERROR = 'COMMIT_BOOKING_ERROR'; 

/**
 * Open booking dialog action
 * use null for property for closing 
 * the dialog
 * @param {PropertyDto} property  
 * @returns {Action} - redux action
 */
export function openBookingDialog(property){
    return {
        type : OPEN_BOOKING_DIALOG,
        openedProperty : property
    }
}

/**
 * commit booking pending action
 * @returns {Action} - redux action
 */
export function commitBookingPending(){
    return {
        type : COMMIT_BOOKING_PENDING,
        pending : true,
        error : false
    };
}

/**
 * commit booking success action
 * @returns {Action} - redux action
 */
export function commitBookingSuccess(){
    return {
        type : COMMIT_BOOKING_SUCCESS,
        pending : false,
        error : false
    };
}

/**
 * commit booking error action
 * @returns {Action} - redux action
 */
export function commitBookingError(){
    return {
        type : COMMIT_BOOKING_ERROR,
        pending : false,
        error : true
    };
}
