import React from 'react'
import List from '@material-ui/core/List';
import PropertyItem from './PropertyItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../public/style.css';

export default class PropertyList extends React.Component {

    render() {
        if(this.props.isPending){
            return (<CircularProgress className="center"/>)
        }else if(this.props.hasError){
            return (<h3 className="center">An error occurred :(</h3>)
        }else{
            return (<List>
            {this.props.properties.map((prop) => (
                <PropertyItem name={prop} onClick={this.props.onClick} />
            ))}
            </List>);
        }
    }

}