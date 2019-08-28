import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BusinessIcon from '@material-ui/icons/Business';
import '../public/style.css';

import PropertyDto from '../dtos/property-dto';
import PropTypes from 'prop-types';

//signature
const PROP_TYPES = {
    //Property to show
    property : PropTypes.objectOf(PropertyDto.PropType()).isRequired,
    //on click on a item: function(PropertyDto)
    onClick : PropTypes.func.isRequired,
}

/**
 * Displays a clickable icon with a text and a static icon
 */
export default class PropertyItem extends React.Component {

    render() {
        return (
            <ListItem 
                className="property-item" 
                button 
                onClick={() => { this.props.onClick(this.props.property)
                }}>
                <ListItemIcon>
                    <BusinessIcon />
                </ListItemIcon>
                <ListItemText 
                    primary={this.props.property.name} 
                    secondary={this.props.property.distance}
                    />
            </ListItem>)
    }

}

PropertyItem.propTypes = PROP_TYPES;