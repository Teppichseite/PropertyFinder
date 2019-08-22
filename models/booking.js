const mongoose = require('mongoose');

const schema = new mongoose.Schema({ 
    
    propertyId : {
        type : mongoose.Schema.Types.ObjectId, 
        ref: 'Property',
        required : true
    },

    date : {
        type : Date,
        default : Date.now
    }

});



module.exports = {
    schema : schema,
    model : mongoose.model('Booking', schema)
};