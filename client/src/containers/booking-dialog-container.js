import { connect } from 'react-redux';
import BookingDialog from '../components/BookingDialog';
import {openBookingDialog} from '../actions/booking-actions';

const mapStateToProps = state => {

    console.log(state);

    return {
        property : state.setBookingDialog.openedProperty,
    }

};

const mapDispatchToProps = dispatch => ({
    onClose : () => dispatch(openBookingDialog(null))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookingDialog)
