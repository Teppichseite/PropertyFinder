import { connect } from 'react-redux';
import BookingDialog from '../components/booking-dialog';
import {openBookingDialog, commitBookingSuccess} from '../actions/booking-actions';
import ApiActionHelper from '../helpers/api-action-helper';

const mapStateToProps = state => {
    return {
        //the property that will be opened
        //use null for closing
        property : state.setBookingDialog.openedProperty,

        //error and pending for commit booking
        isPending : state.setBookingDialog.pending,
        hasError : state.setBookingDialog.error
    }
};

const mapDispatchToProps = dispatch => ({
    onClose : () => {
        //close dialog
        dispatch(openBookingDialog(null))
        //reset the state
        dispatch(commitBookingSuccess())
    },
    onCommitBooking : (bookingDto) => {
        ApiActionHelper.createNewBooking(dispatch, bookingDto)
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookingDialog)
