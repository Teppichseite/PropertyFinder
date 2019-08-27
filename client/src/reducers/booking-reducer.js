import {
    OPEN_BOOKING_DIALOG,
    COMMIT_BOOKING_PENDING,
    COMMIT_BOOKING_ERROR,
    COMMIT_BOOKING_SUCCESS 
} from '../actions/booking-actions';

const defaultState = {
    openedProperty : null,
    pending: false,
    error: false
};

export default function setBookingDialog(state = defaultState, action){

    switch(action.type){

        //merge the openend property to state
        case OPEN_BOOKING_DIALOG:
            return Object.assign({}, state, {
                openedProperty : action.openedProperty
            });

        //all actions share the same properties
        //all three in one case for merging
        case COMMIT_BOOKING_PENDING: 
        case COMMIT_BOOKING_ERROR: 
        case COMMIT_BOOKING_SUCCESS:
            return Object.assign({}, state, {
                pending : action.pending,
                error : action.error
            });
    }

    return state;

}