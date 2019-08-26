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
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import '../public/style.css';
import PropertyDataList from './PropertyDataList';
import BookingDto from '../dtos/booking-dto';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class BookingDialog extends React.Component {

    constructor(props) {
        super(props);

        let fromDate = new Date();
        let toDate = new Date(fromDate.getTime() + (1000 * 60 * 60 * 24));

        this.state = {
            name: "",
            email: "",
            fromDate: fromDate,
            toDate: toDate
        };
    }

    onTextChange(stateKey) {
        return ((event) => {
            let stateObj = {};
            stateObj[stateKey] = event.target.value;
            this.setState(stateObj)
        }).bind(this);
    }

    onDateChange(stateKey) {
        return ((date) => {
            let stateObj = {};
            stateObj[stateKey] = date;
            this.setState(stateObj)
        }).bind(this);
    }

    onBookingButtonClick() {
        let bookingDto = new BookingDto(
            "", "",
            this.props.property.name,
            this.props.property.longtidude,
            this.props.property.latidude,
            this.props.property.city,
            this.props.property.url,
            "",
            this.state.name,
            this.state.email
        );

        this.props.onCommitBooking(bookingDto);
    }

    render() {

        if (!this.props.property) {
            return null;
        }

        return (
            <Dialog
                onClose={this.props.onClose}
                aria-labelledby="simple-dialog-title"
                open={true}>
                <Container className="booking-dialog-holder">
                    <PropertyDataList property={this.props.property} />
                    <form noValidate autoComplete="off">
                        <TextField
                            className="text-field"
                            label="Name"
                            margin="normal"
                            value={this.state.name}
                            onChange={this.onTextChange("name")
                                .bind(this)}
                        />
                        <TextField
                            className="text-field"
                            label="E-Mail"
                            margin="normal"
                            value={this.state.email}
                            onChange={this.onTextChange("email")
                                .bind(this)}
                        />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                className="text-field"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="From date"
                                value={this.state.fromDate}
                                onChange={this.onDateChange("fromDate")
                                    .bind(this)}
                            />
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                className="text-field"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="To date"
                                value={this.state.toDate}
                                onChange={this.onDateChange("toDate")
                                    .bind(this)}
                            />
                            {this.genCommitBookingButton()}
                        </MuiPickersUtilsProvider>
                    </form>
                </Container>
            </Dialog>
        );
    }

    genCommitBookingButton() {

        console.log(this.props);

        if (this.props.isPending) {
            return (<CircularProgress className="center" />);
        } else if (this.props.hasError) {
            return (
                <Typography>
                <h4 className="center">An error occurred :(</h4>
                </Typography>
                );
        }

        return <Button
            variant="contained"
            color="primary"
            className="text-field book-btn"
            onClick={this.onBookingButtonClick
                .bind(this)}>
            Commit booking
            </Button>
    }

}