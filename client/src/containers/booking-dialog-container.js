import { connect } from 'react-redux';
import BookingDialog from '../components/BookingDialog';
import {openBookingDialog, commitBookingSuccess} from '../actions/booking-actions';
import ApiActionHelper from '../helpers/api-action-helper';

const mapStateToProps = state => {
    return {
        property : state.setBookingDialog.openedProperty,
        isPending : state.setBookingDialog.pending,
        hasError : state.setBookingDialog.error
    }
};

const mapDispatchToProps = dispatch => ({
    onClose : () => {
        dispatch(openBookingDialog(null))
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
