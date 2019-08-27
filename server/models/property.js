const mongoose = require('mongoose');

const schema = new mongoose.Schema({ 

    name : {type : String, required : true},
    longtidude : {type : Number, required : true},
    latidude : {type : Number, required : true},
    city : {type : String},
    street : {type : String},
    url : {type : String},
    
});

module.exports = mongoose.model('Property', schema);