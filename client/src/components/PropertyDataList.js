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

        const propT = {
            property_name : "TestProp",
            city : "Munich"
        }

        return (
            <List>
                {this.genListItem(propT, "property_name")}
                {this.genListItem(propT, "city")}
                {this.genListItem(propT, "url")}
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