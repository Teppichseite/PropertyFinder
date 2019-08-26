import {
    OPEN_BOOKING_DIALOG,
    CLOSE_BOOKING_DIALOG
  } from '../actions/booking-actions';

const defaultState = {
    openedProperty : null
}


export default function setBookingDialog(state = defaultState, action){

    switch(action.type){
        case OPEN_BOOKING_DIALOG:
            return Object.assign({}, state, {
                openedProperty : action.openedProperty
            });
    }

    return state;

}