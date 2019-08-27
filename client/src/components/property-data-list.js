import React from 'react';
import '../public/style.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BusinessIcon from '@material-ui/icons/Business';
import LocationIcon from '@material-ui/icons/MyLocation';
import LanguageIcon from '@material-ui/icons/Language';
import Link from '@material-ui/core/Link';

/**
 * Displays property data of a booking dto
 */
export default class PropertyDataList extends React.Component {

    render() {
        return (
            <List>
                {this.genListItem(this.props.property, "name")}
                {this.genListItem(this.props.property, "city")}
                {this.genListItem(this.props.property, "url")}
            </List>
        );
    }

    /**
     * Returns a ListItem with a value from bookingDto
     * and the right Icon to it
     * @param {BookingDto} bookingDto 
     * @param {String} key - key for value in bookingDto
     * @returns {React.Component}
     */
    genListItem(bookingDto, key) {

        let text = bookingDto[key];

        //display nothing when there is no next
        if (!text) {
            return;
        }


        //get right icon
        let icon;

        //set a link property when key is url
        let isLink = false;
        switch (key) {
            case "name":
                icon = (<BusinessIcon />);
                break;
            case "city":
                icon = (<LocationIcon />);
                break;
            case "url":
                icon = (<LanguageIcon />)
                isLink = true;
                break;
        }

        return (
            <ListItem>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                {
                    !isLink ?
                        <ListItemText primary={text}></ListItemText>
                        :
                        <Link href={text}>
                            More Data
                </Link>}
            </ListItem>
        );
    }

}