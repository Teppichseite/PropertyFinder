import { connect } from 'react-redux'
import PropertyList from '../components/property-list';
import {openBookingDialog} from '../actions/booking-actions';
import ApiActionHelper from '../helpers/api-action-helper';

const mapStateToProps = state => {
    return {
        //properties to show in list
        properties: state.findProperties.properties,

        //error and pending for finding properties
        isPending: state.findProperties.pending,
        hasError: state.findProperties.error
    }
};

const mapDispatchToProps = dispatch => ({
        //open dialog on click on property item
        onClick : property => dispatch(openBookingDialog(property)),
        //update list on text field change
        onChange : event => ApiActionHelper.findProperties(dispatch, event.target.value)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PropertyList)

