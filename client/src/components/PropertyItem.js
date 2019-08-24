
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import BusinessIcon from '@material-ui/icons/Business';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const styles = {

    fullItem : {
        backgroundColor : "#FFFFFF",
        margin : "5px"
    },

    innerItems : {
        display: "block"
    }
}

export default class PropertyItem extends React.Component {

    render() {
        return (<div>
            <ListItem button style={styles.fullItem}>
                <ListItemIcon style={styles.innerItems}>
                    <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary={this.props.name} />
            </ListItem>
        </div>)
    }

}