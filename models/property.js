const mongoose = require('mongoose');

const schema = new mongoose.Schema({ 

    name : {type : String, required : true},
    city : {type : String, required : true},
    url : {type : String, required : true},
    longtidude : {type : Number, required : true},
    latidude : {type : Number, required : true}
    
});

module.exports = mongoose.model('Property', schema);