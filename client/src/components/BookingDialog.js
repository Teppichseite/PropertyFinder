import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Container } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Button from '@material-ui/core/Button';
import '../public/style.css';
import PropertyDataList from './PropertyDataList';

export default class BookingDialog extends React.Component {

    render(){

        if(!this.props.property){
            return null;
        }

        return (
            <Dialog 
                onClose={this.props.onClose} 
                aria-labelledby="simple-dialog-title" 
                open={true}>
                <Container className="booking-dialog-holder">
                    <PropertyDataList property={this.props.property}/>
                    <form noValidate autoComplete="off">
                        <TextField
                            className="text-field"
                            label= "Name"
                            value="sdfsdf"
                            margin="normal"
                        />
                        <TextField
                            className="text-field"
                            label= "E-Mail"
                            value="sdfsdf"
                            margin="normal"
                        />
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <KeyboardDatePicker 
                                disableToolbar
                                variant="inline"
                                className="text-field"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="From date"
                            />
                            <KeyboardDatePicker 
                                disableToolbar
                                variant="inline"
                                className="text-field"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="To date"
                            />
                            <Button 
                                variant="contained" 
                                color="primary" 
                                className="text-field">
                                Book
                            </Button>
                        </MuiPickersUtilsProvider>
                    </form>
                </Container>
            </Dialog>
        );
    }

}