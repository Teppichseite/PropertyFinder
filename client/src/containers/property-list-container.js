import { connect } from 'react-redux'
import PropertyList from '../components/PropertyList';
import {openBookingDialog} from '../actions/booking-actions';
import {updateSearchInput} from '../actions/find-properties-actions';
import ApiActionHelper from '../helpers/api-action-helper';

const mapStateToProps = state => {
    return {
        properties: state.findProperties.properties,
        isPending: state.findProperties.pending,
        hasError: state.findProperties.error
    }
};

const mapDispatchToProps = dispatch => ({
        onClick : property => dispatch(openBookingDialog(property)),
        onChange : event => ApiActionHelper.findProperties(dispatch, event.target.value)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PropertyList)

