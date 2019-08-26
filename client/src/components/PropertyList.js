import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import PropertyItem from './PropertyItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import '../public/style.css';
import CircularProgress from '@material-ui/core/CircularProgress';

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

    displayList(){

        console.log(this.props);

        if(this.props.isPending){
            return (<CircularProgress className="center"/>);
        }else if(this.props.hasError){
            return (
                <Typography>
                <h4 className="center">An error occurred :(</h4>
                </Typography>
            );
        }else{

            if(!this.props.properties){
                return;
            }

            return (<List>
                {this.props.properties.map((prop) => (
                <PropertyItem property={prop} onClick={this.props.onClick} />
                ))}
            </List>)
        }
    }

}