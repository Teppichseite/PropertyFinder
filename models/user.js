const mongoose = require('mongoose');
const bookingSchema = require('./booking-schema');

const schema = new mongoose.Schema({ 
    name : {type : String, required : true},
    email : {type : String, required : true},
    bookings : [bookingSchema]
});

module.exports = mongoose.model('User', schema);
