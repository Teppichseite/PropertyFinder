const mongoose = require('mongoose');

const schema = new mongoose.Schema({ 
    
    propertyId : {
        type : mongoose.Schema.Types.ObjectId, 
        ref: 'Property',
        required : true
    },

    fromDate : {
        type : Date,
        required : true
    },

    toDate : {
        type : Date,
        required : true
    }
    

});



module.exports = {
    schema : schema,
    model : mongoose.model('Booking', schema)
};