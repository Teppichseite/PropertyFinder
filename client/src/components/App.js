import React from 'react'
import Frame from './Frame';
import PropertyItem from './PropertyItem';

export default class App extends React.Component {

    render() {
        return (
            <Frame>
                <PropertyItem name="test"></PropertyItem>
            </Frame>
        );
    }

}