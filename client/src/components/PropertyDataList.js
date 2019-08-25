import React from 'react';
import '../public/style.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BusinessIcon from '@material-ui/icons/Business';
import LocationIcon from '@material-ui/icons/MyLocation';
import LanguageIcon from '@material-ui/icons/Language';

export default class PropertyDataList extends React.Component {

    render(){
        return (
            <List>
                {this.genListItem(this.props.property, "property_name")}
                {this.genListItem(this.props.property, "city")}
                {this.genListItem(this.props.property, "url")}
            </List>
        );
    }

    genListItem(bookingDto, key){

        let text = bookingDto[key];

        if(!text){
            return;
        }

        let icon;
        switch(key){
            case "property_name":
                icon = (<BusinessIcon/>);
                break;
            case "city":
                icon = (<LocationIcon/>);
                break;
            case "url":
                icon = (<LanguageIcon/>)
                break;
        }

        return (
            <ListItem>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
        );
    }

}