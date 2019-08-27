import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import '../public/style.css';
import PropertyDataList from './property-data-list';
import BookingDto from '../dtos/booking-dto';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class BookingDialog extends React.Component {

    constructor(props) {
        super(props);

        //initial state
        this.state = this.getDefaultState();
    }

    /**
     * returns a default state for textfields and datepickers
     * @returns {any}
     */
    getDefaultState() {
        let fromDate = new Date();

        //fromDate + one day
        let toDate = new Date(fromDate.getTime() + (1000 * 60 * 60 * 24));

        let defState = {
            bookingButtonClicked : false,
            name: "",
            email: "",
            fromDate: fromDate,
            toDate: toDate
        };

        return defState;
    }

    /**
     * Returns a function that has as 
     * parameter a event and updates the 
     * local state by statekey and the event
     * @param {String} stateKey 
     * @returns {function}
     */
    onTextChange(stateKey) {
        return ((event) => {
            let stateObj = {};
            stateObj[stateKey] = event.target.value;
            this.setState(stateObj)
        });
    }

    /**
     * Returns a function that has as 
     * parameter a date and updates the 
     * local state by statekey and the date
     * @param {String} stateKey 
     * @returns {function}
     */
    onDateChange(stateKey) {
        return ((date) => {
            let stateObj = {};
            stateObj[stateKey] = date;
            this.setState(stateObj)
        });
    }

    /**
     * Creates a bookingDto and calls 
     * props.onCommitBooking(bookingDt)
     */
    onBookingButtonClick() {

        this.setState({
            bookingButtonClicked : true
        })
        //this.state.bookingButtonClicked = true;

        let bookingDto = new BookingDto(
            "", "",
            this.props.property.name,
            this.props.property.longtidude,
            this.props.property.latidude,
            this.props.property.city,
            this.props.property.street,
            this.props.property.url,
            this.state.fromDate.toISOString(),
            this.state.toDate.toISOString(),
            "",
            this.state.name,
            this.state.email
        );

        this.props.onCommitBooking(bookingDto);
    }

    /**
     * Resets dialog to default state and calls
     * props.onClose()
     */
    onDialogClose() {
        this.setState(this.getDefaultState());
        this.props.onClose();
    }

    render() {

        //display nothing if !prop.property
        if (!this.props.property) {
            return null;
        }

        return (
            <Dialog
                onClose={this.onDialogClose.bind(this)}
                aria-labelledby="simple-dialog-title"
                open={true}>
                <Container className="booking-dialog-holder">
                    <PropertyDataList property={this.props.property} />
                    <form noValidate autoComplete="off">
                        {this.genTextField("name", "Name")}
                        {this.genTextField("email", "E-Mail")}
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            {this.genDatePicker('fromDate', 'From Date')}
                            {this.genDatePicker('toDate', 'To Date')}
                            {this.genCommitBookingButton()}
                        </MuiPickersUtilsProvider>
                    </form>
                </Container>
            </Dialog>
        );
    }

    /**
     * Generates text filed
     * @param {String} stateKey - key in current state
     * @param {String} labelText 
     * @returns {React.Component}
     */
    genTextField(stateKey, labelText) {
        return (
            <TextField
                className="text-field"
                label={labelText}
                margin="normal"
                value={this.state[stateKey]}
                onChange={this.onTextChange(stateKey)
                    .bind(this)}
            />
        );
    }

    /**
     * Generates date picker
     * @param {String} stateKey - key in current state
     * @param {String} labelText 
     * @returns {React.Component}
     */
    genDatePicker(stateKey, labelText) {
        return (
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                className="text-field"
                format="dd/MM/yyyy"
                margin="normal"
                label={labelText}
                value={this.state[stateKey]}
                onChange={this.onDateChange(stateKey)
                    .bind(this)}
            />
        );
    }

    /**
     * Generates booking button with loading spinner 
     * and error message
     * @returns {React.Component}
     */
    genCommitBookingButton() {

        let comp;

        let onClick = this.onBookingButtonClick.bind(this);

        if (this.props.isPending) {
            comp = (<CircularProgress />);
        } else if (this.props.hasError) {
            comp = (
                <Typography variant='subtitle1'>
                    <label>An error occurred.
                    Watch out that the e-mail is valid and that the from date is before the to date
                    </label>
                </Typography>
            );
        }else if(this.state.bookingButtonClicked){

            //show a success message 
            onClick = null;

            comp = (
                <Typography variant='subtitle1'>
                    <label>Booking was successful</label>
                </Typography>
            );

            //close after some milliseconds
            setTimeout(() => this.onDialogClose(), 800);

        }

        return (
            <div>
                {comp}
                <Button
                    variant="contained"
                    color="primary"
                    className="text-field book-btn"
                    onClick={onClick}>
                    Commit booking
            </Button>
            </div>
        )
    }

}