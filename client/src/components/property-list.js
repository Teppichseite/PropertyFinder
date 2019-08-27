import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import PropertyItem from './property-item';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SearchIcon from '@material-ui/icons/Search';
import '../public/style.css';
import CircularProgress from '@material-ui/core/CircularProgress';

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
            return (<CircularProgress/>);

        } else if (this.props.hasError) {

            //show error message
            return (
                <Typography variant='subtitle1'>
                    <label>An error occurred.
                    </label>
                </Typography>
            );

        } else {

            //show list
            return (<List>
                {this.props.properties.map((prop) => (
                    <PropertyItem property={prop} onClick={this.props.onClick} />
                ))}
            </List>);

        }
    }

}