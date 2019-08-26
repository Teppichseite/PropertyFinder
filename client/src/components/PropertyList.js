import React from 'react'
import List from '@material-ui/core/List';
import PropertyItem from './PropertyItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import '../public/style.css';

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
            return (<h3 className="center">An error occurred :(</h3>);
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