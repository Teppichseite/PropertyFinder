import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import { Container } from '@material-ui/core';
import PropTypes from 'prop-types';
import '../public/style.css';


//signature
const PROP_TYPES = {
    children : PropTypes.arrayOf(PropTypes.element).isRequired
}

/**
 * Outer frame with appbar of the application
 */
export default class Frame extends React.Component {
    
    render(){
        return (
            <div className="outer-frame">
                <AppBar position="static">
                    <Toolbar>
                        <LocationSearchingIcon className="padding-lr"/>
                        <Typography variant="h6" >
                            Find properties near your place
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container className="inner-frame">
                    {this.props.children}
                </Container>
            </div>
        );
    }

}

Frame.propTypes = PROP_TYPES;