import React from 'react'
import Frame from './Frame';
import PropertyItem from './PropertyItem';
import PropertyListContainer from '../containers/property-list-container';
import BookingDialog from './BookingDialog';
import ApiActionHelper from '../helpers/api-action-helper';
import BookingDialogContainer from '../containers/booking-dialog-container';

export default class App extends React.Component {

    componentDidMount(){
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