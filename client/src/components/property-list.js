import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import PropertyItem from './property-item';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SearchIcon from '@material-ui/icons/Search';
import '../public/style.css';
import CircularProgress from '@material-ui/core/CircularProgress';

import PropertyDto from '../dtos/property-dto';
import PropTypes from 'prop-types';

//signature
const PROP_TYPES = {
    //properties to show
    properties: PropTypes.arrayOf(PropTypes.instanceOf(PropertyDto)).isRequired,
    //if find properties is pending
    isPending: PropTypes.bool.isRequired,
    //if finding properties has caused an error
    hasError: PropTypes.bool.isRequired,
    //on click on a item: function(PropertyDto)
    onClick: PropTypes.func.isRequired,
    //on text change of the search bar function(event)
    onChange: PropTypes.func.isRequired
}

/**
 * Displays a list of PropertyItems and a search bar
 */
export default class PropertyList extends React.Component {

    render() {

        return (
            <div>
                <ListItem className="property-item">
                    <ListItemIcon>
                        <SearchIcon />
                    </ListItemIcon>
                    <input
                        className="search-prop-input"
                        placeholder="Enter a search term..."
                        onChange={this.props.onChange}
                    />
                </ListItem>
                {
                    this.displayList()
                }
            </div>

        );
    }

    /**
     * shows the list
     * @returns {React.Component}
     */
    displayList() {

        if (this.props.isPending) {

            //show loading spinner
            return (<CircularProgress />);

        } else if (this.props.hasError) {

            //show error message
            return (
                <Typography variant='subtitle1'>
                    <label>An error occurred.
                    </label>
                </Typography>
            );

        }

        //show list
        return (<List>
            {this.props.properties.map((prop) => (
                <PropertyItem key={this.genKey(prop)} property={prop} onClick={this.props.onClick} />
            ))}
        </List>);


    }

    /**
     * Generates a key for a property
     * @param {PropertyDto} prop
     * @returns {String} 
     */
    genKey(prop) {
        return prop.name
            + prop.latidude
            + prop.latidude;
    }

}

PropertyList.propTypes = PROP_TYPES;