const mongoose = require('mongoose');

const schema = new mongoose.Schema({ 
    
    propertyId : {
        type : mongoose.Schema.Types.ObjectId, 
        ref: 'Property',
        required : true
    },

    date : {
        type : String,
        default : new Date().toISOString()
    }

});



module.exports = {
    schema : schema,
    model : mongoose.model('Booking', schema)
};