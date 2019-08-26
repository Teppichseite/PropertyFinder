import { connect } from 'react-redux'
import PropertyList from '../components/PropertyList';
import {openBookingDialog} from '../actions/booking-actions';

const mapStateToProps = state => {
    return {
        properties: state.findProperties.properties,
        isPending: state.findProperties.pending,
        hasError: state.findProperties.error
    }
};

const mapDispatchToProps = dispatch => ({
        onClick : property => dispatch(openBookingDialog(property))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PropertyList)

