
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BusinessIcon from '@material-ui/icons/Business';
import '../public/style.css';

export default class PropertyItem extends React.Component {

    render() {
        return (
            <ListItem className="property-item" button onClick={this.props.onClick}>
                <ListItemIcon>
                    <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary={this.props.name} />
            </ListItem>)
    }

}