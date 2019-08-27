import { combineReducers } from 'redux'
import findProperties from './find-properties-reducer';
import setBookingDialog from './booking-reducer';

//initial reducer
export default combineReducers({
    findProperties,
    setBookingDialog
});