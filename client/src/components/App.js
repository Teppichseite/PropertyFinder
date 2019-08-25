import React from 'react'
import Frame from './Frame';
import PropertyItem from './PropertyItem';
import PropertyList from './PropertyList';
import BookingDialog from './BookingDialog';

export default class App extends React.Component {

    render() {
        return (
            <Frame>
                <PropertyList properties={["a", "b", "df", "df"]} isPending={false}></PropertyList>
                <BookingDialog property={{city : "test"}}/>
            </Frame>
        );
    }

}