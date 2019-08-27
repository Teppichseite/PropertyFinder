import React from 'react'
import Frame from './frame';
import PropertyListContainer from '../containers/property-list-container';
import ApiActionHelper from '../helpers/api-action-helper';
import BookingDialogContainer from '../containers/booking-dialog-container';

/**
 * Main component, combines all other components
 */
export default class App extends React.Component {

    componentDidMount(){
        //find and display properties, on page build
        ApiActionHelper.findProperties(this.props.store.dispatch);
    }

    render() {
        return (
            <Frame>
                <PropertyListContainer/>
                <BookingDialogContainer/>
            </Frame>
        );
    }

}